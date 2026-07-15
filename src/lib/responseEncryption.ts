export interface EncryptedResponse {
    encrypted: true;
    alg: 'A256GCM';
    iv: string;
    ciphertext: string;
}

function isEncryptedResponse(value: unknown): value is EncryptedResponse {
    if (!value || typeof value !== 'object') return false;
    const envelope = value as Partial<EncryptedResponse>;
    return envelope.encrypted === true
        && envelope.alg === 'A256GCM'
        && typeof envelope.iv === 'string'
        && typeof envelope.ciphertext === 'string';
}

function fromBase64Url(value: string): ArrayBuffer {
    const base64 = value.replace(/-/g, '+').replace(/_/g, '/');
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=');
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes.buffer;
}

let importedKey: Promise<CryptoKey> | undefined;

function getKey(): Promise<CryptoKey> {
    if (importedKey) return importedKey;

    const encodedKey = String(import.meta.env.VITE_RESPONSE_ENCRYPTION_KEY ?? '').trim();
    if (!encodedKey) {
        return Promise.reject(new Error('VITE_RESPONSE_ENCRYPTION_KEY is required for encrypted API responses'));
    }

    const key = fromBase64Url(encodedKey);
    if (key.byteLength !== 32) {
        return Promise.reject(new Error('VITE_RESPONSE_ENCRYPTION_KEY must decode to exactly 32 bytes'));
    }

    importedKey = crypto.subtle.importKey('raw', key, 'AES-GCM', false, ['decrypt']);
    return importedKey;
}

export async function decryptResponse<T>(value: unknown): Promise<T | unknown> {
    if (!isEncryptedResponse(value)) return value;

    const plaintext = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: fromBase64Url(value.iv) },
        await getKey(),
        fromBase64Url(value.ciphertext),
    );

    return JSON.parse(new TextDecoder().decode(plaintext)) as T;
}

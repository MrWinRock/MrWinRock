import { useEffect, useState } from 'react';

export function useObjectUrl(blob: Blob | null): string | null {
  const [owned, setOwned] = useState<{ blob: Blob; url: string } | null>(null);
  useEffect(() => {
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    // Publishing an externally allocated resource must happen after commit.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOwned({ blob, url });
    return () => URL.revokeObjectURL(url);
  }, [blob]);
  return owned?.blob === blob ? owned.url : null;
}

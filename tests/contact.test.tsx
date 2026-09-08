import { act, fireEvent, screen } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Contact from '../src/components/pages/contact/Contact';
import { api } from '../src/lib/api';
import { renderPublic } from './helpers/renderPublic';
vi.mock('../src/lib/api', () => ({ api: { contact: vi.fn() } }));
beforeEach(() => vi.resetAllMocks());
afterEach(() => vi.useRealTimers());
function fill() {
  fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'Win' } });
  fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'win@example.com' } });
  fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: 'A valid message' } });
}
it('associates invalid fields with inline errors and does not send', () => {
  renderPublic(<Contact />);
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(screen.getByLabelText(/^name$/i)).toHaveAttribute('aria-invalid', 'true');
  expect(screen.getByLabelText(/^name$/i)).toHaveFocus();
  expect(screen.getByLabelText(/^message$/i)).toHaveAccessibleDescription(/10/);
  expect(api.contact).not.toHaveBeenCalled();
});
it.each([503, 500])('preserves input and safely announces HTTP %s', async status => {
  vi.mocked(api.contact).mockRejectedValue({ status, message: 'Resend API key secret' });
  renderPublic(<Contact />); fill();
  fireEvent.click(screen.getByRole('button', { name: /send message/i }));
  expect(await screen.findByRole('alert')).toHaveTextContent(status === 503 ? /temporarily unavailable/i : /try again/i);
  expect(screen.queryByText(/Resend API key secret/i)).toBeNull();
  expect(screen.getByLabelText(/^name$/i)).toHaveValue('Win');
});
it('prevents duplicate sends, resets only on success, and aborts on unmount', async () => {
  let resolve!: (value: { ok: true; message: string }) => void;
  vi.mocked(api.contact).mockImplementation(() => new Promise(done => { resolve = done; }));
  const { unmount } = renderPublic(<Contact />); fill();
  const button = screen.getByRole('button', { name: /send message/i });
  fireEvent.click(button); fireEvent.click(button);
  expect(api.contact).toHaveBeenCalledTimes(1);
  expect(button).toBeDisabled();
  const signal = vi.mocked(api.contact).mock.calls[0][1]?.signal;
  expect(signal?.aborted).toBe(false);
  await act(async () => resolve({ ok: true, message: 'Sent' }));
  expect(screen.getByLabelText(/^name$/i)).toHaveValue('');
  expect(screen.getByRole('status')).toHaveTextContent(/sent/i);
  fill(); fireEvent.click(button); unmount();
  expect(vi.mocked(api.contact).mock.calls[1][1]?.signal?.aborted).toBe(true);
});
it('disables submission until Retry-After expires', async () => {
  vi.useFakeTimers();
  vi.mocked(api.contact).mockRejectedValue({ status: 429, retryAfterSeconds: 2 });
  renderPublic(<Contact />); fill();
  await act(async () => fireEvent.click(screen.getByRole('button', { name: /send message/i })));
  expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  await act(async () => vi.advanceTimersByTime(2000));
  expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
});

import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, expect, it, vi } from 'vitest';
import Contact from '../src/components/pages/contact/Contact';
import { api } from '../src/lib/api';
import type { ContactBriefResponse } from '../src/lib/apiTypes';
import i18n from '../src/i18n';
import { renderPublic } from './helpers/renderPublic';
import { deferred } from './helpers/deferred';

vi.mock('../src/lib/api', () => ({ api: { contact: vi.fn(), reviewContactBrief: vi.fn() } }));
const review: ContactBriefResponse = { ok: true, data: { source: 'jev', category: 'web-app', checks: { audience: 'missing', scope: 'present', deadline: 'uncertain' } } };
beforeEach(async () => { vi.resetAllMocks(); await i18n.changeLanguage('en'); vi.mocked(api.reviewContactBrief).mockResolvedValue(review); });
afterEach(async () => { vi.useRealTimers(); await i18n.changeLanguage('en'); });
const message = 'Build a booking app with a calendar';
function fill() {
  fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'Private name' } });
  fireEvent.change(screen.getByLabelText(/^email$/i), { target: { value: 'private@example.com' } });
  fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: message } });
}
it('reviews only on demand and keeps suggestions separate from sending', async () => {
  renderPublic(<Contact />); fill();
  expect(api.reviewContactBrief).not.toHaveBeenCalled();
  fireEvent.click(screen.getByRole('button', { name: /review my brief/i }));
  const result = await screen.findByRole('region', { name: /brief review/i });
  expect(within(result).getByText(/who will use/i)).toBeInTheDocument();
  expect(within(result).getByText(/not sure/i)).toBeInTheDocument();
  expect(api.reviewContactBrief).toHaveBeenCalledWith({ message }, { signal: expect.any(AbortSignal) });
  expect(api.contact).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^message$/i)).toHaveValue(message);
  expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
  fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: message + ' for students' } });
  expect(screen.queryByRole('region', { name: /brief review/i })).toBeNull();
});

it('aborts a stale review when the message changes and ignores its late result', async () => {
  const pending = deferred<ContactBriefResponse>();
  vi.mocked(api.reviewContactBrief).mockReturnValue(pending.promise);
  renderPublic(<Contact />); fill();
  fireEvent.click(screen.getByRole('button', { name: /review my brief/i }));
  const signal = vi.mocked(api.reviewContactBrief).mock.calls[0][1]?.signal;
  fireEvent.change(screen.getByLabelText(/^message$/i), { target: { value: 'A different valid brief' } });
  expect(signal?.aborted).toBe(true);
  await act(async () => pending.resolve(review));
  expect(screen.queryByRole('region', { name: /brief review/i })).toBeNull();
});

it.each([503, 429])('keeps sending available after review HTTP %s and safely handles errors', async status => {
  vi.mocked(api.reviewContactBrief).mockRejectedValue({ status, message: 'private provider detail', retryAfterSeconds: 2 });
  vi.mocked(api.contact).mockResolvedValue({ ok: true, message: 'Sent' });
  renderPublic(<Contact />); fill();
  fireEvent.click(screen.getByRole('button', { name: /review my brief/i }));
  await waitFor(() => expect(screen.getByRole('alert')).toBeInTheDocument());
  expect(document.body.textContent).not.toMatch(/private provider detail/);
  const send = screen.getByRole('button', { name: /send message/i });
  expect(send).toBeEnabled(); fireEvent.click(send);
  await waitFor(() => expect(screen.getByLabelText(/^message$/i)).toHaveValue(''));
});

it('renders an unavailable result as advisory guidance without claiming details are missing', async () => {
  vi.mocked(api.reviewContactBrief).mockResolvedValue({ ok: true, data: { source: 'unavailable', category: null, checks: { audience: 'uncertain', scope: 'uncertain', deadline: 'uncertain' } } });
  renderPublic(<Contact />); fill(); fireEvent.click(screen.getByRole('button', { name: /review my brief/i }));
  expect(await screen.findByText(/review is temporarily unavailable/i)).toBeInTheDocument();
  expect(screen.queryByText(/add this detail/i)).toBeNull();
  expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
});

it('validates without sending the draft and localizes the assistant in Thai', async () => {
  renderPublic(<Contact />);
  fireEvent.click(screen.getByRole('button', { name: /review my brief/i }));
  expect(api.reviewContactBrief).not.toHaveBeenCalled();
  expect(screen.getByLabelText(/^message$/i)).toHaveFocus();
  await act(async () => i18n.changeLanguage('th'));
  fireEvent.change(screen.getByLabelText('ข้อความ'), { target: { value: message } });
  fireEvent.click(screen.getByRole('button', { name: 'ตรวจบรีฟของฉัน' }));
  expect(await screen.findByRole('region', { name: 'ผลการตรวจบรีฟ' })).toBeInTheDocument();
});

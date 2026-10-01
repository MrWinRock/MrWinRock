import type { ContactInput } from '../../../lib/apiTypes';

export type ContactField = 'name' | 'email' | 'message';
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export function validateContact(input: ContactInput): ContactFieldErrors {
  const errors: ContactFieldErrors = {};
  if (!input.name.trim()) errors.name = 'contact.validation.name';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email.trim())) errors.email = 'contact.validation.email';
  if (input.message.trim().length < 10 || input.message.trim().length > 5000) errors.message = 'contact.validation.message';
  return errors;
}

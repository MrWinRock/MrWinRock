import { fireEvent, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import Navbar from '../src/components/Navbar';
import { renderPublic } from './helpers/renderPublic';

it('closes the mobile disclosure with Escape and returns focus', () => {
  renderPublic(<Navbar />);
  const toggle = screen.getByRole('button', { name: /open menu/i });
  fireEvent.click(toggle);
  fireEvent.keyDown(screen.getByRole('navigation'), { key: 'Escape' });
  expect(toggle).toHaveAttribute('aria-expanded', 'false');
  expect(toggle).toHaveFocus();
});

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { AppleButton } from './AppleButton';

describe('AppleButton', () => {
  describe('Rendering', () => {
    it('renders with children text', () => {
      render(<AppleButton>Click me</AppleButton>);
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders as a button element', () => {
      render(<AppleButton>Button</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.tagName).toBe('BUTTON');
    });
  });

  describe('Variants', () => {
    it('applies primary variant classes', () => {
      render(<AppleButton variant="primary">Primary</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-[var(--apple-primary)]');
    });

    it('applies secondary variant classes', () => {
      render(<AppleButton variant="secondary">Secondary</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-gray-100');
    });

    it('applies outline variant classes', () => {
      render(<AppleButton variant="outline">Outline</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('border-2');
    });

    it('applies ghost variant classes', () => {
      render(<AppleButton variant="ghost">Ghost</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('bg-transparent');
    });
  });

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<AppleButton size="sm">Small</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-sm');
    });

    it('applies medium size classes by default', () => {
      render(<AppleButton>Medium</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-sm');
    });

    it('applies large size classes', () => {
      render(<AppleButton size="lg">Large</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('text-base');
    });
  });

  describe('Interactions', () => {
    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<AppleButton onClick={handleClick}>Click me</AppleButton>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when button is disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<AppleButton disabled onClick={handleClick}>Disabled</AppleButton>);
      const button = screen.getByRole('button');
      
      await user.click(button);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('States', () => {
    it('is disabled when disabled prop is true', () => {
      render(<AppleButton disabled>Disabled</AppleButton>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is enabled by default', () => {
      render(<AppleButton>Enabled</AppleButton>);
      const button = screen.getByRole('button');
      expect(button).toBeEnabled();
    });
  });

  describe('Custom className', () => {
    it('applies custom className', () => {
      render(<AppleButton className="custom-class">Custom</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('custom-class');
    });

    it('preserves base classes when custom className is provided', () => {
      render(<AppleButton className="custom-class">Custom</AppleButton>);
      const button = screen.getByRole('button');
      expect(button.className).toContain('rounded-lg');
      expect(button.className).toContain('custom-class');
    });
  });
});


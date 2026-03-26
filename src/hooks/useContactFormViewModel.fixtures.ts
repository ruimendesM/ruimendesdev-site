// src/hooks/useContactFormViewModel.fixtures.ts
import { vi } from 'vitest'
import type { ContactFormViewModel } from './useContactFormViewModel'

export function buildViewModel(
  overrides: Partial<ContactFormViewModel> = {}
): ContactFormViewModel {
  return {
    fields: { email: '', content: '' },
    errors: {},
    status: 'idle',
    charCount: 0,
    maxChars: 350,
    reset: vi.fn(),
    handlers: {
      onEmailChange: vi.fn(),
      onContentChange: vi.fn(),
      onSubmit: vi.fn(),
    },
    ...overrides,
  }
}

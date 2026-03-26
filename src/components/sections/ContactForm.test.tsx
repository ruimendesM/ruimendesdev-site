import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ContactForm from './ContactForm'
import { buildViewModel } from '../../hooks/useContactFormViewModel.fixtures'

// ─── Idle state ───────────────────────────────────────────────────────────────

describe('idle state', () => {
  it('renders the email input', () => {
    render(<ContactForm vm={buildViewModel()} onClose={() => {}} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('renders the message textarea', () => {
    render(<ContactForm vm={buildViewModel()} onClose={() => {}} />)
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument()
  })

  it('renders the char counter showing 0 / 350', () => {
    render(<ContactForm vm={buildViewModel()} onClose={() => {}} />)
    expect(screen.getByText('0 / 350')).toBeInTheDocument()
  })

  it('renders the send button', () => {
    render(<ContactForm vm={buildViewModel()} onClose={() => {}} />)
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument()
  })

  it('calls onEmailChange when the email input changes', () => {
    const vm = buildViewModel()
    render(<ContactForm vm={vm} onClose={() => {}} />)
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'a@b.com' } })
    expect(vm.handlers.onEmailChange).toHaveBeenCalledWith('a@b.com')
  })

  it('calls onContentChange when the textarea changes', () => {
    const vm = buildViewModel()
    render(<ContactForm vm={vm} onClose={() => {}} />)
    fireEvent.change(screen.getByLabelText(/message/i), { target: { value: 'Hi' } })
    expect(vm.handlers.onContentChange).toHaveBeenCalledWith('Hi')
  })

  it('calls onSubmit when the send button is clicked', () => {
    const vm = buildViewModel()
    render(<ContactForm vm={vm} onClose={() => {}} />)
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    expect(vm.handlers.onSubmit).toHaveBeenCalled()
  })
})

// ─── Validation errors ────────────────────────────────────────────────────────

describe('validation errors', () => {
  it('shows email error when present', () => {
    render(
      <ContactForm
        vm={buildViewModel({ errors: { email: 'Please enter a valid email address.' } })}
        onClose={() => {}}
      />
    )
    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('shows content error when present', () => {
    render(
      <ContactForm
        vm={buildViewModel({ errors: { content: 'Message is required.' } })}
        onClose={() => {}}
      />
    )
    expect(screen.getByText('Message is required.')).toBeInTheDocument()
  })
})

// ─── Loading state ────────────────────────────────────────────────────────────

describe('loading state', () => {
  it('disables the send button while loading', () => {
    render(<ContactForm vm={buildViewModel({ status: 'loading' })} onClose={() => {}} />)
    expect(screen.getByRole('button', { name: /send/i })).toBeDisabled()
  })

  it('disables the cancel button while loading', () => {
    render(<ContactForm vm={buildViewModel({ status: 'loading' })} onClose={() => {}} />)
    expect(screen.getByRole('button', { name: /cancel/i })).toBeDisabled()
  })
})

// ─── Success state ────────────────────────────────────────────────────────────

describe('success state', () => {
  it('replaces the form with a success message', () => {
    render(<ContactForm vm={buildViewModel({ status: 'success' })} onClose={() => {}} />)
    expect(screen.getByText(/message sent/i)).toBeInTheDocument()
    expect(screen.queryByLabelText(/email/i)).not.toBeInTheDocument()
  })

  it('shows a close button in the success state', () => {
    render(<ContactForm vm={buildViewModel({ status: 'success' })} onClose={() => {}} />)
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument()
  })

  it('calls onClose when the close button is clicked in the success state', () => {
    const onClose = vi.fn()
    render(<ContactForm vm={buildViewModel({ status: 'success' })} onClose={onClose} />)
    fireEvent.click(screen.getByRole('button', { name: /close/i }))
    expect(onClose).toHaveBeenCalled()
  })
})

// ─── Error state ──────────────────────────────────────────────────────────────

describe('error state', () => {
  it('shows a generic error banner when status is error', () => {
    render(<ContactForm vm={buildViewModel({ status: 'error' })} onClose={() => {}} />)
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('still shows the form in error state so the user can retry', () => {
    render(<ContactForm vm={buildViewModel({ status: 'error' })} onClose={() => {}} />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })
})

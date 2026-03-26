import { renderHook, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import useContactFormViewModel from './useContactFormViewModel'

function setup() {
  return renderHook(() => useContactFormViewModel())
}

// ─── Initial state ────────────────────────────────────────────────────────────

describe('initial state', () => {
  it('starts with empty fields', () => {
    const { result } = setup()
    expect(result.current.fields.email).toBe('')
    expect(result.current.fields.content).toBe('')
  })

  it('starts with no errors', () => {
    const { result } = setup()
    expect(result.current.errors.email).toBeUndefined()
    expect(result.current.errors.content).toBeUndefined()
  })

  it('starts with idle status', () => {
    const { result } = setup()
    expect(result.current.status).toBe('idle')
  })

  it('exposes maxChars as 350', () => {
    const { result } = setup()
    expect(result.current.maxChars).toBe(350)
  })

  it('starts with charCount of 0', () => {
    const { result } = setup()
    expect(result.current.charCount).toBe(0)
  })
})

// ─── Field changes ────────────────────────────────────────────────────────────

describe('field changes', () => {
  it('updates email when onEmailChange is called', () => {
    const { result } = setup()
    act(() => result.current.handlers.onEmailChange('test@example.com'))
    expect(result.current.fields.email).toBe('test@example.com')
  })

  it('updates content when onContentChange is called', () => {
    const { result } = setup()
    act(() => result.current.handlers.onContentChange('Hello there'))
    expect(result.current.fields.content).toBe('Hello there')
  })

  it('reflects charCount equal to content length', () => {
    const { result } = setup()
    act(() => result.current.handlers.onContentChange('Hi'))
    expect(result.current.charCount).toBe(2)
  })
})

// ─── Validation on submit ─────────────────────────────────────────────────────

describe('validation on submit', () => {
  it('sets an error when email is empty', () => {
    const { result } = setup()
    act(() => result.current.handlers.onSubmit())
    expect(result.current.errors.email).toBeDefined()
  })

  it('sets an error when email format is invalid', () => {
    const { result } = setup()
    act(() => result.current.handlers.onEmailChange('not-an-email'))
    act(() => result.current.handlers.onSubmit())
    expect(result.current.errors.email).toBeDefined()
  })

  it('sets an error when content is empty', () => {
    const { result } = setup()
    act(() => result.current.handlers.onSubmit())
    expect(result.current.errors.content).toBeDefined()
  })

  it('sets an error when content exceeds 350 chars', () => {
    const { result } = setup()
    act(() => result.current.handlers.onEmailChange('user@example.com'))
    act(() => result.current.handlers.onContentChange('a'.repeat(351)))
    act(() => result.current.handlers.onSubmit())
    expect(result.current.errors.content).toBeDefined()
  })

  it('does not call fetch when validation fails', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    const { result } = setup()
    act(() => result.current.handlers.onSubmit()) // both fields empty
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})

// ─── Reset ────────────────────────────────────────────────────────────────────

describe('reset', () => {
  it('clears fields and errors, returns to idle', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('fail'))
    const { result } = setup()
    act(() => result.current.handlers.onEmailChange('user@example.com'))
    act(() => result.current.handlers.onContentChange('Some message'))
    await act(() => result.current.handlers.onSubmit())
    // Now in error state with filled fields — reset should clear everything
    act(() => result.current.reset())
    expect(result.current.fields.email).toBe('')
    expect(result.current.fields.content).toBe('')
    expect(result.current.errors.email).toBeUndefined()
    expect(result.current.errors.content).toBeUndefined()
    expect(result.current.status).toBe('idle')
    fetchSpy.mockRestore()
  })
})

// ─── API submission ───────────────────────────────────────────────────────────

describe('API submission', () => {
  let fetchSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    fetchSpy = vi.spyOn(globalThis, 'fetch')
  })

  afterEach(() => {
    fetchSpy.mockRestore()
  })

  function fillValidForm(result: ReturnType<typeof setup>['result']) {
    act(() => result.current.handlers.onEmailChange('user@example.com'))
    act(() => result.current.handlers.onContentChange('Hello, this is a message.'))
  }

  it('sets status to loading while the request is in flight', async () => {
    let resolveResponse!: (value: Response) => void
    fetchSpy.mockReturnValue(
      new Promise<Response>(res => { resolveResponse = res })
    )
    const { result } = setup()
    fillValidForm(result)
    act(() => { result.current.handlers.onSubmit() })
    expect(result.current.status).toBe('loading')
    resolveResponse(new Response(null, { status: 200 }))
  })

  it('sets status to success on a 2xx response', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }))
    const { result } = setup()
    fillValidForm(result)
    await act(() => result.current.handlers.onSubmit())
    expect(result.current.status).toBe('success')
  })

  it('does not set a content error when content is exactly 350 chars', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }))
    const { result } = setup()
    act(() => result.current.handlers.onEmailChange('user@example.com'))
    act(() => result.current.handlers.onContentChange('a'.repeat(350)))
    await act(() => result.current.handlers.onSubmit())
    expect(result.current.errors.content).toBeUndefined()
  })

  it('sets status to error on a non-2xx response', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 500 }))
    const { result } = setup()
    fillValidForm(result)
    await act(() => result.current.handlers.onSubmit())
    expect(result.current.status).toBe('error')
  })

  it('sets status to error on a network failure', async () => {
    fetchSpy.mockRejectedValue(new Error('Network error'))
    const { result } = setup()
    fillValidForm(result)
    await act(() => result.current.handlers.onSubmit())
    expect(result.current.status).toBe('error')
  })

  it('calls the correct endpoint with email and content', async () => {
    fetchSpy.mockResolvedValue(new Response(null, { status: 200 }))
    const { result } = setup()
    fillValidForm(result)
    await act(() => result.current.handlers.onSubmit())
    expect(fetchSpy).toHaveBeenCalledWith(
      'https://askme.ruimendesdev.eu/api/anonymous-messages',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({
          email: 'user@example.com',
          content: 'Hello, this is a message.',
        }),
      })
    )
  })
})

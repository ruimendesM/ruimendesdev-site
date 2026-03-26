import { useState } from 'react'

export type ContactFormStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ContactFormFields {
  email: string
  content: string
}

export interface ContactFormErrors {
  email?: string
  content?: string
}

export interface ContactFormViewModel {
  fields: ContactFormFields
  errors: ContactFormErrors
  status: ContactFormStatus
  charCount: number
  maxChars: number
  handlers: {
    onEmailChange: (value: string) => void
    onContentChange: (value: string) => void
    onSubmit: () => void
  }
  reset: () => void
}

const MAX_CHARS = 350
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(fields: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {}

  if (!fields.email.trim()) {
    errors.email = 'Email is required.'
  } else if (!EMAIL_REGEX.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!fields.content.trim()) {
    errors.content = 'Message is required.'
  } else if (fields.content.length > MAX_CHARS) {
    errors.content = `Message must be ${MAX_CHARS} characters or fewer.`
  }

  return errors
}

const EMPTY_FIELDS: ContactFormFields = { email: '', content: '' }

export default function useContactFormViewModel(): ContactFormViewModel {
  const [fields, setFields] = useState<ContactFormFields>(EMPTY_FIELDS)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [status, setStatus] = useState<ContactFormStatus>('idle')

  function onEmailChange(value: string) {
    setFields(prev => ({ ...prev, email: value }))
  }

  function onContentChange(value: string) {
    setFields(prev => ({ ...prev, content: value }))
  }

  function onSubmit() {
    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setErrors({})
    setStatus('loading')

    void (async () => {
      try {
        const response = await fetch(
          'https://askme.ruimendesdev.eu/api/anonymous-messages',
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: fields.email, content: fields.content }),
          }
        )
        setStatus(response.ok ? 'success' : 'error')
      } catch {
        setStatus('error')
      }
    })()
  }

  function reset() {
    setFields(EMPTY_FIELDS)
    setErrors({})
    setStatus('idle')
  }

  return {
    fields,
    errors,
    status,
    charCount: fields.content.length,
    maxChars: MAX_CHARS,
    handlers: { onEmailChange, onContentChange, onSubmit },
    reset,
  }
}

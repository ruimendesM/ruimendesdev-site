import type { ContactFormViewModel } from '../../hooks/useContactFormViewModel'

interface Props {
  vm: ContactFormViewModel
  onClose: () => void
}

export default function ContactForm({ vm, onClose }: Props) {
  const { fields, errors, status, charCount, maxChars, handlers } = vm

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-6 py-6 text-center">
        <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Message sent!
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <button
          onClick={onClose}
          aria-label="Close"
          className="px-5 py-2 text-sm rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity"
        >
          Close
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={e => { e.preventDefault(); handlers.onSubmit() }}
      noValidate
      className="flex flex-col gap-4"
    >
      {/* Email */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-email"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Email
        </label>
        <input
          id="contact-email"
          type="email"
          value={fields.email}
          onChange={e => handlers.onEmailChange(e.target.value)}
          placeholder="you@example.com"
          disabled={status === 'loading'}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
          aria-invalid={errors.email ? true : undefined}
          className={`rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-colors ${
            errors.email
              ? 'border-red-400 dark:border-red-500'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        />
        {errors.email && (
          <p id="contact-email-error" className="text-xs text-red-500 dark:text-red-400">
            {errors.email}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1">
        <label
          htmlFor="contact-content"
          className="text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          Message
        </label>
        <textarea
          id="contact-content"
          value={fields.content}
          onChange={e => handlers.onContentChange(e.target.value)}
          placeholder="Your message…"
          rows={5}
          disabled={status === 'loading'}
          aria-describedby={errors.content ? 'contact-content-error' : undefined}
          aria-invalid={errors.content ? true : undefined}
          className={`rounded-lg border px-3 py-2 text-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none transition-colors ${
            errors.content
              ? 'border-red-400 dark:border-red-500'
              : 'border-slate-200 dark:border-slate-700'
          }`}
        />
        <div className="flex items-start justify-between gap-2">
          {errors.content ? (
            <p id="contact-content-error" className="text-xs text-red-500 dark:text-red-400">
              {errors.content}
            </p>
          ) : (
            <span />
          )}
          <span
            className={`text-xs tabular-nums ${
              charCount > maxChars
                ? 'text-red-500 dark:text-red-400'
                : 'text-slate-400 dark:text-slate-500'
            }`}
          >
            {charCount} / {maxChars}
          </span>
        </div>
      </div>

      {/* API error banner */}
      {status === 'error' && (
        <p className="text-sm text-red-500 dark:text-red-400 text-center">
          Something went wrong. Please try again.
        </p>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onClose}
          disabled={status === 'loading'}
          className="px-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="px-4 py-2 text-sm rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  )
}

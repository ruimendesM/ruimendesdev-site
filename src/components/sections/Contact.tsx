import { useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import ContactForm from './ContactForm'
import useContactFormViewModel from '../../hooks/useContactFormViewModel'

export default function Contact() {
  const [isOpen, setIsOpen] = useState(false)
  const vm = useContactFormViewModel()
  const dialogRef = useRef<HTMLDivElement>(null)

  function openModal() {
    vm.reset()
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeModal()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    if (isOpen) dialogRef.current?.focus()
  }, [isOpen])

  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">Contact</h2>
      <p className="text-sm text-slate-500 mb-4">Want to get in touch? Reach me here:</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="https://www.linkedin.com/in/rui-mendes-2482465b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ruimendesM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          GitHub
        </a>
        <button
          type="button"
          aria-haspopup="dialog"
          onClick={openModal}
          className="text-sm text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
        >
          Send me a message
        </button>
      </div>

      {/* Modal */}
      {isOpen && (
        <div
          data-testid="modal-backdrop"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative w-full max-w-md rounded-xl bg-white dark:bg-slate-900 shadow-xl p-6 focus:outline-none"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h3
                id="contact-modal-title"
                className="text-lg font-semibold text-slate-900 dark:text-slate-100"
              >
                Send me a message
              </h3>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close dialog"
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <ContactForm vm={vm} onClose={closeModal} />
          </div>
        </div>
      )}
    </section>
  )
}

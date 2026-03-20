export default function Contact() {
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
      </div>
    </section>
  )
}

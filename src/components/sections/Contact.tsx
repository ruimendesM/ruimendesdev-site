export default function Contact() {
  return (
    <section id="contact" className="py-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-3">Contact</h2>
      <p className="text-sm text-slate-500 mb-4">Want to get in touch? Reach me here:</p>
      <div className="flex flex-wrap gap-3">
        <a
          href="mailto:ruimigfmendes+dev@gmail.com"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          ✉ ruimigfmendes+dev@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/rui-mendes-2482465b/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/ruimendesM"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm no-underline text-slate-900 border border-slate-200 px-4 py-2 rounded-lg bg-white hover:bg-slate-50 transition-colors"
        >
          GitHub
        </a>
      </div>
    </section>
  )
}

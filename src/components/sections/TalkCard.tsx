import { Talk } from '../../data/talks'

interface Props {
  talk: Talk;
}

export default function TalkCard({ talk }: Props) {
  return (
    <div className="flex items-center justify-between gap-4 p-5 border border-slate-200 rounded-xl bg-white">
      <div className="flex-1">
        <h3 className="text-base font-bold text-slate-900">{talk.title}</h3>
        <p className="text-xs text-slate-400 mt-0.5">{talk.event} · {talk.date}</p>
      </div>
      <a
        href={talk.youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Watch ${talk.title}`}
        className="flex-shrink-0 text-sm text-red-500 border border-red-200 px-3 py-1 rounded no-underline font-semibold hover:bg-red-50 transition-colors"
      >
        ▶ Watch
      </a>
    </div>
  )
}

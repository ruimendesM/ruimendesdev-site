import type { CareerEntry } from '../../data/career'

interface Props {
  entry: CareerEntry;
  isLast: boolean;
}

export default function CareerItem({ entry, isLast }: Props) {
  const initial = entry.company.charAt(0).toUpperCase()

  return (
    <div className="flex gap-4">
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="w-3 h-3 rounded-full bg-sky-500 dark:bg-sky-400 flex-shrink-0 shadow-[0_0_6px_rgba(56,189,248,0.5)]" />
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 dark:bg-white/10 mt-1 min-h-6" />}
      </div>

      {/* Content */}
      <div className="pb-7">
        {/* Company logo + title */}
        <div className="flex items-center gap-2">
          {entry.logoUrl ? (
            <img
              src={entry.logoUrl}
              alt={`${entry.company} logo`}
              className="w-6 h-6 rounded object-contain flex-shrink-0"
            />
          ) : (
            <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center text-slate-300 text-xs font-bold flex-shrink-0">
              {initial}
            </div>
          )}
          <p className="text-base font-bold text-slate-900 dark:text-slate-100">{entry.title}</p>
        </div>
        <p className="text-sm text-sky-600 dark:text-sky-400 font-semibold mt-0.5">{entry.company}</p>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{entry.dateRange}</p>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{entry.summary}</p>
      </div>
    </div>
  )
}

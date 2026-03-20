import { CareerEntry } from '../../data/career'

interface Props {
  entry: CareerEntry;
  isLast: boolean;
}

export default function CareerItem({ entry, isLast }: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center flex-shrink-0 pt-1">
        <div className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
        {!isLast && <div className="w-0.5 flex-1 bg-slate-200 mt-1 min-h-6" />}
      </div>
      <div className="pb-7">
        <p className="text-base font-bold text-slate-900">{entry.title}</p>
        <p className="text-sm text-blue-600 font-semibold mt-0.5">{entry.company}</p>
        <p className="text-xs text-slate-400 mt-0.5">{entry.dateRange}</p>
        <p className="text-sm text-slate-500 mt-2 leading-relaxed">{entry.summary}</p>
      </div>
    </div>
  )
}

import { career } from '../../data/career'
import CareerItem from './CareerItem'

export default function Career() {
  return (
    <section id="career" className="py-12 border-b border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-7">Career</h2>
      <div>
        {career.map((entry, index) => (
          <CareerItem
            key={`${entry.company}-${entry.dateRange}`}
            entry={entry}
            isLast={index === career.length - 1}
          />
        ))}
      </div>
    </section>
  )
}

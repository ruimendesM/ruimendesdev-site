import { talks } from '../../data/talks'
import TalkCard from './TalkCard'

export default function Talks() {
  return (
    <section id="talks" className="py-12 border-b border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Talks</h2>
      <div className="flex flex-col gap-3">
        {talks.map((talk) => (
          <TalkCard key={talk.youtubeUrl} talk={talk} />
        ))}
      </div>
    </section>
  )
}

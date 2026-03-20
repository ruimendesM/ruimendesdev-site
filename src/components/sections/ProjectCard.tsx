import type { Project } from '../../data/projects'

interface Props {
  project: Project;
}

// One hue per technology, light and dark variants.
// ORDER MATTERS: 'React Native' must come before 'React' so that tags containing
// "React Native" match the more-specific key first (lookup uses tag.includes(key)).
const TAG_COLOURS: Record<string, string> = {
  Android:        'bg-green-100 text-green-700 border-green-200 dark:bg-green-400/15 dark:text-green-400 dark:border-green-400/30',
  Kotlin:         'bg-violet-100 text-violet-700 border-violet-200 dark:bg-violet-400/15 dark:text-violet-400 dark:border-violet-400/30',
  Firebase:       'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-400/15 dark:text-orange-400 dark:border-orange-400/30',
  'React Native': 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/15 dark:text-sky-400 dark:border-sky-400/30',
  React:          'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-400/15 dark:text-sky-400 dark:border-sky-400/30',
}

function tagClass(tag: string): string {
  for (const [key, cls] of Object.entries(TAG_COLOURS)) {
    if (tag.includes(key)) return cls
  }
  return 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-400/15 dark:text-slate-400 dark:border-slate-400/30'
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-slate-200 dark:border-white/[0.08] rounded-xl p-5 bg-white dark:bg-white/5 shadow-sm dark:shadow-none flex flex-col gap-3">
      {/* Header: icon + title + WIP badge */}
      <div className="flex items-center gap-3 flex-wrap">
        {project.icon ? (
          <img
            src={project.icon}
            alt={`${project.name} icon`}
            className="w-10 h-10 rounded-xl object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-500 to-indigo-600 flex-shrink-0" />
        )}
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{project.name}</h3>
          {project.wip && (
            <span className="text-xs bg-amber-100 dark:bg-amber-400/15 text-amber-800 dark:text-amber-400 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
              Work in Progress
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{project.description}</p>

      {/* Tech stack devicon logos */}
      {project.techStack && project.techStack.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          {project.techStack.map(({ name, variant }) => (
            <img
              key={name}
              src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`}
              alt={name}
              title={name}
              className="w-5 h-5"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = 'none'
              }}
            />
          ))}
        </div>
      )}

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className={`text-xs px-2 py-0.5 rounded border ${tagClass(tag)}`}>
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-600 dark:text-sky-400 border border-sky-200 dark:border-sky-400/30 px-2.5 py-1 rounded no-underline hover:bg-sky-50 dark:hover:bg-sky-400/10 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

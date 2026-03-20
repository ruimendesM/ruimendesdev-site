import type { Project } from '../../data/projects'

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-white flex flex-col gap-3">
      <div className="flex items-center gap-2 flex-wrap">
        <h3 className="text-base font-bold text-slate-900">{project.name}</h3>
        {project.wip && (
          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold uppercase tracking-wide">
            Work in Progress
          </span>
        )}
      </div>
      <p className="text-sm text-slate-500 leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span key={tag} className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
            {tag}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-1">
          {project.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-500 border border-blue-200 px-2.5 py-1 rounded no-underline hover:bg-blue-50 transition-colors"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

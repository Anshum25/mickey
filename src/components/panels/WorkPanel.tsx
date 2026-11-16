import { featuredProjects, projects, type Project } from '../../content/portfolio';
import type { OverlayKey } from '../../lib/overlays';
import { Byline, JumpLink, Panel, Slug } from '../ui/Primitives';
import { ProjectGlyph } from '../visual/ProjectGlyph';
import { cn } from '../../lib/cn';

/** Three stories across the foot of the page, divided by column rules. */
export function WorkPanel({
  onOpen,
  onOpenProject,
}: {
  onOpen: (key: OverlayKey) => void;
  onOpenProject: (id: string) => void;
}) {
  return (
    <Panel>
      <div className="flex shrink-0 items-center gap-4 px-4 pt-4 sm:px-5 lg:px-6 lg:pt-5">
        <Slug index="02" className="min-w-0 flex-1">
          Selected work
        </Slug>
        <JumpLink onClick={() => onOpen('work')} aria-haspopup="dialog">
          All {projects.length}
        </JumpLink>
      </div>

      <ul className="press-grid mt-3.5 grid min-h-0 flex-1 grid-cols-3 grid-rows-1 sm:mt-4">
        {featuredProjects.map((p) => (
          <li key={p.id} className="flex min-h-0 min-w-0 bg-paper">
            <ProjectCard project={p} onOpen={() => onOpenProject(p.id)} />
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      aria-label={`${project.title} — view case study`}
      className={cn(
        'group relative flex size-full min-h-0 min-w-0 flex-col gap-2.5 overflow-hidden',
        'px-4 py-4 text-left transition-colors duration-200 lg:px-5',
        'hover:bg-paper-2 focus-visible:bg-paper-2',
      )}
    >
      {/* The story is struck through with the second ink on hover. */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-acid',
          'transition-transform duration-300 ease-out',
          'group-hover:scale-x-100 group-focus-visible:scale-x-100',
        )}
      />

      {/* --- Kicker + headline -------------------------------------------- */}
      <div className="min-w-0 shrink-0">
        <p className="slug">
          <span className="font-semibold text-acid">{project.index}</span>
          <span className="text-ink-3"> — </span>
          <span className="slug-ink">{project.domain}</span>
        </p>
        <h3 className="deck clamp-2 mt-2 text-[15.5px] text-ink lg:text-[17px]">
          {project.shortTitle}
        </h3>
      </div>

      {/* --- The cut ------------------------------------------------------- */}
      {/* The schematic takes the column's slack and centres itself in it: the
          SVG meets its box, so extra height becomes margin, not scale. */}
      <div className="relative min-h-[26px] w-full flex-1 py-1">
        <ProjectGlyph kind={project.glyph} />
      </div>

      {/* --- Standfirst + byline -------------------------------------------- */}
      <div className="mt-auto min-w-0 shrink-0 space-y-2 border-t border-rule-soft pt-2.5">
        <p className="clamp-2 text-pretty text-[11.5px] leading-[1.45] text-ink-2">
          {project.tagline}
        </p>
        <Byline items={project.stack} max={3} />
      </div>
    </button>
  );
}

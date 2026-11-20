import type { Project } from "@/data/portfolio";

type ProjectCardProps = {
  project: Project;
  index: number;
};

const pad = (n: number, size: number) => String(n).padStart(size, "0");

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const [category, ...otherTags] = project.tags;
  const linkCount = [project.href, project.repoHref].filter(Boolean).length;

  return (
    <article className="mt-3 font-dex text-(--color-gbc-lcd-ink)">
      {/* Sprite + name block */}
      <div className="flex items-start gap-3">
        <div
          className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-(--color-gbc-lcd-ink) bg-(--color-gbc-lcd-light) text-4xl"
          aria-hidden="true"
        >
          {project.emoji}
        </div>

        <div className="min-w-0 flex-1 text-[10px] leading-relaxed uppercase sm:text-xs">
          <p className="font-dex text-sm break-words sm:text-base">{project.title}</p>
          {category && <p>{category}</p>}
          <dl className="mt-1 grid grid-cols-[auto_1fr] gap-x-3">
            <dt>Tags</dt>
            <dd>{pad(project.tags.length, 2)}</dd>
            <dt>Links</dt>
            <dd>{pad(linkCount, 2)}</dd>
          </dl>
        </div>
      </div>

      {/* No. 003 ·■·■·■·■·■· */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] whitespace-nowrap sm:text-xs">
          No.{pad(index + 1, 3)}
        </span>
        <div className="gbc-dex-rule flex-1" aria-hidden="true" />
      </div>

      {/* Dex entry */}
      <p className="mt-3 text-[10px] leading-relaxed sm:text-xs">
        {project.description}
      </p>

      {otherTags.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {otherTags.map((tag) => (
            <li
              key={tag}
              className="border-2 border-(--color-gbc-lcd-ink) px-2 py-0.5 text-[10px] uppercase"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      {linkCount > 0 && (
        <div className="mt-4 flex flex-col gap-1 text-[10px] uppercase sm:text-xs">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 py-1 pr-2 hover:bg-(--color-gbc-lcd-light) focus-visible:outline-2 focus-visible:outline-(--color-gbc-lcd-ink)"
            >
              <span className="gbc-cursor" aria-hidden="true" />
              Visit site
              <span className="sr-only">
                {" "}
                for {project.title} (opens in a new tab)
              </span>
            </a>
          )}
          {project.repoHref && (
            <a
              href={project.repoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit items-center gap-2 py-1 pr-2 hover:bg-(--color-gbc-lcd-light) focus-visible:outline-2 focus-visible:outline-(--color-gbc-lcd-ink)"
            >
              <span className="gbc-cursor" aria-hidden="true" />
              Source code
              <span className="sr-only">
                {" "}
                for {project.title} (opens in a new tab)
              </span>
            </a>
          )}
        </div>
      )}
    </article>
  );
}
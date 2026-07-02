import { useEffect, useMemo, useState } from 'react';
import AiBuildMeter from './AiBuildMeter';

export interface ProjectCardData {
  slug: string;
  title: string;
  tagline: string;
  year: number;
  type: 'product' | 'platform' | 'ai-agent' | 'experiment';
  status: 'live' | 'building' | 'archived';
  stack: string[];
  links: { live?: string; repo?: string };
  ai: { assist: number; tools: string[]; human: string };
}

const TYPES = [
  { id: 'all', label: 'All' },
  { id: 'product', label: 'Products' },
  { id: 'platform', label: 'Platforms' },
  { id: 'ai-agent', label: 'AI agents' },
  { id: 'experiment', label: 'Experiments' },
] as const;

type TypeFilter = (typeof TYPES)[number]['id'];

const STATUS_TEXT = { live: 'live', building: 'building', archived: 'archived' } as const;

function TypeGlyph({ type }: { type: ProjectCardData['type'] | 'all' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === 'all' ? <circle cx="12" cy="12" r="8" /> : null}
      {type === 'product' ? (
        <>
          <path d="M4 9 L12 5 L20 9 L20 17 L12 21 L4 17 Z" />
          <path d="M4 9 L12 13 L20 9 M12 13 L12 21" />
        </>
      ) : null}
      {type === 'platform' ? (
        <>
          <path d="M12 3 L21 8 L12 13 L3 8 Z" />
          <path d="M3 12.5 L12 17.5 L21 12.5 M3 17 L12 22 L21 17" />
        </>
      ) : null}
      {type === 'ai-agent' ? (
        <path d="M12 3 C14 8 16 10 21 12 C16 14 14 16 12 21 C10 16 8 14 3 12 C8 10 10 8 12 3 Z" />
      ) : null}
      {type === 'experiment' ? (
        <>
          <path d="M10 3 L10 9 L5 18 A2 2 0 0 0 7 21 L17 21 A2 2 0 0 0 19 18 L14 9 L14 3" />
          <path d="M8.5 3 L15.5 3 M7.5 15 L16.5 15" />
        </>
      ) : null}
    </svg>
  );
}

export default function ProjectGrid({ projects }: { projects: ProjectCardData[] }) {
  const [type, setType] = useState<TypeFilter>('all');
  const [tags, setTags] = useState<ReadonlySet<string>>(new Set());

  // The command palette can drive the type filter from anywhere on the page.
  useEffect(() => {
    const onFilter = (e: Event) => {
      const wanted = (e as CustomEvent<string>).detail as TypeFilter;
      setType(wanted);
      setTags(new Set());
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    };
    window.addEventListener('palette:filter', onFilter);
    return () => window.removeEventListener('palette:filter', onFilter);
  }, []);

  const allTags = useMemo(
    () => [...new Set(projects.flatMap((p) => p.stack))].sort(),
    [projects],
  );

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          (type === 'all' || p.type === type) &&
          [...tags].every((t) => p.stack.includes(t)),
      ),
    [projects, type, tags],
  );

  const toggleTag = (tag: string) =>
    setTags((prev) => {
      const next = new Set(prev);
      next.has(tag) ? next.delete(tag) : next.add(tag);
      return next;
    });

  return (
    <div className="pg">
      <div className="pg-filters" role="group" aria-label="Filter projects by type">
        {TYPES.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            className="pg-type"
            aria-pressed={type === id}
            onClick={() => setType(id)}
          >
            <TypeGlyph type={id} />
            {label}
          </button>
        ))}
      </div>
      <div className="pg-tags" role="group" aria-label="Filter projects by stack">
        {allTags.map((tag) => (
          <button
            key={tag}
            type="button"
            className="pg-tag"
            aria-pressed={tags.has(tag)}
            onClick={() => toggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="pg-empty">
          Nothing here yet — try the <kbd>Ctrl</kbd>+<kbd>K</kbd> palette.
        </p>
      ) : (
        <ul className="pg-grid">
          {filtered.map((p) => (
            <li key={p.slug} className="pg-card">
              <div className="pg-card-head">
                <span className="pg-card-type">
                  <TypeGlyph type={p.type} />
                  <span className="visually-hidden">{p.type}</span>
                </span>
                <span className={`pg-status pg-status-${p.status}`}>
                  <span className="pg-status-dot" aria-hidden="true" />
                  {STATUS_TEXT[p.status]}
                </span>
              </div>
              <h3 className="pg-card-title">
                <a href={`/projects/${p.slug}/`}>{p.title}</a>
              </h3>
              <p className="pg-card-tagline">{p.tagline}</p>
              <ul className="pg-stack" aria-label="Tech stack">
                {p.stack.slice(0, 6).map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <AiBuildMeter {...p.ai} />
              <div className="pg-card-links">
                {p.links.live ? (
                  <a href={p.links.live}>Live ↗</a>
                ) : null}
                {p.links.repo ? (
                  <a href={p.links.repo}>Code ↗</a>
                ) : null}
                <a className="pg-card-story" href={`/projects/${p.slug}/`}>
                  Read the build story →
                </a>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

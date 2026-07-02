import { useEffect, useState } from 'react';
import { Command } from 'cmdk';

interface Props {
  projects?: { slug: string; title: string }[];
}

const SECTIONS = [
  { label: 'Projects', hash: '#projects' },
  { label: 'How I build', hash: '#how-i-build' },
  { label: 'About', hash: '#about' },
  { label: 'Contact', hash: '#contact' },
];

const TYPE_FILTERS = [
  { label: 'Show all projects', type: 'all' },
  { label: 'Filter: products', type: 'product' },
  { label: 'Filter: platforms', type: 'platform' },
  { label: 'Filter: AI agents', type: 'ai-agent' },
  { label: 'Filter: experiments', type: 'experiment' },
];

const toast = (msg: string) =>
  window.dispatchEvent(new CustomEvent('app:toast', { detail: msg }));

export default function CommandPalette({ projects = [] }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('palette:open', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('palette:open', onOpen);
    };
  }, []);

  const close = () => {
    setOpen(false);
    setSearch('');
  };

  const goTo = (hash: string) => {
    close();
    if (window.location.pathname === '/') {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.assign(`/${hash}`);
    }
  };

  const setTheme = (theme: string) => {
    window.dispatchEvent(new CustomEvent('app:settheme', { detail: theme }));
    close();
  };

  const filterType = (type: string) => {
    close();
    if (window.location.pathname === '/') {
      window.dispatchEvent(new CustomEvent('palette:filter', { detail: type }));
    } else {
      window.location.assign('/#projects');
    }
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={(next) => (next ? setOpen(true) : close())}
      label="Command palette"
      className="palette"
    >
      <Command.Input
        value={search}
        onValueChange={setSearch}
        placeholder="Type a command… (try “kaixo”)"
      />
      <Command.List>
        <Command.Empty>Ezer ez — nothing found.</Command.Empty>

        <Command.Group heading="Go to">
          {SECTIONS.map(({ label, hash }) => (
            <Command.Item key={hash} onSelect={() => goTo(hash)}>
              {label}
            </Command.Item>
          ))}
          {projects.map(({ slug, title }) => (
            <Command.Item
              key={slug}
              onSelect={() => {
                close();
                window.location.assign(`/projects/${slug}/`);
              }}
            >
              {title} — build story
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Theme">
          {['light', 'dark', 'system'].map((theme) => (
            <Command.Item key={theme} onSelect={() => setTheme(theme)}>
              Theme: {theme}
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group heading="Filter projects">
          {TYPE_FILTERS.map(({ label, type }) => (
            <Command.Item key={type} onSelect={() => filterType(type)}>
              {label}
            </Command.Item>
          ))}
        </Command.Group>

        {/* Easter eggs: only surface when someone actually types them. */}
        {search.length >= 3 ? (
          <Command.Group heading="???">
            <Command.Item
              onSelect={() => {
                close();
                toast('Kaixo! 👋 That’s “hello” in Basque.');
              }}
            >
              kaixo
            </Command.Item>
            <Command.Item
              onSelect={() => {
                close();
                scrollTo({ top: 0, behavior: 'smooth' });
                window.dispatchEvent(new CustomEvent('skyline:wave'));
              }}
            >
              guggenheim
            </Command.Item>
            <Command.Item
              onSelect={() => {
                close();
                toast('Txapeldun = champion. You found the hidden command. 🏆');
              }}
            >
              txapeldun
            </Command.Item>
          </Command.Group>
        ) : null}
      </Command.List>
    </Command.Dialog>
  );
}

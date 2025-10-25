import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Icon } from './icons';
import { type Project } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);
        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);
    return debouncedValue;
};

export type ProjectSwitcherProps = {
  projects: Project[];
  value: string; // selectedProjectId
  onChange: (id: string) => void;
  className?: string;
};

export const ProjectSwitcher: React.FC<ProjectSwitcherProps> = ({ projects, value, onChange, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const selectedProject = projects.find(p => p.id === value) || projects[0];
  const selectedProjectDisplayName = selectedProject.branding?.displayName || selectedProject.name;
  const selectedProjectIcon = selectedProject.appearance?.icon || selectedProject.icon;
  const selectedProjectColor = selectedProject.appearance?.color || selectedProject.color;

  const [recentProjectIds, setRecentProjectIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('recent_projects');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const debouncedSearchTerm = useDebounce(searchTerm, 100);

  const { recentProjects, allProjectsFiltered } = useMemo(() => {
    const recent = recentProjectIds
      .map(id => projects.find(p => p.id === id))
      .filter((p): p is Project => !!p);
    
    const all = projects.filter(p => 
      (p.branding?.displayName || p.name).toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    return { recentProjects: recent, allProjectsFiltered: all };
  }, [debouncedSearchTerm, projects, recentProjectIds]);
  
  const displayItems = useMemo(() => {
    if (debouncedSearchTerm) return allProjectsFiltered;
    const recentIds = new Set(recentProjects.map(p => p.id));
    return [...recentProjects, ...allProjectsFiltered.filter(p => !recentIds.has(p))];
  }, [debouncedSearchTerm, recentProjects, allProjectsFiltered]);

  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
        const itemElement = listRef.current.children[focusedIndex] as HTMLLIElement;
        itemElement?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex, isOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          triggerRef.current?.focus();
          break;
        case 'ArrowDown':
          event.preventDefault();
          setFocusedIndex(prev => (prev + 1) % displayItems.length);
          break;
        case 'ArrowUp':
          event.preventDefault();
          setFocusedIndex(prev => (prev - 1 + displayItems.length) % displayItems.length);
          break;
        case 'Enter':
          event.preventDefault();
          if (focusedIndex >= 0 && displayItems[focusedIndex]) {
            handleSelect(displayItems[focusedIndex].id);
          }
          break;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, displayItems, focusedIndex]);

  useEffect(() => {
    if (isOpen) {
      setFocusedIndex(Math.max(0, displayItems.findIndex(p => p.id === value)));
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSelect = (id: string) => {
    onChange(id);
    const nextRecent = [id, ...recentProjectIds.filter(x => x !== id)].slice(0, 5);
    setRecentProjectIds(nextRecent);
    localStorage.setItem('recent_projects', JSON.stringify(nextRecent));
    setIsOpen(false);
    triggerRef.current?.focus();
  };
  
  return (
    <div className={`relative ${className}`}>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="group flex items-center space-x-2 py-2 pl-2 pr-3 text-sm font-medium transition-colors hover:bg-accent"
        style={{'--project-color': selectedProjectColor || '#7c3aed'} as React.CSSProperties}
      >
        <div className="relative rounded-md p-1.5 ring-1 ring-inset ring-border group-hover:bg-background/50" style={{ boxShadow: `0 0 0 2px var(--project-color)` }}>
          <Icon name={(selectedProjectIcon as any) || 'moon'} className="h-4 w-4" style={{color: 'var(--project-color)'}}/>
        </div>
        <span className="max-w-[120px] truncate" title={selectedProjectDisplayName}>{selectedProjectDisplayName}</span>
        <Icon name="chevrons-up-down" className="h-3 w-3 text-muted-foreground"/>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full z-[100] mt-2 w-72 origin-top-left rounded-xl border border-border bg-card shadow-2xl"
            role="listbox"
          >
            <div className="p-2">
                 <div className="relative">
                    <Icon name="search" className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input 
                        ref={searchInputRef}
                        type="text" 
                        placeholder="Search projects..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-lg border border-input bg-background/50 py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-ring" />
                </div>
            </div>
            <div className="max-h-[360px] overflow-y-auto p-2">
                <ul ref={listRef}>
                    {!debouncedSearchTerm && recentProjects.length > 0 && (
                        <>
                            <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Recent</h3>
                            {recentProjects.map((project, index) => {
                                const displayName = project.branding?.displayName || project.name;
                                const icon = project.appearance?.icon || project.icon;
                                const color = project.appearance?.color || project.color;
                                return (
                                <li key={`recent-${project.id}`} role="option" aria-selected={value === project.id}>
                                    <button onClick={() => handleSelect(project.id)} onMouseMove={() => setFocusedIndex(index)} className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition-colors ${value === project.id ? 'bg-primary/20 text-primary' : 'hover:bg-accent'} ${focusedIndex === index ? 'bg-accent' : ''}`}>
                                        <div className="flex items-center space-x-2.5">
                                            <Icon name={(icon as any) || 'folder'} className="h-4 w-4" style={{color: color}} />
                                            <span>{displayName}</span>
                                        </div>
                                        {value === project.id && <Icon name="check" className="h-4 w-4" />}
                                    </button>
                                </li>
                            )})}
                        </>
                    )}
                    <h3 className="px-2 pt-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">All Projects</h3>
                    {allProjectsFiltered.map((project, index) => {
                         const displayName = project.branding?.displayName || project.name;
                         const icon = project.appearance?.icon || project.icon;
                         const color = project.appearance?.color || project.color;
                         const overallIndex = !debouncedSearchTerm ? recentProjects.length + index : index;
                         return (
                         <li key={project.id} role="option" aria-selected={value === project.id}>
                             <button
                                 onClick={() => handleSelect(project.id)}
                                 onMouseMove={() => setFocusedIndex(overallIndex)}
                                 className={`flex w-full items-center justify-between rounded-md px-2 py-2 text-left text-sm transition-colors ${value === project.id ? 'bg-primary/20 text-primary' : 'hover:bg-accent'} ${focusedIndex === overallIndex ? 'bg-accent' : ''}`}
                             >
                                <div className="flex items-center space-x-2.5">
                                    <Icon name={(icon as any) || 'folder'} className="h-4 w-4" style={{color: color}} />
                                    <span>{displayName}</span>
                                </div>
                                {value === project.id && <Icon name="check" className="h-4 w-4" />}
                             </button>
                         </li>
                     )})}
                </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
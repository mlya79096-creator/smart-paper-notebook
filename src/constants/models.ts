import { v4 as uuidv4 } from 'uuid';
import { Notebook, Page } from '../store/appStore';
import { TEMPLATES } from './canvas';

export function createNotebook(
  name: string,
  category: string = 'General',
  tags: string[] = []
): Notebook {
  const id = uuidv4();
  const now = Date.now();

  return {
    id,
    name,
    category,
    tags,
    isPinned: false,
    pages: [createPage(id, 1, 'ruled')],
    createdAt: now,
    updatedAt: now,
  };
}

export function createPage(
  notebookId: string,
  pageNumber: number,
  template: 'ruled' | 'grid' | 'dotted' | 'cornell' | 'studyPlan' | 'reviewTable' = 'ruled'
): Page {
  return {
    id: uuidv4(),
    notebookId,
    pageNumber,
    template,
    drawing: '',
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
}


export function getNextPageNumber(notebook: Notebook): number {
  if (notebook.pages.length === 0) return 1;
  return Math.max(...notebook.pages.map((p) => p.pageNumber)) + 1;
}

export function sortNotebooksByDate(notebooks: Notebook[], order: 'asc' | 'desc' = 'desc'): Notebook[] {
  return [...notebooks].sort((a, b) => {
    const diff = b.updatedAt - a.updatedAt;
    return order === 'desc' ? diff : -diff;
  });
}

export function sortNotebooksByName(notebooks: Notebook[], order: 'asc' | 'desc' = 'asc'): Notebook[] {
  return [...notebooks].sort((a, b) => {
    const comparison = a.name.localeCompare(b.name);
    return order === 'asc' ? comparison : -comparison;
  });
}

export function getPinnedNotebooks(notebooks: Notebook[]): Notebook[] {
  return notebooks.filter((nb) => nb.isPinned);
}

export function getRecentNotebooks(notebooks: Notebook[], limit: number = 5): Notebook[] {
  return sortNotebooksByDate(notebooks, 'desc').slice(0, limit);
}

export function getAllCategories(notebooks: Notebook[]): string[] {
  const categories = new Set(notebooks.map((nb) => nb.category));
  return Array.from(categories).sort();
}

export function getAllTags(notebooks: Notebook[]): string[] {
  const tags = new Set<string>();
  notebooks.forEach((nb) => {
    nb.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}


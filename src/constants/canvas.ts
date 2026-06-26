export const DRAWING_TOOLS = {
  PENCIL: 'pencil',
  PEN: 'pen',
  MARKER: 'marker',
  BRUSH: 'brush',
  HIGHLIGHTER: 'highlighter',
  ERASER: 'eraser',
  LASSO: 'lasso',
} as const;

export const TEMPLATES = {
  RULED: 'ruled',
  GRID: 'grid',
  DOTTED: 'dotted',
  CORNELL: 'cornell',
  STUDY_PLAN: 'studyPlan',
  REVIEW_TABLE: 'reviewTable',
} as const;

export const TOOL_DEFAULTS = {
  pencil: { size: 2, opacity: 0.7, color: '#2C3E50' },
  pen: { size: 2, opacity: 1, color: '#000000' },
  marker: { size: 8, opacity: 1, color: '#FFD700' },
  brush: { size: 4, opacity: 1, color: '#8B4513' },
  highlighter: { size: 6, opacity: 0.4, color: '#FFFF00' },
  eraser: { size: 10, opacity: 1, color: '#FFFFFF' },
  lasso: { size: 2, opacity: 1, color: '#0a7ea4' },
} as const;

export const COLORS = {
  BLACK: '#000000',
  WHITE: '#FFFFFF',
  RED: '#EF4444',
  BLUE: '#0a7ea4',
  GREEN: '#22C55E',
  YELLOW: '#FFD700',
  ORANGE: '#F59E0B',
  PURPLE: '#A855F7',
  PINK: '#EC4899',
  GRAY: '#6B7280',
} as const;

export const BRUSH_SIZES = {
  EXTRA_SMALL: 1,
  SMALL: 2,
  MEDIUM: 4,
  LARGE: 8,
  EXTRA_LARGE: 12,
} as const;

export const OPACITY_LEVELS = {
  TRANSPARENT: 0.2,
  LIGHT: 0.4,
  MEDIUM: 0.6,
  DARK: 0.8,
  OPAQUE: 1,
} as const;

export const UNDO_REDO_LIMIT = 50;

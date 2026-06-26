import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Language } from '../locales/i18n';

export interface DrawingTool {
  type: 'pencil' | 'pen' | 'marker' | 'brush' | 'highlighter' | 'eraser' | 'lasso';
  color: string;
  size: number;
  opacity: number;
}

export interface TextStyle {
  fontSize: number;
  fontFamily: 'Tajawal' | 'Amiri' | 'System';
  color: string;
  alignment: 'left' | 'center' | 'right';
  bold: boolean;
  italic: boolean;
  underline: boolean;
}

export interface Page {
  id: string;
  notebookId: string;
  pageNumber: number;
  template: 'ruled' | 'grid' | 'dotted' | 'cornell' | 'studyPlan' | 'reviewTable';
  drawing: string; // SVG or canvas data
  audioUrl?: string;
  createdAt: number;
  updatedAt: number;
}

export interface Notebook {
  id: string;
  name: string;
  category: string;
  tags: string[];
  isPinned: boolean;
  thumbnail?: string;
  pages: Page[];
  createdAt: number;
  updatedAt: number;
}

export interface AppState {
  language: Language;
  theme: 'light' | 'dark' | 'auto';
  notebooks: Notebook[];
  currentNotebookId: string | null;
  currentPageId: string | null;
  currentTool: DrawingTool;
  currentTextStyle: TextStyle;
  undoStack: string[];
  redoStack: string[];
  isExamMode: boolean;
  examDuration: number;
  examStartTime: number | null;
}

export interface AppActions {
  setLanguage: (language: Language) => void;
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  addNotebook: (notebook: Notebook) => void;
  updateNotebook: (id: string, updates: Partial<Notebook>) => void;
  deleteNotebook: (id: string) => void;
  setCurrentNotebook: (id: string | null) => void;
  addPage: (page: Page) => void;
  updatePage: (notebookId: string, pageId: string, updates: Partial<Page>) => void;
  deletePage: (notebookId: string, pageId: string) => void;
  setCurrentPage: (pageId: string | null) => void;
  setCurrentTool: (tool: DrawingTool) => void;
  setCurrentTextStyle: (style: TextStyle) => void;
  pushUndo: (state: string) => void;
  pushRedo: (state: string) => void;
  undo: () => string | null;
  redo: () => string | null;
  clearUndoRedo: () => void;
  startExamMode: (duration: number) => void;
  endExamMode: () => void;
  togglePinNotebook: (id: string) => void;
  searchNotebooks: (query: string) => Notebook[];
  getNotebooksByCategory: (category: string) => Notebook[];
  getNotebooksByTag: (tag: string) => Notebook[];
}

const defaultDrawingTool: DrawingTool = {
  type: 'pen',
  color: '#000000',
  size: 2,
  opacity: 1,
};

const defaultTextStyle: TextStyle = {
  fontSize: 16,
  fontFamily: 'System',
  color: '#000000',
  alignment: 'left',
  bold: false,
  italic: false,
  underline: false,
};

const initialState: AppState = {
  language: 'en',
  theme: 'auto',
  notebooks: [],
  currentNotebookId: null,
  currentPageId: null,
  currentTool: defaultDrawingTool,
  currentTextStyle: defaultTextStyle,
  undoStack: [],
  redoStack: [],
  isExamMode: false,
  examDuration: 0,
  examStartTime: null,
};

export const useAppStore = create<AppState & AppActions>()(
  persist(
    (set: any, get: any) => ({
      ...initialState,

      setLanguage: (language: Language) => {
        set({ language });
      },

      setTheme: (theme: 'light' | 'dark' | 'auto') => {
        set({ theme });
      },

      addNotebook: (notebook: Notebook) => {
        set((state: any) => ({
          notebooks: [...state.notebooks, notebook],
        }));
      },

      updateNotebook: (id: string, updates: Partial<Notebook>) => {
        set((state: any) => ({
          notebooks: state.notebooks.map((nb: any) =>
            nb.id === id ? { ...nb, ...updates, updatedAt: Date.now() } : nb
          ),
        }));
      },

      deleteNotebook: (id: string) => {
        set((state: any) => ({
          notebooks: state.notebooks.filter((nb: any) => nb.id !== id),
          currentNotebookId: state.currentNotebookId === id ? null : state.currentNotebookId,
        }));
      },

      setCurrentNotebook: (id: string | null) => {
        set({ currentNotebookId: id, currentPageId: null });
      },

      addPage: (page: Page) => {
        set((state: any) => ({
          notebooks: state.notebooks.map((nb: any) =>
            nb.id === page.notebookId
              ? { ...nb, pages: [...nb.pages, page], updatedAt: Date.now() }
              : nb
          ),
        }));
      },

      updatePage: (notebookId: string, pageId: string, updates: Partial<Page>) => {
        set((state: any) => ({
          notebooks: state.notebooks.map((nb: any) =>
            nb.id === notebookId
              ? {
                  ...nb,
                  pages: nb.pages.map((p: any) =>
                    p.id === pageId ? { ...p, ...updates, updatedAt: Date.now() } : p
                  ),
                  updatedAt: Date.now(),
                }
              : nb
          ),
        }));
      },

      deletePage: (notebookId: string, pageId: string) => {
        set((state: any) => ({
          notebooks: state.notebooks.map((nb: any) =>
            nb.id === notebookId
              ? {
                  ...nb,
                  pages: nb.pages.filter((p: any) => p.id !== pageId),
                  updatedAt: Date.now(),
                }
              : nb
          ),
          currentPageId: state.currentPageId === pageId ? null : state.currentPageId,
        }));
      },

      setCurrentPage: (pageId: string | null) => {
        set({ currentPageId: pageId });
      },

      setCurrentTool: (tool: DrawingTool) => {
        set({ currentTool: tool });
      },

      setCurrentTextStyle: (style: TextStyle) => {
        set({ currentTextStyle: style });
      },

      pushUndo: (state: string) => {
        set((s: any) => ({
          undoStack: [...s.undoStack, state].slice(-50),
          redoStack: [],
        }));
      },

      pushRedo: (state: string) => {
        set((s: any) => ({
          redoStack: [...s.redoStack, state].slice(-50),
        }));
      },

      undo: () => {
        const state: AppState = get();
        if (state.undoStack.length === 0) return null;
        const newUndoStack = [...state.undoStack];
        const undoState = newUndoStack.pop()!;
        set({
          undoStack: newUndoStack,
          redoStack: [...state.redoStack, undoState].slice(-50),
        });
        return undoState;
      },

      redo: () => {
        const state: AppState = get();
        if (state.redoStack.length === 0) return null;
        const newRedoStack = [...state.redoStack];
        const redoState = newRedoStack.pop()!;
        set({
          redoStack: newRedoStack,
          undoStack: [...state.undoStack, redoState].slice(-50),
        });
        return redoState;
      },

      clearUndoRedo: () => {
        set({ undoStack: [], redoStack: [] });
      },

      startExamMode: (duration: number) => {
        set({
          isExamMode: true,
          examDuration: duration,
          examStartTime: Date.now(),
        });
      },

      endExamMode: () => {
        set({
          isExamMode: false,
          examDuration: 0,
          examStartTime: null,
        });
      },

      togglePinNotebook: (id: string) => {
        set((state: any) => ({
          notebooks: state.notebooks.map((nb: any) =>
            nb.id === id ? { ...nb, isPinned: !nb.isPinned } : nb
          ),
        }));
      },

      searchNotebooks: (query: string) => {
        const state: AppState = get();
        const lowerQuery = query.toLowerCase();
        return state.notebooks.filter(
          (nb: Notebook) =>
            nb.name.toLowerCase().includes(lowerQuery) ||
            nb.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
        );
      },

      getNotebooksByCategory: (category: string) => {
        const state: AppState = get();
        return state.notebooks.filter((nb: any) => nb.category === category);
      },

      getNotebooksByTag: (tag: string) => {
        const state: AppState = get();
        return state.notebooks.filter((nb: any) => nb.tags.includes(tag));
      },
    }),
    {
      name: 'app-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: any) => ({
        language: state.language,
        theme: state.theme,
        notebooks: state.notebooks,
      }),
    }
  )
);

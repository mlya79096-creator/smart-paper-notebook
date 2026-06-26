# Smart Paper Notebook - Design Document

## Overview
A professional-grade smart paper notebook application designed for iOS and Android, featuring advanced drawing capabilities, bookshelf management, and exam mode. The design prioritizes one-handed usage and portrait orientation (9:16).

## Screen List

### 1. Bookshelf (Home Screen)
- **Purpose**: Main hub for managing notebooks and accessing features
- **Content**: Grid/list of notebooks with thumbnails, quick actions
- **Key Elements**:
  - Floating action button (FAB) to create new notebook
  - Search/filter bar
  - Categories and tags display
  - Pinned notebooks section
  - Settings and exam mode access

### 2. Canvas (Drawing Screen)
- **Purpose**: Main drawing and note-taking interface
- **Content**: Full-screen canvas with drawing tools, text, and templates
- **Key Elements**:
  - Drawing toolbar (left side for one-handed use)
  - Undo/Redo controls
  - Tool options panel
  - Page navigation
  - Zoom and pan controls
  - Fullscreen mode toggle

### 3. Settings Screen
- **Purpose**: App configuration and preferences
- **Content**: Theme, language, export options, app info
- **Key Elements**:
  - Language selection (Arabic/English)
  - Theme toggle (light/dark)
  - Default drawing tools preferences
  - Storage and backup options
  - About and license information

### 4. Exam Mode Screen
- **Purpose**: Locked mode for exam/test taking
- **Content**: Restricted canvas with limited tools
- **Key Elements**:
  - Timer display
  - Limited drawing tools
  - No access to other notebooks
  - Lock screen on exit attempt

### 5. Notebook Detail Screen
- **Purpose**: Manage individual notebook properties
- **Content**: Notebook metadata, page management
- **Key Elements**:
  - Notebook title and description
  - Category and tags
  - Page thumbnails
  - Delete/duplicate options
  - Export options

### 6. Page Templates Screen
- **Purpose**: Select and apply page templates
- **Content**: Template gallery
- **Key Elements**:
  - Ruled paper
  - Grid
  - Dotted
  - Cornell notes
  - Study plans
  - Review tables

## Primary Content and Functionality

### Bookshelf System
- Create multiple notebooks with custom names
- Organize with categories and tags
- Pin favorite notebooks
- Quick thumbnail preview
- Swipe actions (delete, duplicate, export)

### Canvas Engine
- Vector-based drawing with Skia support
- Multiple drawing tools (pencil, pen, marker, brush, highlighter)
- Smart eraser (line and partial erasing)
- Lasso selection tool
- Undo/Redo up to 50 steps
- Full touch support (zoom, pan, pressure sensitivity)
- Fullscreen mode

### Drawing Tools
- **Pencil**: Light, sketchy strokes
- **Pen**: Precise, ink-like strokes
- **Marker**: Thick, opaque strokes
- **Brush**: Artistic, textured strokes
- **Highlighter**: Semi-transparent, overlay strokes
- **Eraser**: Smart erasing (line or partial)
- **Lasso**: Selection tool for moving/deleting

### Text Support
- Add text layers to canvas
- Arabic and English font support (Tajawal, Amiri)
- Adjustable size, color, and alignment
- Text editing with keyboard input

### Templates
- Ruled paper (horizontal lines)
- Grid (square grid)
- Dotted (dot matrix)
- Cornell notes (note-taking format)
- Study plans (structured layout)
- Review tables (grid for review)

### Additional Features
- PDF export (local storage)
- Audio recording linked to pages
- Exam lock mode (restricted access)
- RTL/LTR full support
- Auto-save on every change

## Key User Flows

### Flow 1: Create and Draw
1. User opens app → Bookshelf screen
2. Tap FAB → Create notebook dialog
3. Enter name, select template → Canvas opens
4. User draws, writes, and organizes content
5. Auto-save triggers on every change
6. User can switch pages, undo/redo actions

### Flow 2: Manage Notebooks
1. User on Bookshelf → Swipe notebook
2. Options: Delete, Duplicate, Export, Properties
3. Edit notebook metadata (name, category, tags)
4. Return to Bookshelf

### Flow 3: Exam Mode
1. User selects notebook → Tap "Start Exam"
2. Exam mode activated (limited tools, timer)
3. User draws with restricted tools
4. Exit attempt locked (confirmation required)
5. Exam ends → Results saved

### Flow 4: Export and Share
1. User on Canvas → Tap export menu
2. Select format (PDF, image)
3. Choose save location or share
4. File exported successfully

## Color Choices

### Brand Colors
- **Primary**: `#0a7ea4` (Professional Blue)
- **Accent**: `#22C55E` (Success Green)
- **Warning**: `#F59E0B` (Amber)
- **Error**: `#EF4444` (Red)

### Neutral Colors
- **Background Light**: `#ffffff` (Pure White)
- **Background Dark**: `#151718` (Deep Dark)
- **Surface Light**: `#f5f5f5` (Light Gray)
- **Surface Dark**: `#1e2022` (Dark Gray)
- **Text Light**: `#11181C` (Dark Text)
- **Text Dark**: `#ECEDEE` (Light Text)
- **Border Light**: `#E5E7EB` (Light Border)
- **Border Dark**: `#334155` (Dark Border)

### Drawing Tool Colors
- **Pencil**: `#2C3E50` (Dark Gray)
- **Pen**: `#000000` (Black)
- **Marker**: `#FFD700` (Gold)
- **Brush**: `#8B4513` (Brown)
- **Highlighter**: `#FFFF00` (Yellow, semi-transparent)
- **Eraser**: `#FFFFFF` (White)

## Layout Principles

### One-Handed Usage
- All primary controls on left side of screen
- Toolbar positioned for thumb reach
- Large touch targets (minimum 44pt)
- Avoid right-side interactions

### Responsive Design
- Portrait orientation (9:16) primary
- Safe area handling for notches
- Tab bar integration
- Fullscreen canvas mode

### RTL/LTR Support
- Dynamic layout direction
- Text alignment based on locale
- Icon mirroring for Arabic
- Consistent spacing regardless of direction

## Interaction Patterns

### Drawing
- Pressure-sensitive strokes
- Smooth interpolation between points
- Real-time rendering feedback
- Haptic feedback on tool selection

### Navigation
- Tab-based navigation (Bookshelf, Canvas, Settings)
- Swipe gestures for page navigation
- Long-press for context menus
- Pinch-to-zoom on canvas

### Feedback
- Visual press states on buttons
- Loading indicators for operations
- Toast notifications for actions
- Haptic feedback for confirmations

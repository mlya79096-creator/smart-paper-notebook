# Smart Paper Notebook

A professional-grade smart paper notebook application for iOS and Android, built with React Native and Expo. Features advanced drawing capabilities, bookshelf management, multiple templates, and exam mode.

## Ownership

**Copyright © 2026 Amar Ali**  
**Email:** aammaarr925@gmail.com

All intellectual property rights to this project are exclusively owned by Amar Ali. This project is proprietary and confidential.

## Features

### Core Functionality

**Bookshelf System**: Create and manage multiple notebooks with custom organization. Support for categories, tags, and pinning. Quick thumbnail previews and swipe actions for easy management.

**Canvas Engine**: Vector-based drawing with advanced features including pressure sensitivity, smooth interpolation, and real-time rendering. Support for zoom, pan, and fullscreen mode with up to 50 undo/redo steps.

**Drawing Tools**: Complete set of professional drawing tools including pencil, pen, marker, brush, highlighter, smart eraser (line and partial), and lasso selection tool.

**Text Support**: Add text layers to canvas with support for Arabic (Tajawal, Amiri) and English fonts. Adjustable size, color, and alignment with full keyboard input support.

**Page Templates**: Multiple pre-designed templates for different use cases including ruled paper, grid, dotted, Cornell notes, study plans, and review tables.

**Additional Features**: Local PDF export, audio recording linked to pages, exam lock mode with restricted tools, and comprehensive RTL/LTR support.

### Technical Highlights

- **React Native + Expo**: Latest stable SDK (54) with TypeScript strict mode
- **State Management**: Zustand for efficient state management
- **Local Storage**: AsyncStorage for persistent data
- **UI Framework**: NativeWind (Tailwind CSS) + React Native Paper
- **Internationalization**: Full Arabic and English support with RTL/LTR
- **Performance**: Optimized for smooth interaction even with large drawings
- **Dark Mode**: Automatic light/dark theme switching

## Project Structure

```
smart-paper-notebook/
├── app/                    # Expo Router screens and navigation
│   ├── (tabs)/            # Tab-based navigation
│   ├── _layout.tsx        # Root layout with providers
│   └── oauth/             # OAuth callback handling
├── src/
│   ├── components/        # Reusable UI components
│   ├── screens/           # Application screens
│   ├── store/             # Zustand state management
│   ├── constants/         # Theme, colors, typography
│   ├── assets/            # Fonts, icons, textures
│   └── locales/           # Arabic and English translations
├── server/                # Backend API (optional)
├── app.config.ts          # Expo configuration
├── eas.json               # EAS build configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies
```

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or physical device)

### Installation

```bash
# Clone the repository
git clone https://github.com/amar-ali/smart-paper-notebook.git
cd smart-paper-notebook

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

### Development

**Web Preview**: `pnpm dev:metro`  
**iOS**: `pnpm ios`  
**Android**: `pnpm android`  
**Linting**: `pnpm lint`  
**Type Check**: `pnpm check`  
**Tests**: `pnpm test`

## Building for Production

### Local Build

```bash
# Build for Android
eas build -p android --profile preview

# Build for iOS
eas build -p ios --profile preview
```

### Automated CI/CD

The project includes GitHub Actions workflow for automatic builds. Push to `main` branch triggers:

1. Dependency installation and type checking
2. Automated APK build for Android
3. Upload to GitHub Releases

```bash
git push origin main
# GitHub Actions automatically builds and releases APK
```

## Configuration

### App Branding

Edit `app.config.ts` to customize:

- **appName**: Display name in app stores
- **appSlug**: Unique identifier (do not change)
- **logoUrl**: S3 URL of app icon

### Theme Colors

Modify `theme.config.js` to adjust brand colors:

```javascript
const themeColors = {
  primary: { light: '#0a7ea4', dark: '#0a7ea4' },
  background: { light: '#ffffff', dark: '#151718' },
  // ... more colors
};
```

### Translations

Add or modify translations in `src/locales/`:

- `ar.json` - Arabic translations
- `en.json` - English translations

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Framework | React Native 0.81 + Expo 54 |
| Language | TypeScript 5.9 (strict mode) |
| State Management | Zustand |
| Styling | NativeWind (Tailwind CSS) |
| UI Components | React Native Paper |
| Storage | AsyncStorage + SQLite |
| Routing | Expo Router 6 |
| Build System | EAS Build |
| CI/CD | GitHub Actions |

## Performance Optimization

- Lazy loading of screens and components
- Memoization of expensive computations
- Optimized canvas rendering with Skia
- Efficient gesture handling with Reanimated
- Smart caching of assets and fonts

## Accessibility

- Full RTL/LTR support
- High contrast colors in dark mode
- Large touch targets (minimum 44pt)
- Haptic feedback for interactions
- Screen reader support

## Testing

```bash
# Run unit tests
pnpm test

# Run with coverage
pnpm test -- --coverage

# Watch mode
pnpm test -- --watch
```

## Contributing

This is a proprietary project. Contributions are not accepted.

## License

MIT License - See [LICENSE](./LICENSE) file for details.

**All intellectual property rights are exclusively owned by Amar Ali.**

## Support

For issues or questions, contact: aammaarr925@gmail.com

## Changelog

### Version 1.0.0 (Initial Release)

- Complete bookshelf system with categorization
- Advanced canvas engine with multiple drawing tools
- Page templates (ruled, grid, dotted, Cornell, study plans, review tables)
- Text input with Arabic and English support
- PDF export functionality
- Audio recording linked to pages
- Exam lock mode with restricted tools
- Full RTL/LTR support
- Dark/light theme switching
- Automated CI/CD with GitHub Actions

---

**Built with ❤️ by Amar Ali**

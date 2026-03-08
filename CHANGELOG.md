# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.1.1] - 2026-03-09

### Fixed
- Import path in src/services/firebaseSync.js (changed './firebase' to '../firebase')
- Import path in src/hooks/useFirebaseSync.js (changed './firebaseSync' to '../services/firebaseSync')
- Module resolution errors preventing Firebase integration from loading

### Technical Details
- Corrected relative import paths to match project structure
- Firebase now initializes correctly on application start

---

## [1.1.0] - 2026-03-09

### Added
- Firebase SDK 10.7.1 integration
- Firestore database connection with offline persistence
- Google OAuth 2.0 authentication
- Real-time sync listeners for all data collections
- FirebaseSyncPanel UI component with cloud icon indicator
- Upload/Download manual sync functionality
- useFirebaseSync React hook for authentication state
- FirebaseSync service with CRUD operations for 6 collections
- Firestore security rules (user-based read/write)
- Firebase configuration file with project credentials
- FIREBASE-SETUP.md documentation
- FIREBASE-README.md user guide
- FIREBASE-INSTALL.bat installation script
- .env.example template for credentials

### Changed
- App.jsx header with Firebase sync panel
- Project structure with hooks/ and services/ directories

### Technical Details
- Firebase bundle size: +180KB (gzipped)
- Collections: transactions, accounts, categories, loans, investments, recurring
- IndexedDB persistence for offline support
- Server-side timestamps for conflict resolution

---

## [1.0.0] - 2026-03-08

### Added
- React 18.2.0 as main framework
- Vite 5.0.8 build system with HMR
- Tailwind CSS 3.4.0 for styling
- Recharts 2.10.3 integration with 3 chart types (AreaChart, PieChart, BarChart)
- jsPDF 2.5.1 for PDF export functionality
- Lucide React 0.263.1 icon library
- PWA support with manifest.json and service worker
- Dark mode toggle with localStorage persistence
- Transaction management (income/expense)
- Account management with multiple accounts support
- Loan tracking with progress bars
- Investment portfolio tracking
- Recurring payments system
- Category management
- Export to PDF feature (financial reports)
- Responsive design (mobile-first)
- LocalStorage data persistence
- Vercel deployment configuration
- GitHub integration with auto-deploy
- Git workflow scripts (GIT-SETUP.bat, GITHUB-PUSH.bat, GITHUB-UPDATE.bat)
- Deploy automation (DEPLOY.bat)
- Build script (BUILD.bat)
- Development server script (DEV.bat)

### Changed
- Migrated from Preact CDN to React with proper build system
- Replaced in-browser Babel transpilation with Vite
- Updated vite.config.js with host '0.0.0.0' and allowedHosts for ngrok compatibility
- Modified server configuration to support external access

### Fixed
- PieChart component naming conflict with Recharts PieChart (renamed to PieChartIcon)
- Vite terser configuration (changed minify from 'terser' to 'esbuild')
- Dark mode styling for loan cards (.bg-blue-50, .bg-green-50, etc.)
- JSX closing tag error in PieChart implementation
- PDF export ternary operator syntax in setTextColor calls

### Removed
- Preact CDN dependencies
- Babel standalone browser transpilation
- Chart.js (replaced with Recharts)

### Technical Details
- Node.js compatibility: >=18.0.0
- Package manager: npm
- Build output: dist/
- Dev server port: 3000
- Production build uses esbuild minification
- Service worker caches: /, /index.html, /manifest.json

---

## [0.9.0] - 2026-03-08

### Added
- Vercel deployment integration
- GitHub repository integration
- Auto-deploy workflow (GitHub → Vercel)
- vercel.json configuration file
- .vercelignore file
- Git automation scripts
- Documentation files (DEPLOY-GUIDE.md, GITHUB-GUIDE.md)

### Changed
- .gitignore expanded with additional patterns

### Fixed
- Vite server allowedHosts configuration for ngrok tunneling

---

## [0.8.0] - 2026-03-07

### Added
- PWA manifest.json with app metadata
- Service worker (sw.js) with network-first caching strategy
- PWAInstallPrompt component with beforeinstallprompt event handling
- Apple-specific PWA meta tags
- Theme color configuration

### Changed
- main.jsx to register service worker on window load
- index.html with PWA meta tags

---

## [0.7.0] - 2026-03-07

### Added
- React 18 project structure
- Vite configuration
- Tailwind CSS build pipeline
- PostCSS configuration
- npm scripts for dev/build/preview

### Changed
- Complete migration from CDN-based to build-based architecture
- Component structure with src/ directory
- CSS organization with src/styles/

### Removed
- CDN script tags
- Inline Babel transpilation

---

## [0.6.0] - 2026-03-06

### Added
- jsPDF library integration
- exportPDF() function with multi-page support
- PDF report generation with header, summary cards, accounts list, transactions
- Export button in settings menu
- Automatic filename generation (relatorio-financeiro-YYYY-MM-DD.pdf)

### Fixed
- setTextColor() syntax errors (ternary operator with multiple arguments)

---

## [0.5.0] - 2026-03-06

### Added
- Dark mode implementation across all components
- Toggle button (sun/moon icons)
- Dark mode state persistence in localStorage
- CSS overrides for dark mode (.dark-mode class)

### Fixed
- Loan card background colors in dark mode
- Text visibility in dark mode
- Gradient backgrounds for dark theme

---

## [0.4.0] - 2026-03-06

### Added
- Visual redesign with gradient cards
- Circular SVG icons
- Large number displays
- Rounded buttons
- Mobile-first layout improvements

### Changed
- Card styling with color-coded gradients
- Typography hierarchy
- Component spacing and padding
- Button styles across application

---

## [0.3.0] - 2026-03-05

### Added
- Loan management feature
- Loan progress bars
- Remaining months calculation
- Monthly payment editing

---

## [0.2.0] - 2026-03-05

### Added
- Investment management
- Account management
- Recurring payments
- Transaction categories

---

## [0.1.0] - 2026-03-04

### Added
- Initial release
- Basic transaction management
- Simple dashboard
- LocalStorage persistence

---

## Technical Notes

### Dependencies
- react: ^18.2.0
- react-dom: ^18.2.0
- recharts: ^2.10.3
- jspdf: ^2.5.1
- lucide-react: ^0.263.1

### Dev Dependencies
- @vitejs/plugin-react: ^4.2.1
- tailwindcss: ^3.4.0
- vite: ^5.0.8
- autoprefixer: ^10.4.16
- postcss: ^8.4.32

### Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android 90+)

### Known Issues
- None currently

---

**For user-facing release information, see RELEASE-NOTES.md**


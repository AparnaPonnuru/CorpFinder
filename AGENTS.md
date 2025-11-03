# AGENTS.md

## Build/Lint/Test Commands
- **Frontend (demo-project)**: `npm start` (dev), `npm run build` (prod), `npm test` (Jest all), `npm test -- --testNamePattern="test name"` (single test), `npm test -- --testPathPattern=App.test.js` (file test). No lint script; uses ESLint via react-scripts.
- **Backend (demo-backend)**: `npm start` (run server), `npm test` (placeholder). No lint.

## Code Style Guidelines
- **Imports**: ES6, group external libs first (React, MUI, Axios), then local. No default exports for components.
- **Formatting**: 2-space indent, semicolons, single quotes. No trailing commas. Max line 80 chars.
- **Types**: No TypeScript; use PropTypes sparingly. Infer types from usage.
- **Naming**: camelCase vars/functions, PascalCase components, UPPER_CASE constants. Files: PascalCase.js.
- **Error Handling**: Async/await with try/catch; log errors, show user-friendly messages.
- **Components**: Functional with hooks; avoid class components. Use MUI for UI.
- **State**: Local state with useState; no Redux. Persist dark mode in localStorage.
- **API**: Axios for calls; handle loading/errors in UI.
- **Backend**: Express routes; Mongoose for DB; basic CORS.

No Cursor or Copilot rules found.
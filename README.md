# MrWinRock Portfolio

A modern, responsive developer portfolio built with **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS**.

Showcase your skills, projects, and experience with a fast, modular, and easily customizable portfolio site.

## Features

- ⚡️ Ultra-fast Vite build with SWC for React
- 🎨 Tailwind CSS 4 for rapid, modern styling
- 🧩 Modular React component structure for easy customization
- 📱 Fully responsive design for all devices
- 🛠️ ESLint with TypeScript and React rules for code quality
- 🚀 Ready for GitHub Pages deployment (see [deploy.yml](.github/workflows/deploy.yml))

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Bun](https://bun.sh/) (optional, for fast scripts)
- [pnpm](https://pnpm.io/), [npm](https://www.npmjs.com/), or [yarn](https://yarnpkg.com/)

### Install dependencies

```sh
bun install
# or
npm install
# or
pnpm install
```

### Development

```sh
bun run dev
# or
npm run dev
# or
pnpm dev
```

### Build

```sh
bun run build
# or
npm run build
# or
pnpm build
```

### Preview

```sh
bun run preview
# or
npm run preview
# or
pnpm preview
```

### Lint

```sh
bun run lint
# or
npm run lint
# or
pnpm lint
```

## Project Structure

```
mrwinrock/
├── public/           # Static assets (favicon, CNAME, 404.html)
├── src/
│   ├── components/   # React components (Navbar, Footer, pages, etc.)
│   ├── lib/          # Utility functions
│   ├── index.css     # Tailwind and global styles
│   └── main.tsx      # App entry point
├── tailwind.config.ts
├── vite.config.ts
├── tsconfig*.json
└── package.json
```

## ESLint & TypeScript

- ESLint config: [`eslint.config.js`](eslint.config.js)
- TypeScript configs: [`tsconfig.json`](tsconfig.json), [`tsconfig.app.json`](tsconfig.app.json), [`tsconfig.node.json`](tsconfig.node.json)

## Deployment

Deploy your portfolio to GitHub Pages automatically by pushing to the `release` branch.

## Credits

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [SWC](https://swc.rs/)
- [Bun](https://bun.sh/)

---

MIT License
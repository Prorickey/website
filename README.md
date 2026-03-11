# Portfolio

My personal portfolio website — a showcase of my projects, skills, and blog posts.

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/) for animations

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Scripts

| Command              | Description               |
| -------------------- | ------------------------- |
| `npm run dev`        | Start development server  |
| `npm run build`      | Production build          |
| `npm run start`      | Start production server   |
| `npm run lint`       | Run ESLint                |
| `npm run format`     | Check Prettier formatting |
| `npm run format:fix` | Auto-fix formatting       |

## Project Structure

```
app/                  Next.js App Router pages
├── page.tsx          Home (intro, about, projects)
├── blog/
│   ├── page.tsx      Blog listing
│   └── [name]/       Dynamic blog post routes
components/           Reusable UI components
blogs/                Blog post content (TSX) and registry
public/
├── projects.json     Project data
├── langlinks.json    Technology → documentation URL mapping
├── icons/            SVG icons
├── images/           Portfolio images
└── knows/            Technology logos
```

## Adding a Blog Post

1. Create a new TSX file in `blogs/` that exports an object with `title`, `publishedAt`, `readTime`, and `component`
2. Add it to the registry in `blogs/index.tsx`
3. The post will be accessible at `/blog/<registry-key>`

## Deployment

Pushes to `main` trigger a GitHub Actions workflow that:

1. Builds a Docker image (multi-stage, Node 22-alpine)
2. Pushes to `docker.bedson.tech`
3. Deploys to the server via SSH + Docker Compose

See `SETUP.md` for required secrets and server configuration.

# AGENTS.md

Guidance for AI agents working on the Strata documentation site.

## What this repo is

Strata is a Docusaurus 3 documentation site where every topic page has three levels of detail — **short**, **medium**, **long** — controlled by a site-wide toggle that persists in `localStorage`. Content is written in MDX; the depth system is React.

**Stack:** Docusaurus 3.10 · React 19 · TypeScript (strict) · MDX · GitHub Pages

---

## Commands

```bash
npm install          # install dependencies (Node 20+ required)
npm start            # dev server at localhost:3000
npm run build        # production build — run this to validate ALL changes
npm run typecheck    # TypeScript check only (no build)
npm run clear        # clear Docusaurus cache if the dev server acts strangely
```

### Validation rule

**Always run `npm run build` before committing.** A passing build guarantees:
- All internal links resolve (`onBrokenLinks: 'throw'`)
- MDX compiles without syntax errors
- TypeScript has no type errors

There are no other tests. The build is the test suite.

---

## Git workflow

### Commit author

Commits must be authored as `Claude <noreply@anthropic.com>` or they show as "Unverified" on GitHub. Set this **before** the first commit in any session:

```bash
git config user.email noreply@anthropic.com
git config user.name Claude
```

If a commit slips through with the wrong author, amend and push to a **new branch** (force-pushing an already-pushed branch is blocked in auto mode):

```bash
git config user.email noreply@anthropic.com && git config user.name Claude
git commit --amend --no-edit --reset-author
git checkout -b feat/descriptive-name
git push -u origin feat/descriptive-name
```

### Branch naming

Use descriptive feature branch names, not session IDs:
- `feat/expand-topics-and-search` ✓
- `claude/strata-documentation-app-ENYV1` ✗

The remote maps all pushes to `main`, so the branch name only matters for PR readability.

### Search plugin

`@easyops-cn/docusaurus-search-local` is installed and configured in `docusaurus.config.ts` under `themes`. It generates a static search index at build time — no external service required. Works on GitHub Pages out of the box.

---

## Architecture

### Depth system

```
DepthContext (src/context/DepthContext.tsx)
  └─ holds: level = 'short' | 'medium' | 'long'
  └─ persists to: localStorage key 'strata-depth'
  └─ SSR-safe: all localStorage access guarded by typeof window !== 'undefined'

DepthProvider (src/theme/Root.tsx)
  └─ wraps the entire app — available on every page

Level (src/components/Level.tsx)
  └─ <Level show="short"> renders children only when context level matches
  └─ registered globally — never import it in MDX files
```

### Global MDX components

These three components are registered in `src/theme/MDXComponents.tsx` and available in **every MDX file without imports**:

| Component | Usage | Purpose |
|-----------|-------|---------|
| `<Level show="short\|medium\|long">` | Wraps depth-specific content | Conditional render by depth |
| `<CheatSection title="...">` | Wraps a table of commands | Styled reference card section |
| `<Tutorials>` | Never used manually | Auto-injected from frontmatter by `src/theme/DocItem/Footer/index.tsx` |

### Tutorials injection

Add `tutorials` to MDX frontmatter — the footer swizzle renders the "Go deeper" box automatically:

```yaml
tutorials:
  - label: "Link label"
    url: https://example.com
```

### Swizzled theme files

| File | What it does |
|------|-------------|
| `src/theme/Root.tsx` | Wraps app in `<DepthProvider>` |
| `src/theme/MDXComponents.tsx` | Registers `Level`, `Tutorials`, `CheatSection` globally |
| `src/theme/NavbarItem/ComponentTypes.tsx` | Registers `custom-depthToggle` navbar item type |
| `src/theme/DocItem/Footer/index.tsx` | Injects `<Tutorials>` from frontmatter before doc footer |

---

## Adding a topic

Five files must be touched. Follow this checklist exactly.

### 1. Create `docs/{topic}/_category_.json`

Use the next available position (currently 9 topics, so new ones start at 10):

```json
{
  "label": "Topic Name",
  "position": 10,
  "link": {
    "type": "generated-index",
    "slug": "/topic-name",
    "description": "One sentence about the topic."
  }
}
```

The `slug` value must match the `path` in step 4 and the `to` in step 5.

### 2. Create MDX pages

Each page must include all three depth levels. Use this template:

```mdx
---
title: Page Title
sidebar_label: Short Label
sidebar_position: 1
tutorials:
  - label: "Link label"
    url: https://example.com
---

# Page Title

<Level show="short">
TL;DR — one key concept or command block.
</Level>

<Level show="medium">
Practical guide with working examples.
</Level>

<Level show="long">
Deep-dive: internals, edge cases, gotchas, comparison tables.
</Level>
```

### 3. Create `docs/{topic}/cheat-sheet.mdx`

```mdx
---
title: Topic Cheat Sheet
sidebar_label: Cheat Sheet
sidebar_position: 99
---

# Topic Cheat Sheet

<CheatSection title="Section Name">

| Command | What it does |
|---------|-------------|
| `command` | Description |

</CheatSection>
```

`sidebar_position: 99` puts the cheat sheet last in the topic.

### 4. Add to landing page — `src/pages/index.tsx`

Add to the `TOPICS` array:

```tsx
{
  name: 'Topic Name',
  path: '/docs/topic-name',   // must match slug in _category_.json
  icon: '⚡',                  // emoji or ≤3 char string
  desc: 'One sentence describing the topic.',
},
```

### 5. Add to footer — `docusaurus.config.ts`

In `themeConfig.footer.links`, under the `'Topics'` column:

```ts
{label: 'Topic Name', to: '/docs/topic-name'},
```

---

## Current topic positions

| Pos | Topic | Slug | Pages |
|-----|-------|------|-------|
| 1 | Git | `/git` | branching, commits, remotes, undoing |
| 2 | Docker | `/docker` | basics, networking, compose, dockerfile |
| 3 | Linux | `/linux` | — |
| 4 | JavaScript | `/javascript` | async, closures, modules |
| 5 | SQL | `/sql` | queries, schema, indexes |
| 6 | Kubectl | `/kubectl` | — |
| 7 | AKS | `/aks` | — |
| 8 | Flux | `/flux` | — |
| 9 | CLI Commands | `/cli` | — |
| 10 | Terraform | `/terraform` | basics, state, modules |
| 11 | Python | `/python` | fundamentals, data-structures, async |
| 12 | GitHub Actions | `/github-actions` | basics, jobs-and-steps, reusable-workflows |
| 13 | Helm | `/helm` | basics, templating |
| 14 | TypeScript | `/typescript` | types, generics, patterns |
| 15 | Go | `/go` | basics, concurrency, cli-and-http |
| 16 | Bash | `/bash` | scripting, text-processing, automation |
| 17 | OpenTelemetry | `/opentelemetry` | concepts, instrumentation, production |

New topics start at position 18. Aim for 3–4 content pages per topic (plus cheat-sheet at position 99).

---

## Adding a global MDX component

1. Create `src/components/MyComponent.tsx` (and `MyComponent.module.css` if needed)
2. Register in `src/theme/MDXComponents.tsx`:

```ts
import MyComponent from '@site/src/components/MyComponent';

export default {
  ...MDXComponents,
  Level,
  Tutorials,
  CheatSection,
  MyComponent,   // ← add here
};
```

3. Use in any MDX file without importing: `<MyComponent />`

---

## Import paths

Use the `@site/` alias for all imports from `src/`:

```ts
import Level from '@site/src/components/Level';         // ✓
import Level from '../../components/Level';             // ✗
```

---

## Rules and constraints

- **Never import `Level`, `CheatSection`, or `Tutorials` in MDX files** — they are globally registered.
- **Always SSR-guard `localStorage`** with `typeof window !== 'undefined'` — Docusaurus renders on the server where `window` doesn't exist.
- **Do not edit `sidebars.ts`** — sidebar is autogenerated from the `docs/` folder structure.
- **Do not add blog posts** — `blog: false` in `docusaurus.config.ts`.
- **Broken internal links fail the build** — `onBrokenLinks: 'throw'`. If a link breaks after renaming a file or slug, fix the link.
- **Category slug = path in index.tsx = to in footer** — these three must stay in sync when adding or renaming a topic.
- **TypeScript strict mode is on** — no `any`, no unguarded nulls.

---

## Key file map

```
docusaurus.config.ts          Site config, navbar, footer, GitHub Pages URL
sidebars.ts                   Autogenerated — do not edit manually
src/
  context/DepthContext.tsx    Depth state + localStorage persistence
  components/
    Level.tsx                 <Level show="short|medium|long">
    CheatSection.tsx          <CheatSection title="...">
    Tutorials.tsx             "Go deeper" link box
    DepthToggle.tsx           short/medium/long navbar pill buttons
  theme/
    Root.tsx                  Wraps app in <DepthProvider>
    MDXComponents.tsx         Global component registry
    NavbarItem/ComponentTypes.tsx   custom-depthToggle navbar item
    DocItem/Footer/index.tsx  Auto-renders <Tutorials> from frontmatter
  pages/index.tsx             Landing page + TOPICS array
  css/custom.css              Brand tokens (--ifm-color-primary etc.)
docs/
  {topic}/_category_.json    Sidebar label, position, slug
  {topic}/*.mdx               Topic pages (short/medium/long content)
  {topic}/cheat-sheet.mdx    Quick-reference (sidebar_position: 99)
.github/workflows/deploy.yml  Build + deploy to GitHub Pages on push to main
```

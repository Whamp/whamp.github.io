# Writing in this repo

This guide is for **writers first**. If you only need to draft, edit, preview, and publish posts,
start here.

## The short version

1. Open the repo in VS Code or GitHub Codespaces.
2. Start preview: `yarn dev`.
3. Create a draft: `yarn new-post "My Title"`.
4. Write in `data/blog/YYYY-MM-DD-my-title.mdx`.
5. Add images with `yarn add-image ./path/to/image.png topic-folder "Alt text"`.
6. Keep `draft: true` while writing.
7. When ready to publish, set `draft: false` (or remove `draft`) and push.

---

## 1) Open and preview locally

- Open the repo in **VS Code** or **GitHub Codespaces**.
- Run:

```bash
yarn dev
```

- Keep this running while you write.
- Open the local URL shown in the terminal (usually `http://localhost:3000`).

## 2) Create a new post draft

Run:

```bash
yarn new-post "My Title"
```

What this does for you:

- Creates a file at `data/blog/YYYY-MM-DD-my-title.mdx`
- Adds clean starter frontmatter
- Prints the preview route for this repo, e.g.:

```text
Preview: /blog/YYYY-MM-DD-my-title
```

### Frontmatter behavior in this repo

Use this while drafting:

```yaml
draft: true
```

In this repo, draft posts are excluded in **production** builds. For publishing, set:

- `draft: false`, or
- remove the `draft` line entirely.

## 3) Write in MDX without overcomplicating it

- Prefer plain Markdown headings, lists, links, and images.
- Keep paragraphs separated by blank lines.
- Use React/JSX components only when plain Markdown cannot express what you need.

Templates you can copy from:

- `_templates/research-note.mdx`
- `_templates/reading-note.mdx`
- `_templates/longform-post.mdx`

`_templates/post-template.mdx` still exists, but the templates above are the recommended defaults.

## 4) Add images quickly

Run:

```bash
yarn add-image ./chart.png topic-folder "Alt text"
```

What it does:

- Copies the file into `public/static/images/<folder>/...`
- Keeps the original filename when possible
- Avoids overwrites by appending `-1`, `-2`, etc. if needed
- Prints the exact Markdown line to paste into your post

Example output to paste:

```md
![Alt text](/static/images/topic-folder/chart.png)
```

Use this normal Markdown syntax rather than hand-writing JSX image components.

## 5) Preview checklist before publish

- Post page loads at `/blog/...`.
- No frontmatter errors.
- Images render.
- Links work.
- Formatting looks right on mobile + desktop widths.

## 6) Publish flow

1. Set `draft: false` (or remove `draft`).
2. Commit your `.mdx` and any images under `public/static/images/...`.
3. Push to your remote/deploy branch.

---

## Troubleshooting

### Text wrapping feels off

- Toggle word wrap in VS Code:
  - `Alt+Z` (Windows/Linux)
  - `Option+Z` (macOS)

### MDX syntax highlighting looks wrong

- Install/re-enable the recommended extension: `unifiedjs.vscode-mdx`.
- Also keep `esbenp.prettier-vscode` enabled for consistent prose wrapping.

### Dev server crashes while editing

Copy the error from terminal and check for:

- broken frontmatter (missing `---` or invalid YAML)
- unclosed JSX tags
- malformed MDX
- invalid image paths

If unsure, comment out the most recent block and reintroduce changes incrementally.

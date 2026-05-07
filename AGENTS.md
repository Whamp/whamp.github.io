# AGENTS.md

Guidance for coding agents working in this repository.

## Goal

When a user asks to write a new blog post, follow this workflow by default.

## New post workflow

1. Ensure dependencies are installed and local preview can run (`yarn dev`).
2. Create a post scaffold with:

```bash
yarn new-post "Post Title"
```

3. Edit the generated file in `data/blog/`.
4. Keep `draft: true` while drafting.
5. Preview at the printed route, which is in the form:

`/blog/YYYY-MM-DD-slug`

6. Add images with:

```bash
yarn add-image ./path/to/image.png topic-folder "Alt text"
```

7. Paste the printed Markdown image syntax into the post.
8. For publication readiness, set `draft: false` or remove the `draft` field.

## Templates

Prefer these templates for new content when appropriate:

- `_templates/longform-post.mdx`
- `_templates/reading-note.mdx`
- `_templates/research-note.mdx`

## Writer docs

Point users to `WRITING.md` for the full writer-focused workflow and troubleshooting.

## Constraints

- Do not redesign theme/framework for writing-flow requests.
- Avoid changing existing published post content unless explicitly requested.
- Keep changes small and focused.

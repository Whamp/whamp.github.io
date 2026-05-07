#!/usr/bin/env node
import { mkdirSync, writeFileSync, existsSync } from 'node:fs'
import path from 'node:path'

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const title = process.argv.slice(2).join(' ').trim()

if (!title) {
  console.error('Error: please provide a post title. Example: yarn new-post "My Post Title"')
  process.exit(1)
}

const slug = slugify(title)
if (!slug) {
  console.error('Error: title must include at least one alphanumeric character.')
  process.exit(1)
}

const now = new Date()
const yyyy = now.getFullYear()
const mm = String(now.getMonth() + 1).padStart(2, '0')
const dd = String(now.getDate()).padStart(2, '0')
const date = `${yyyy}-${mm}-${dd}`

const relativeFilePath = path.posix.join('data/blog', `${date}-${slug}.mdx`)
const filePath = path.resolve(relativeFilePath)

if (existsSync(filePath)) {
  console.error(`Error: ${relativeFilePath} already exists. Aborting to avoid overwrite.`)
  process.exit(1)
}

mkdirSync(path.dirname(filePath), { recursive: true })

const content = `---\ntitle: '${title.replace(/'/g, "\\'")}'\ndate: '${date}'\ntags: []\ndraft: true\nsummary: ''\n---\n\nWrite here.\n`

writeFileSync(filePath, content, 'utf8')

console.log(`Created ${relativeFilePath}`)
console.log(`Preview: /blog/${date}-${slug}`)

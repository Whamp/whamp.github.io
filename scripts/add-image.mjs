#!/usr/bin/env node
import { statSync, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import path from 'node:path'

const [sourceArg, folderArg, altTextArg] = process.argv.slice(2)

if (!sourceArg || !folderArg || !altTextArg) {
  console.error(
    'Usage: yarn add-image <source-image-path> <folder-name> "Alt text"\nExample: yarn add-image ./chart.png qwen-reasoning "Accuracy versus reasoning budget"'
  )
  process.exit(1)
}

const sourcePath = path.resolve(sourceArg)
if (!existsSync(sourcePath)) {
  console.error(`Error: source file not found: ${sourceArg}`)
  process.exit(1)
}

const sourceStat = statSync(sourcePath)
if (!sourceStat.isFile()) {
  console.error(`Error: source path is not a file: ${sourceArg}`)
  process.exit(1)
}

const allowedExts = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'])
const originalName = path.basename(sourcePath)
const ext = path.extname(originalName).toLowerCase()
if (!allowedExts.has(ext)) {
  console.error(
    `Error: unsupported extension "${ext}". Allowed: ${Array.from(allowedExts).join(', ')}`
  )
  process.exit(1)
}

const folder = folderArg
  .toLowerCase()
  .trim()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-+|-+$/g, '')
if (!folder) {
  console.error('Error: folder name must include at least one alphanumeric character.')
  process.exit(1)
}

const imagesDir = path.resolve('public/static/images', folder)
mkdirSync(imagesDir, { recursive: true })

const baseName = path.basename(originalName, ext)
let candidateName = `${baseName}${ext}`
let counter = 1
let destinationPath = path.join(imagesDir, candidateName)
while (existsSync(destinationPath)) {
  candidateName = `${baseName}-${counter}${ext}`
  destinationPath = path.join(imagesDir, candidateName)
  counter += 1
}

copyFileSync(sourcePath, destinationPath)

const relativeDestination = path.relative(process.cwd(), destinationPath)
const imageUrl = `/static/images/${folder}/${candidateName}`

console.log(`Copied to ${relativeDestination}`)
console.log(`![${altTextArg}](${imageUrl})`)

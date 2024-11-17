// lib/tutorials.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const tutorialsDirectory = path.join(process.cwd(), 'tutorials');

export async function getTutorial(slug: string) {
  const fullPath = path.join(tutorialsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...(matterResult.data as { title: string }),
  };
}

export async function getAllTutorialSlugs() {
  const fileNames = fs.readdirSync(tutorialsDirectory);
  return fileNames.map((fileName) => ({
    slug: fileName.replace(/\.md$/, ''),
  }));
}
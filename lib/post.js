// utils/mdParser.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content/posts');

export function getAllPosts() {
  const fileNames = fs.readdirSync(contentDirectory);
  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(contentDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      fileName,
      ...data,
      content,
    };
  });
  return posts;
}

export function getPostBySlug(slug) {
  const fullPath = path.join(contentDirectory, `post${slug}.md`);
  console.log(fullPath)
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    ...data,
    content,
  };
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(contentDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        slug: fileName.replace(/\.md$/, ''),
      },
    };
  });
}


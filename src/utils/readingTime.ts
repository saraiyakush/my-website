export function getReadingTime(content: string): number {
  const text = content
    .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/<[^>]*>/g, ''); // Remove HTML tags

  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 200);
}

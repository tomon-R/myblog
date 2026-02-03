export type PostId = string;

export class Post {
  id: PostId;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  content: string;

  constructor({
    id,
    title,
    date,
    description,
    tags,
    author,
    readTime,
    content,
  }: {
    id: PostId;
    title: string;
    date: string;
    description: string;
    tags?: string[];
    author?: string;
    readTime?: string;
    content: string;
  }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.description = description;
    this.tags = tags;
    this.author = author;
    this.readTime = readTime;
    this.content = content;
  }
}

export function createPost({
  title,
  date,
  description,
  tags,
  author,
  readTime,
  content,
}: {
  title: string;
  date: string;
  description: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  content: string;
}): Post {
  const id = crypto.randomUUID();
  return new Post({
    id,
    title,
    date,
    description,
    tags,
    author,
    readTime,
    content,
  });
}

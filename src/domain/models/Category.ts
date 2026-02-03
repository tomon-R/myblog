import { PostId } from "./Post";

export type CategoryId = string;

export class Category {
  id: CategoryId;
  name: string;
  description: string;
  content: string;
  featuredPosts?: PostId[];
  parent?: CategoryId;
  children?: CategoryId[];
  posts?: PostId[];

  constructor({
    id,
    name,
    description,
    content,
    featuredPosts,
    parent,
    children,
    posts,
  }: {
    id: CategoryId;
    name: string;
    description: string;
    content: string;
    featuredPosts?: PostId[];
    parent?: CategoryId;
    children?: CategoryId[];
    posts?: PostId[];
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.content = content;
    this.featuredPosts = featuredPosts;
    this.parent = parent;
    this.children = children;
    this.posts = posts;
  }
}

export function createCategory({
  name,
  description,
  content,
  featuredPosts,
  parent,
  children,
  posts,
}: {
  name: string;
  description: string;
  content: string;
  featuredPosts?: PostId[];
  parent?: CategoryId;
  children?: CategoryId[];
  posts?: PostId[];
}): Category {
  const id = crypto.randomUUID();
  return new Category({
    id,
    name,
    description,
    featuredPosts,
    content,
    parent,
    children,
    posts,
  });
}

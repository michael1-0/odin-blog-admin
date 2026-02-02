interface Post {
  id: number;
  userId: number;
  title: string;
  content: string;
  published: boolean;
}

interface Comment {
  id: number;
  username?: string;
  content: string;
}

export type { Post, Comment };

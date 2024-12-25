
export interface PostInterface {
    id: string;
    createdAt: string;
    title: string;
    slug: string;
    img: string;
    desc: string;
    views: number;
    catSlug: string;
    userEmail: string;
}

export interface CategoryInterface {
    id: string;
    title: string;
    slug: string;
    img: string;
}

export interface CommentInterface {
    id: string;
    desc: string;
    createdAt: string;
    user: {
      name: string;
      image: string;
    };
  }
  
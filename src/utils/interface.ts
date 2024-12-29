
export interface PostInterface {
  id: string;
  createdAt: string;
  title: string;
  slug: string;
  img: string;
  desc: string;
  views: number;
  catSlug: string;
  cat: CategoryInterface;
  userEmail: string;
  user?: UserInterface;

}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface CategoryInterface {
  id: string;
  title: string;
  slug: string;
  img: string;
  color: string;
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

import axios from 'axios';
import { create } from 'zustand';



// Define the type for Category
interface Post {
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

interface GetPost {
    page:number; 
    limit: number;
    category: string
}

interface PostState {
    posts: Post[];
    count: number
    getPost: (params: GetPost) => Promise<void>;
    isLoadingPost: boolean;
}


export const usePostStore = create<PostState>((set) => ({
    posts: [],
    count: 0,
    isLoadingPost: false,
    getPost: async ({page, limit, category}: GetPost) => {

        try {
            set({ isLoadingPost: true });
            const res = await axios.get(`/api/posts?page=${page}&limit=${limit}&category=${category}`);
            set({ posts: res.data.posts,
                    count: res.data.count
             });
        } catch (error) {
            set({ posts: [] });
            console.log('error', error);
        } finally {
            set({ isLoadingPost: false });
        }
    }
}));
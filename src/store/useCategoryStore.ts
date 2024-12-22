import axios from 'axios';
import { create } from 'zustand';



// Define the type for Category
interface Category {
    id: string;
    title: string;
    slug: string;
    img: string;
}

interface CategoryState {
    categories: Category[];
    getCategory: () => Promise<void>;
    isLoadingCategory: boolean;
}

export const useCategoryStore = create<CategoryState>((set) => ({
    categories: [],
    isLoadingCategory: false,
    getCategory: async () => {

        try {
            set({ isLoadingCategory: true });
            const res = await axios.get("/api/categories");
            // const res = await axios.get("/api/categories", {
            //     headers: {
            //         'Cache-Control': 'no-store',
            //     }
            // });
            set({ categories: res.data });
        } catch (error) {
            set({ categories: [] });
            console.log('error', error);
        } finally {
            set({ isLoadingCategory: false });
        }
    }
}));
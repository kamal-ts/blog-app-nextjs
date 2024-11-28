import {create} from 'zustand';


export const themeContext = create((set) => ({
    theme: false,
    themeClick: () => {
        set(state => ({theme: !state.theme}))
    }
}))
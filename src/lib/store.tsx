import { useContext } from "react";
import { useStore } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createStore } from "zustand/vanilla";
import { createZustandContext } from "./zustand-context";

type State = {
    tags: string[];
    setTags: (tags: string[]) => void;
    activeTag: string;
    setActiveTag: (tag: string) => void;
    activeColor: string;
    setActiveColor: (color: string) => void;
    generating: boolean;
    setGenerating: (generating: boolean) => void;
    uploading: boolean;
    setUploading: (uploading: boolean) => void;
};

const getStore = (initialState: {
    activeTag: string;
    activeColor: string;
    activeImage: string;
}) => {
    return createStore<State>()(
        persist(
            (set) => ({
                tags: [],
                activeTag: initialState.activeTag,
                setTags: (tags) => set({ tags }),
                setActiveTag: (tag) => set({ activeTag: tag }),
                activeColor: initialState.activeColor,
                setActiveColor: (color) => set({ activeColor: color }),
                generating: false,
                setGenerating: (generating) => set({ generating }),
                uploading: false,
                setUploading: (uploading) => set({ uploading }),
            }),
            {
                name: "image-storage",
                storage: createJSONStorage(() => localStorage),
            },
        ),
    );
};

export const ImageStore = createZustandContext(getStore);

export function useImageStore<T>(selector: (state: State) => T) {
    const store = useContext(ImageStore.Context);
    if (!store) {
        throw new Error("Missing image store provider");
    }

    return useStore(store, selector);
}

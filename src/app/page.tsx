"use client";

import { Editor } from "@/components/editor";
import { ImageStore } from "@/lib/image-store";

export default function Home() {
    return (
        <main>
            <ImageStore.Provider initialValue={{ generating: false }}>
                <Editor />
            </ImageStore.Provider>
        </main>
    );
}

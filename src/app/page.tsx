"use client";

import Editor from "@/components/editor";
import { ImageStore } from "@/lib/image-store";
import { LayerStore } from "@/lib/layer-store";

export default function Home() {
    return (
        <LayerStore.Provider
            initialValue={{
                layerComparisonMode: false,
                layers: [
                    {
                        id: crypto.randomUUID(),
                        url: "",
                        height: 0,
                        width: 0,
                        publicId: "",
                    },
                ],
            }}
        >
            <ImageStore.Provider
                initialValue={{
                    activeTag: "all",
                    activeColor: "green",
                    activeImage: "",
                }}
            >
                <Editor />
            </ImageStore.Provider>
        </LayerStore.Provider>
    );
}

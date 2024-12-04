"use client";

import { useLayerStore } from "@/lib/layer-store";
import { useImageStore } from "@/lib/store";
import Lottie from "lottie-react";
import loadingAnimation from "public/animations/loading.json";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";

export default function Loading() {
    const generating = useImageStore((state) => state.generating);
    const setGenerating = useImageStore((state) => state.setGenerating);
    const uploading = useImageStore((state) => state.uploading);
    const setUploading = useImageStore((state) => state.setUploading);
    const activeLayer = useLayerStore((state) => state.activeLayer);

    return (
        <Dialog
            open={generating || uploading}
            onOpenChange={setGenerating || setUploading}
        >
            <DialogContent className="flex flex-col items-center sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>
                        {uploading ? "" : "Editing"} {activeLayer.name}
                    </DialogTitle>
                    <DialogDescription>
                        Please note that this operation might take up to a
                        couple of seconds.
                    </DialogDescription>
                </DialogHeader>
                <Lottie className="w-36" animationData={loadingAnimation} />
            </DialogContent>
        </Dialog>
    );
}

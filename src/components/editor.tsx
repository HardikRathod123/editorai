"use client";
import { useLayerStore } from "@/lib/layer-store";
import ActiveImage from "./active-image";
import Layers from "./layers/layers";
import Loading from "./loading";
import { ModeToggle } from "./theme-toggle";
import ImageTools from "./toolbar/image-tools";
import ExportAsset from "./toolbar/image/export-image";
import VideoTools from "./toolbar/video-tools";
import UploadForm from "./upload/upload-form";

export default function Editor() {
    const activeLayer = useLayerStore((state) => state.activeLayer);

    return (
        <div className="flex h-full">
            <div className="min-w-48 px-4 py-6">
                <div className="pb-12 text-center">
                    <ModeToggle />
                </div>
                <div className="flex flex-col gap-4">
                    {activeLayer.resourceType === "video" ? (
                        <VideoTools />
                    ) : null}
                    {activeLayer.resourceType === "image" ? (
                        <ImageTools />
                    ) : null}
                    {activeLayer.resourceType && (
                        <ExportAsset resource={activeLayer.resourceType} />
                    )}
                </div>
            </div>
            <Loading />
            <ActiveImage />
            <UploadForm />
            <Layers />
        </div>
    );
}

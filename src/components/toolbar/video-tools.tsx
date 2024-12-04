"use client";
import { useLayerStore } from "@/lib/layer-store";
import SmartCrop from "./video/smart-crop";
import VideoTranscription from "./video/transcribe";

export default function VideoTools() {
    const activeLayer = useLayerStore((state) => state.activeLayer);
    if (activeLayer.resourceType === "video")
        return (
            <>
                <VideoTranscription />
                <SmartCrop />
            </>
        );
}

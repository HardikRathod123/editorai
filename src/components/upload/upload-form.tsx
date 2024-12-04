"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLayerStore } from "@/lib/layer-store";
import { cn } from "@/lib/utils";
import { ImageIcon, VideoIcon } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { Label } from "../ui/label";
import UploadImage from "./upload-image";
import UploadVideo from "./upload-video";

export default function UploadForm() {
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const [selectedType, setSelectedType] = useState("image");
    const layerComparisonMode = useLayerStore(
        (state) => state.layerComparisonMode,
    );
    if (!activeLayer.url && !layerComparisonMode)
        return (
            <div className="flex h-full w-full flex-col justify-center p-24">
                {selectedType === "image" ? <UploadImage /> : null}
                {selectedType === "video" ? <UploadVideo /> : null}
                <RadioGroup
                    defaultValue="image"
                    onValueChange={(e) => {
                        setSelectedType(e);
                    }}
                    className="flex items-center justify-center gap-8 py-8"
                >
                    <Card
                        onClick={(e) => setSelectedType("image")}
                        className={cn(
                            "flex cursor-pointer flex-col items-center justify-center gap-4 px-6 py-4",
                            selectedType === "image" ? "border-primary" : null,
                        )}
                    >
                        <CardContent className="flex items-center space-x-2 p-0">
                            <RadioGroupItem
                                value="image"
                                id="image-mode"
                                hidden
                            />
                            <Label
                                className={`${
                                    selectedType === "image"
                                        ? "text-primary"
                                        : null
                                }`}
                                htmlFor="image-mode"
                            >
                                Image Mode
                            </Label>
                        </CardContent>
                        <ImageIcon
                            className={`${selectedType === "image" ? "text-primary" : null}`}
                            size={36}
                        />
                    </Card>
                    <Card
                        onClick={(e) => setSelectedType("video")}
                        className={cn(
                            "flex cursor-pointer flex-col items-center justify-center gap-4 p-4",
                            selectedType === "video" ? "border-primary" : null,
                        )}
                    >
                        <CardContent className="flex items-center space-x-2 p-0">
                            <RadioGroupItem
                                value="video"
                                id="video-mode"
                                hidden
                            />
                            <Label
                                className={`${
                                    selectedType === "video"
                                        ? "text-primary"
                                        : null
                                }`}
                                htmlFor="video-mode"
                            >
                                Video Mode
                            </Label>
                        </CardContent>
                        <VideoIcon
                            className={`${selectedType === "video" ? "text-primary" : null}`}
                            size={36}
                        />
                    </Card>
                </RadioGroup>
            </div>
        );
}

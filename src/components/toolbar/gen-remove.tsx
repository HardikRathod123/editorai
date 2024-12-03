"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { cn } from "@/lib/utils";
import { genRemove } from "@/server/gen-remove";
import { Eraser } from "lucide-react";

export default function GenRemove() {
    const tags = useImageStore((state) => state.tags);
    const setActiveTag = useImageStore((state) => state.setActiveTag);
    const generating = useImageStore((state) => state.generating);
    const activeTag = useImageStore((state) => state.activeTag);
    const activeColor = useImageStore((state) => state.activeColor);
    const setGenerating = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    return (
        <Popover>
            <PopoverTrigger disabled={!activeLayer?.url} asChild>
                <Button variant="outline" className="p-8">
                    <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
                        Content Aware <Eraser size={20} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                            Smart AI Remove
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Generative Remove any part of the image
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="text-xs">Suggested selections</h3>
                        <div className="flex gap-2">
                            {tags.length === 0 && (
                                <p className="text-xs text-muted-foreground">
                                    No tags available
                                </p>
                            )}
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    onClick={() => setActiveTag(tag)}
                                    className={cn(
                                        "rounded px-2 py-1 text-xs",
                                        activeTag === tag &&
                                            "bg-primary text-white",
                                    )}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="width">Selection</Label>
                            <Input
                                className="col-span-2 h-8"
                                value={activeTag}
                                name="tag"
                                onChange={(e) => {
                                    setActiveTag(e.target.value);
                                }}
                            />
                        </div>
                    </div>
                </div>
                <Button
                    className="mt-4 w-full"
                    disabled={
                        !activeTag ||
                        !activeColor ||
                        !activeLayer.url ||
                        generating
                    }
                    onClick={async () => {
                        setGenerating(true);
                        const res = await genRemove({
                            activeImage: activeLayer.url!,
                            prompt: activeTag,
                        });
                        if (res?.data?.success) {
                            setGenerating(false);
                            const newLayerId = crypto.randomUUID();
                            addLayer({
                                id: newLayerId,
                                url: res.data.success,
                                format: activeLayer.format,
                                height: activeLayer.height,
                                width: activeLayer.width,
                                name: activeLayer.name,
                                publicId: activeLayer.publicId,
                                resourceType: "image",
                            });
                            setActiveLayer(newLayerId);
                        }
                    }}
                >
                    Magic Remove 🎨
                </Button>
            </PopoverContent>
        </Popover>
    );
}
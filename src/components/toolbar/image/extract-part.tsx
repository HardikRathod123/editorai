"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLayerStore } from "@/lib/layer-store";
import { useImageStore } from "@/lib/store";
import { extractImage } from "@/server/extract-part";
import { Scissors } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ExtractPart() {
    const setGenerating = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const generating = useImageStore((state) => state.generating);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const [prompts, setPrompts] = useState([""]);
    const [multiple, setMultiple] = useState(false);
    const [mode, setMode] = useState("default");
    const [invert, setInvert] = useState(false);

    const addPrompt = () => {
        setPrompts([...prompts, ""]);
    };

    const updatePrompt = (index: number, value: string) => {
        const newPrompts = [...prompts];
        newPrompts[index] = value;
        setPrompts(newPrompts);
    };

    return (
        <Popover>
            <PopoverTrigger disabled={!activeLayer?.url} asChild>
                <Button variant="outline" className="py-8">
                    <span className="flex flex-col items-center justify-center gap-1 text-xs font-medium">
                        AI Extract
                        <Scissors size={18} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">AI Extract</h4>
                        <p className="text-sm text-muted-foreground">
                            Extract specific areas or objects from your image
                            using AI.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        {prompts.map((prompt, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-3 items-center gap-4"
                            >
                                <Label htmlFor={`prompt-${index}`}>
                                    Prompt {index + 1}
                                </Label>
                                <Input
                                    id={`prompt-${index}`}
                                    value={prompt}
                                    onChange={(e) =>
                                        updatePrompt(index, e.target.value)
                                    }
                                    placeholder="Describe what to extract"
                                    className="col-span-2 h-8"
                                />
                            </div>
                        ))}
                        <Button onClick={addPrompt} size="sm">
                            Add Prompt
                        </Button>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="multiple"
                                checked={multiple}
                                onCheckedChange={(checked) =>
                                    setMultiple(checked as boolean)
                                }
                            />
                            <Label htmlFor="multiple">
                                Extract multiple objects
                            </Label>
                        </div>

                        <RadioGroup value={mode} onValueChange={setMode}>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem
                                    value="default"
                                    id="mode-default"
                                />
                                <Label htmlFor="mode-default">
                                    Default (transparent background)
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="mask" id="mode-mask" />
                                <Label htmlFor="mode-mask">Mask</Label>
                            </div>
                        </RadioGroup>

                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="invert"
                                checked={invert}
                                onCheckedChange={(checked) =>
                                    setInvert(checked as boolean)
                                }
                            />
                            <Label htmlFor="invert">
                                Invert (keep background)
                            </Label>
                        </div>
                    </div>
                </div>
                <Button
                    disabled={
                        !activeLayer?.url ||
                        generating ||
                        prompts.every((p) => p.trim() === "")
                    }
                    className="mt-4 w-full"
                    onClick={async () => {
                        setGenerating(true);
                        const res = await extractImage({
                            prompts: prompts.filter((p) => p.trim() !== ""),
                            activeImage: activeLayer.url!,
                            format: activeLayer.format!,
                            multiple,
                            mode: mode as "default" | "mask",
                            invert,
                        });

                        if (res?.data?.success) {
                            const newLayerId = crypto.randomUUID();
                            addLayer({
                                id: newLayerId,
                                name: "extracted-" + activeLayer.name,
                                format: ".png",
                                height: activeLayer.height,
                                width: activeLayer.width,
                                url: res.data.success,
                                publicId: activeLayer.publicId,
                                resourceType: "image",
                            });
                            setGenerating(false);
                            setActiveLayer(newLayerId);
                        }
                        if (res?.serverError) {
                            toast.error(res.serverError);
                            setGenerating(false);
                        }
                    }}
                >
                    {generating ? "Extracting..." : "Extract"}
                </Button>
            </PopoverContent>
        </Popover>
    );
}

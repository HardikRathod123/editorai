import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useLayerStore } from "@/lib/layer-store";
import { useImageStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { genCrop } from "@/server/smart-crop";
import { Crop, Square } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Tiktok from "../../icons/tiktok";
import Youtube from "../../icons/youtube";

export default function SmartCrop() {
    const setGenerating = useImageStore((state) => state.setGenerating);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const layers = useLayerStore((state) => state.layers);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);
    const generating = useImageStore((state) => state.generating);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    const [aspectRatio, setAspectRatio] = useState("16:9");

    const handleGenCrop = async () => {
        setGenerating(true);
        const res = await genCrop({
            height: activeLayer.height!.toString(),
            aspect: aspectRatio,
            activeVideo: activeLayer.url!,
        });

        if (res?.data?.success) {
            console.log(res.data.success);
            setGenerating(false);
            const newLayerId = crypto.randomUUID();
            const thumbnailUrl = res.data.success.replace(/\.[^/.]+$/, ".jpg");
            addLayer({
                id: newLayerId,
                name: "cropped " + activeLayer.name,
                format: activeLayer.format,
                height: height + activeLayer.height!,
                width: width + activeLayer.width!,
                url: res.data.success,
                publicId: activeLayer.publicId,
                resourceType: "video",
                poster: thumbnailUrl,
            });
            toast.success(res.data.success);
            setActiveLayer(newLayerId);
        }
        if (res?.serverError) {
            toast.error(res.serverError);
            setGenerating(false);
        }
    };

    return (
        <Popover>
            <PopoverTrigger disabled={!activeLayer?.url} asChild>
                <Button variant="outline" className="py-8">
                    <span className="flex flex-col items-center gap-1 text-xs font-medium">
                        Smart Crop
                        <Crop size={18} />
                    </span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full">
                <div className="flex h-full flex-col">
                    <div className="space-y-2 pb-4">
                        <h3 className="py-2 text-center font-medium leading-none">
                            Smart Recrop
                        </h3>
                    </div>
                    <h4 className="text-md pb-2 font-medium">Format</h4>
                    <div
                        className={
                            "flex items-center justify-center gap-4 pb-2"
                        }
                    >
                        <Card
                            className={cn(
                                aspectRatio === "16:9" ? "border-primary" : "",
                                "w-36 cursor-pointer p-4",
                            )}
                            onClick={() => setAspectRatio("16:9")}
                        >
                            <CardHeader className="p-0 text-center">
                                <CardTitle className="text-md">
                                    Youtube
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-sm font-bold">16:9</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center p-0 pt-2">
                                <Youtube />
                            </CardContent>
                        </Card>
                        <Card
                            className={cn(
                                aspectRatio === "9:16" ? "border-primary" : "",
                                "w-36 cursor-pointer p-4",
                            )}
                            onClick={() => setAspectRatio("9:16")}
                        >
                            <CardHeader className="p-0 text-center">
                                <CardTitle className="text-md">
                                    Tiktok
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-sm font-bold">9:16</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center p-0 pt-2">
                                <Tiktok />
                            </CardContent>
                        </Card>
                        <Card
                            className={cn(
                                aspectRatio === "1:1" ? "border-primary" : "",
                                "w-36 cursor-pointer p-4",
                            )}
                            onClick={() => setAspectRatio("1:1")}
                        >
                            <CardHeader className="p-0 text-center">
                                <CardTitle className="text-md">
                                    Square
                                </CardTitle>
                                <CardDescription>
                                    <p className="text-sm font-bold">1:1</p>
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-center justify-center p-0 pt-2">
                                <Square className="h-10 w-10" />
                            </CardContent>
                        </Card>
                    </div>

                    <Button
                        onClick={handleGenCrop}
                        className="mt-4 w-full"
                        variant={"outline"}
                        disabled={!activeLayer.url || generating}
                    >
                        {generating ? "Cropping..." : "Smart Crop 🎨"}
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

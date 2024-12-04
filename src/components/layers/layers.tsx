import { useLayerStore } from "@/lib/layer-store";
import { useImageStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Images, Layers2 } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";
import { Button } from "../ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import LayerImage from "./layer-image";
import LayerInfo from "./layer-info";

export default function Layers() {
    const layers = useLayerStore((state) => state.layers);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    const addLayer = useLayerStore((state) => state.addLayer);
    const generating = useImageStore((state) => state.generating);
    const layerComparisonMode = useLayerStore(
        (state) => state.layerComparisonMode,
    );
    const setLayerComparisonMode = useLayerStore(
        (state) => state.setLayerComparisonMode,
    );
    const comparedLayers = useLayerStore((state) => state.comparedLayers);
    const toggleComparedLayer = useLayerStore(
        (state) => state.toggleComparedLayer,
    );
    const setComparedLayers = useLayerStore((state) => state.setComparedLayers);

    const MCard = useMemo(() => motion(Card), []);
    const MButton = useMemo(() => motion(Button), []);

    const getLayerName = useMemo(
        () => (id: string) => {
            const layer = layers.find((l) => l.id === id);
            return layer ? layer.url : "Nothing here";
        },
        [layers],
    );

    const visibleLayers = useMemo(
        () =>
            layerComparisonMode
                ? layers.filter(
                      (layer) => layer.url && layer.resourceType === "image",
                  )
                : layers,
        [layerComparisonMode, layers],
    );

    return (
        <MCard
            layout
            className="scrollbar-thin scrollbar-track-secondary scrollbar-thumb-primary scrollbar-thumb-rounded-full scrollbar-track-rounded-full relative flex shrink-0 basis-[320px] flex-col overflow-x-hidden overflow-y-scroll shadow-2xl"
        >
            <CardHeader className="sticky top-0 z-50 min-h-28 bg-card px-4 py-6 shadow-sm">
                {layerComparisonMode ? (
                    <div>
                        <CardTitle className="pb-2 text-sm">
                            Comparing...
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2">
                            <Image
                                alt="compare"
                                width={32}
                                height={32}
                                src={getLayerName(comparedLayers[0]) as string}
                            />
                            {comparedLayers.length > 0 && <ArrowRight />}
                            {comparedLayers.length > 1 ? (
                                <Image
                                    alt="compare"
                                    width={32}
                                    height={32}
                                    src={
                                        getLayerName(
                                            comparedLayers[1],
                                        ) as string
                                    }
                                />
                            ) : (
                                "Nothing here"
                            )}
                        </CardDescription>
                    </div>
                ) : (
                    <div className="flex flex-col gap-1">
                        <CardTitle className="text-sm">
                            {activeLayer.name || "Layers"}
                        </CardTitle>
                        {activeLayer.width && activeLayer.height ? (
                            <CardDescription className="text-xs">
                                {activeLayer.width}X{activeLayer.height}
                            </CardDescription>
                        ) : null}
                    </div>
                )}
            </CardHeader>
            <motion.div className="flex flex-1 flex-col">
                <AnimatePresence>
                    {visibleLayers.map((layer, index) => {
                        return (
                            <motion.div
                                animate={{ scale: 1, opacity: 1 }}
                                initial={{ scale: 0, opacity: 0 }}
                                exit={{ scale: 0, opacity: 0 }}
                                layout
                                className={cn(
                                    "cursor-pointer border border-transparent ease-in-out hover:bg-secondary",
                                    {
                                        "border-primary": layerComparisonMode
                                            ? comparedLayers.includes(layer.id)
                                            : activeLayer.id === layer.id,
                                        "animate-pulse": generating,
                                    },
                                )}
                                key={layer.id}
                                onClick={() => {
                                    if (generating) return;
                                    if (layerComparisonMode) {
                                        toggleComparedLayer(layer.id);
                                    } else {
                                        setActiveLayer(layer.id);
                                    }
                                }}
                            >
                                <div className="relative flex items-center p-4">
                                    <div className="flex h-8 w-full items-center justify-between gap-2">
                                        {!layer.url ? (
                                            <p className="justify-self-end text-xs font-medium">
                                                New layer
                                            </p>
                                        ) : null}
                                        <LayerImage layer={layer} />
                                        {layers.length !== 1 && (
                                            <LayerInfo
                                                layer={layer}
                                                layerIndex={index}
                                            />
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </motion.div>
            <CardContent className="sticky bottom-0 flex shrink-0 gap-2 bg-card">
                <MButton
                    layout
                    onClick={() => {
                        addLayer({
                            id: crypto.randomUUID(),
                            url: "",
                            height: 0,
                            width: 0,
                            publicId: "",
                            name: "",
                            format: "",
                        });
                    }}
                    variant="outline"
                    className="flex w-full gap-2"
                >
                    <span className="text-xs">Create Layer</span>
                    <Layers2 className="text-secondary-foreground" size={18} />
                </MButton>
                <MButton
                    disabled={
                        !activeLayer.url || activeLayer.resourceType === "video"
                    }
                    layout
                    onClick={() => {
                        if (layerComparisonMode) {
                            setLayerComparisonMode(!layerComparisonMode);
                        } else {
                            setComparedLayers([activeLayer.id]);
                        }
                    }}
                    variant={layerComparisonMode ? "destructive" : "outline"}
                    className="flex w-full gap-2"
                >
                    <motion.span className={cn("text-xs font-bold")}>
                        {layerComparisonMode ? "Stop Comparing" : "Compare"}
                    </motion.span>
                    {!layerComparisonMode && (
                        <Images
                            className="text-secondary-foreground"
                            size={18}
                        />
                    )}
                </MButton>
            </CardContent>
        </MCard>
    );
}

"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Layer, useLayerStore } from "@/lib/layer-store";
import { Ellipsis, Trash } from "lucide-react";
import { Button } from "../ui/button";

export default function LayerInfo({
    layer,
    layerIndex,
}: {
    layer: Layer;
    layerIndex: number;
}) {
    const layers = useLayerStore((state) => state.layers);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);
    const removeLayer = useLayerStore((state) => state.removeLayer);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" onClick={(e) => e.stopPropagation()}>
                    <Ellipsis size={18} />
                </Button>
            </DialogTrigger>
            <DialogContent className="text-xs">
                <h3 className="mb-2 text-center text-lg font-medium">
                    Layer {layer.id}
                </h3>
                <div className="space-y-0.5 py-4">
                    <p>
                        <span className="font-bold">Filename:</span>{" "}
                        {layer.name}
                    </p>
                    <p>
                        <span className="font-bold">Format:</span>{" "}
                        {layer.format}
                    </p>
                    <p>
                        <span className="font-bold"> Size:</span> {layer.width}X
                        {layer.height}
                    </p>
                </div>
                <Button
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveLayer(
                            layerIndex === 0 ? layers[1].id : layers[0].id,
                        );
                        removeLayer(layer.id);
                    }}
                    variant={"destructive"}
                    className="flex w-full items-center gap-2"
                >
                    <span> Delete Layer</span>
                    <Trash size={14} />
                </Button>
            </DialogContent>
        </Dialog>
    );
}

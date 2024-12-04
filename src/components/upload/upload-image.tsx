"use client";

import { useImageStore } from "@/lib/image-store";
import { useLayerStore } from "@/lib/layer-store";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/server/upload-image";
import Lottie from "lottie-react";
import imageAnimation from "public/animations/image-upload.json";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";

export default function UploadImage() {
    const setTags = useImageStore((state) => state.setTags);
    const setUploading = useImageStore((state) => state.setUploading);
    const activeLayer = useLayerStore((state) => state.activeLayer);
    const updateLayer = useLayerStore((state) => state.updateLayer);
    const setActiveLayer = useLayerStore((state) => state.setActiveLayer);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/webp": [".webp"],
            "image/jpeg": ["jpeg"],
        },
        onDrop: async (acceptedFiles, fileRejections) => {
            if (acceptedFiles.length) {
                const formData = new FormData();
                formData.append("image", acceptedFiles[0]);
                //Generate Object url
                const objectUrl = URL.createObjectURL(acceptedFiles[0]);
                setUploading(true);

                updateLayer({
                    id: activeLayer.id,
                    url: objectUrl,
                    width: 0,
                    height: 0,
                    name: "Uploading " + acceptedFiles[0].name,
                    publicId: "",
                    format: "",
                    resourceType: "image",
                });
                setActiveLayer(activeLayer.id);
                const res = await uploadImage({ image: formData });

                if (res?.data?.success) {
                    updateLayer({
                        id: activeLayer.id,
                        url: res.data.success.url,
                        width: res.data.success.width,
                        height: res.data.success.height,
                        name: res.data.success.original_filename,
                        publicId: res.data.success.public_id,
                        format: res.data.success.format,
                        resourceType: res.data.success.resource_type,
                    });
                    setTags(res.data.success.tags);

                    setActiveLayer(activeLayer.id);
                    console.log(activeLayer);
                    setUploading(false);
                }
                if (res?.data?.error) {
                    setUploading(false);
                }
            }

            if (fileRejections.length) {
                console.log("rejected");
            }
        },
    });

    if (!activeLayer.url)
        return (
            <Card
                {...getRootProps()}
                className={cn(
                    "transition-all ease-in-out hover:cursor-pointer hover:border-primary hover:bg-secondary",
                    `${isDragActive ? "animate-pulse border-primary bg-secondary" : ""}`,
                )}
            >
                <CardContent className="flex h-full flex-col items-center justify-center px-2 py-24 text-xs">
                    <input {...getInputProps()} />
                    <div className="flex flex-col items-center justify-center gap-4">
                        <Lottie
                            className="h-48"
                            animationData={imageAnimation}
                        />
                        <p className="text-2xl text-muted-foreground">
                            {isDragActive
                                ? "Drop your image here!"
                                : "Start by uploading an image"}
                        </p>
                        <p className="text-muted-foreground">
                            Supported Formats .jpeg .jpg .png .webp
                        </p>
                    </div>
                </CardContent>
            </Card>
        );
}

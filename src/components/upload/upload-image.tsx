"use client";
import { cn } from "@/lib/utils";
import { uploadImage } from "@/server/upload-image";
import { useDropzone } from "react-dropzone";
import { Card, CardContent } from "../ui/card";

export const UploadImage = () => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        maxFiles: 1,
        accept: {
            "image/png": [".png"],
            "image/jpg": [".jpg"],
            "image/jpeg": [".jpeg"],
            "image/webp": [".webp"],
        },
        onDrop: async (acceptedFiles) => {
            if (acceptedFiles?.[0]) {
                try {
                    const formData = new FormData();
                    formData.append("image", acceptedFiles[0]);
                    const res = await uploadImage({ image: formData });
                    console.log("Upload response:", res);
                } catch (error) {
                    console.error("Upload failed:", error);
                }
            }
        },
    });
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
                    {/* <Lottie className="h-48" animationData={imageAnimation} /> */}
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
};

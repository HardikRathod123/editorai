"use client";
import Layers from "./layers/layers";
import { UploadImage } from "./upload/upload-image";

export default function Editor() {
    return (
        <div className="flex h-full">
            <UploadImage />
            <Layers />
        </div>
    );
}

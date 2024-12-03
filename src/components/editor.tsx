"use client";
import ActiveImage from "./active-image";
import Layers from "./layers/layers";
import { ModeToggle } from "./theme-toggle";
import UploadImage from "./upload/upload-image";

export default function Editor() {
    return (
        <div className="flex h-full">
            <div className="min-w-48 px-4 py-6">
                <div className="pb-12 text-center">
                    <ModeToggle />
                </div>
            </div>
            <UploadImage />
            <ActiveImage />
            <Layers />
        </div>
    );
}

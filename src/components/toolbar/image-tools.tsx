"use client";

import BgRemove from "./bg-remove";
import AIBackgroundReplace from "./bg-replace";
import GenRemove from "./gen-remove";

export default function ImageTools() {
    return (
        <>
            <GenRemove />
            <BgRemove />
            <AIBackgroundReplace />
        </>
    );
}

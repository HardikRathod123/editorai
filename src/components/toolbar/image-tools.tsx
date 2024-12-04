"use client";

import BgRemove from "./image/bg-remove";
import AIBackgroundReplace from "./image/bg-replace";
import ExtractPart from "./image/extract-part";
import GenRemove from "./image/gen-remove";
import GenerativeFill from "./image/generative-fill";

export default function ImageTools() {
    return (
        <>
            <GenRemove />
            <BgRemove />
            <AIBackgroundReplace />
            <GenerativeFill />
            <ExtractPart />
        </>
    );
}

"use client";

import BgRemove from "./image/bg-remove";
import AIBackgroundReplace from "./image/bg-replace";
import ExtractPart from "./image/extract-part";
import GenRemove from "./image/gen-remove";
import GenerativeFill from "./image/generative-fill";
import AIRecolor from "./image/recolor";

export default function ImageTools() {
    return (
        <>
            <GenRemove />
            <BgRemove />
            <AIBackgroundReplace />
            <GenerativeFill />
            <ExtractPart />
            <AIRecolor />
        </>
    );
}

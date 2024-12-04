"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const recolorSchema = z.object({
    tag: z.string(),
    color: z.string(),
    activeImage: z.string(),
});

export const recolorImage = actionClient
    .schema(recolorSchema)
    .action(async ({ parsedInput: { tag, color, activeImage } }) => {
        const parts = activeImage.split("/upload/");
        const recolorUrl = `${parts[0]}/upload/e_gen_recolor:${tag};${color}/${parts[1]}`;

        try {
            const isProcessed = await pollingUrl(recolorUrl);
            if (!isProcessed) {
                console.error("Image processing failed");
                throw new Error("Image processing failed");
            }
            return { success: recolorUrl };
        } catch (error) {
            console.error(error);
            throw error;
        }
    });

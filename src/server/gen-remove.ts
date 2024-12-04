"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const genRemoveSchema = z.object({
    prompt: z.string(),
    activeImage: z.string(),
});

export const genRemove = actionClient
    .schema(genRemoveSchema)
    .action(async ({ parsedInput: { prompt, activeImage } }) => {
        const parts = activeImage.split("/upload/");
        //https://res.cloudinary.com/demo/image/upload/e_gen_remove:prompt_fork/docs/avocado-salad.jpg
        const removeUrl = `${parts[0]}/upload/e_gen_remove:${prompt}/${parts[1]}`;
        try {
            const isProcessed = await pollingUrl(removeUrl);
            if (!isProcessed) {
                console.error("Image processing failed");
                throw new Error("Image processing failed");
            }
            return { success: removeUrl };
        } catch (error) {
            console.error(error);
            throw error;
        }
    });

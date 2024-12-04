"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const bgReplaceSchema = z.object({
    prompt: z.string().optional(),
    activeImage: z.string(),
});

export const replaceBackground = actionClient
    .schema(bgReplaceSchema)
    .action(async ({ parsedInput: { prompt, activeImage } }) => {
        const parts = activeImage.split("/upload/");
        const bgReplaceUrl = prompt
            ? `${
                  parts[0]
              }/upload/e_gen_background_replace:prompt_${encodeURIComponent(
                  prompt,
              )}/${parts[1]}`
            : `${parts[0]}/upload/e_gen_background_replace/${parts[1]}`;

        try {
            const isProcessed = await pollingUrl(bgReplaceUrl);
            if (!isProcessed) {
                console.error("Image processing failed");
                throw new Error("Image processing failed");
            }
            return { success: bgReplaceUrl };
        } catch (error) {
            console.error(error);
            throw error;
        }
    });

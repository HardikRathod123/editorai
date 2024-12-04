"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const recolorSchema = z.object({
    activeImage: z.string(),
    format: z.string(),
});

export const bgRemoval = actionClient
    .schema(recolorSchema)
    .action(async ({ parsedInput: { activeImage, format } }) => {
        const form = activeImage.split(format);
        const pngConvert = form[0] + "png";
        const parts = pngConvert.split("/upload/");
        const removeUrl = `${parts[0]}/upload/e_background_removal/${parts[1]}`;

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

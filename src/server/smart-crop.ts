"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const genFillSchema = z.object({
    activeVideo: z.string(),
    aspect: z.string(),
    height: z.string(),
});

export const genCrop = actionClient
    .schema(genFillSchema)
    .action(async ({ parsedInput: { activeVideo, aspect, height } }) => {
        const parts = activeVideo.split("/upload/");
        //https://res.cloudinary.com/demo/image/upload/ar_16:9,b_gen_fill,c_pad,w_1500/docs/moped.jpg
        const fillUrl = `${parts[0]}/upload/ar_${aspect},c_fill,g_auto,h_${height}/${parts[1]}`;
        try {
            const isProcessed = await pollingUrl(fillUrl);
            if (!isProcessed) {
                console.error("Image processing failed");
                throw new Error("Image processing failed");
            }
            return { success: fillUrl };
        } catch (error) {
            console.error(error);
            throw error;
        }
    });

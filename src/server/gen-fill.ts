"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const genFillSchema = z.object({
    activeImage: z.string(),
    aspect: z.string(),
    width: z.string(),
    height: z.string(),
});

export const genFill = actionClient
    .schema(genFillSchema)
    .action(async ({ parsedInput: { activeImage, aspect, width, height } }) => {
        const parts = activeImage.split("/upload/");

        const fillUrl = `${parts[0]}/upload/ar_${aspect},b_gen_fill,c_pad,w_${width},h_${height}/${parts[1]}`;
        console.log(genFill);

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

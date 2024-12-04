"use server";

import { initCloudinary, pollingUrl } from "@/lib/cloudinary";
import { actionClient } from "@/server/safe-action";
import z from "zod";

initCloudinary();

const extractSchema = z.object({
    prompts: z.array(z.string()),
    activeImage: z.string(),
    multiple: z.boolean().optional(),
    mode: z.enum(["default", "mask"]).optional(),
    invert: z.boolean().optional(),
    format: z.string(),
});

export const extractImage = actionClient
    .schema(extractSchema)
    .action(
        async ({
            parsedInput: {
                prompts,
                activeImage,
                multiple,
                mode,
                invert,
                format,
            },
        }) => {
            const form = activeImage.split(format);
            const pngConvert = form[0] + "png";
            const parts = pngConvert.split("/upload/");

            let extractParams = `prompt_(${prompts
                .map((p) => encodeURIComponent(p))
                .join(";")})`;
            if (multiple) extractParams += ";multiple_true";
            if (mode === "mask") extractParams += ";mode_mask";
            if (invert) extractParams += ";invert_true";

            const extractUrl = `${parts[0]}/upload/e_extract:${extractParams}/${parts[1]}`;

            try {
                const isProcessed = await pollingUrl(extractUrl);
                if (!isProcessed) {
                    console.error("Image processing failed");
                    throw new Error("Image processing failed");
                }
                return { success: extractUrl };
            } catch (error) {
                console.error(error);
                throw error;
            }
        },
    );

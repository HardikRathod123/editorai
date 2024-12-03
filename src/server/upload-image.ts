"use server";

import { actionClient } from "@/lib/safe-action";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { z } from "zod";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const formData = z.object({
    image: z.instanceof(FormData),
});

type UploadResult =
    | { success: UploadApiResponse; error?: never }
    | { success?: never; error: string };

export const uploadImage = actionClient
    .schema(formData)
    .action(async ({ parsedInput: { image } }): Promise<UploadResult> => {
        const formImage = image.get("image");
        if (!formImage) {
            return { error: "No image was provided" };
        }
        const file = formImage as File;

        try {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);

            return new Promise<UploadResult>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        upload_preset: "editorai",
                    },
                    (error, result) => {
                        if (error || !result) {
                            reject({ error: "Failed to upload image" });
                            return;
                        } else {
                            resolve({ success: result });
                        }
                    },
                );
                uploadStream.end(buffer);
            });
        } catch (error) {
            return { error };
        }
    });

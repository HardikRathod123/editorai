import { v2 as cloudinary } from "cloudinary";

export const initCloudinary = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_KEY,
        api_secret: process.env.CLOUDINARY_SECRET,
    });
};

export async function pollingUrl(
    url: string,
    maxAttempts = 20,
    delay = 1000,
): Promise<boolean | unknown> {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            const response = await fetch(url).catch((error) => {
                console.log("Error fetching image", error);
                throw error;
            });
            if (response.ok) return true;
            await new Promise((resolve) => setTimeout(resolve, delay));
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    return false;
}

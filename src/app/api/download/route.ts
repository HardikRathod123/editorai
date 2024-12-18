import { pollingUrl } from "@/lib/cloudinary";
import cloudinary from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

cloudinary.v2.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cname: process.env.CLOUDINARY_NAME,
});

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const publicId = searchParams.get("publicId");
    const quality = searchParams.get("quality");
    const resource = searchParams.get("resource_type");
    const format = searchParams.get("format");
    const activeUrl = searchParams.get("url");

    if (!publicId) {
        return new NextResponse("Missing publicId parameter", { status: 400 });
    }

    let selected = "";
    //it does not work with png
    if (format && !format.toLowerCase().endsWith("png")) {
        switch (quality) {
            case "original":
                break;
            case "large":
                selected = "q_80";
                break;
            case "medium":
                selected = "q_50";
                break;
            case "small":
                selected = "q_30";
                break;
            default:
                return new NextResponse("Invalid quality parameter", {
                    status: 400,
                });
        }
    }

    try {
        const parts = activeUrl!.split("/upload/");
        const url = selected
            ? `${parts[0]}/upload/${selected}/${parts[1]}`
            : activeUrl!;
        const isProcessed = await pollingUrl(url);
        if (!isProcessed) {
            console.error("Image processing failed");
            throw new Error("Image processing failed");
        }
        return NextResponse.json({
            url,
            filename: `${publicId}.${quality}.${format}`,
        });
    } catch (error) {
        console.error("Error generating image URL:", error);
        return NextResponse.json(
            { serverError: "Error generating image URL" },
            { status: 500 },
        );
    }
}

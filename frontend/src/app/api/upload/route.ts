import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Cấu hình Cloudinary
cloudinary.config({
    cloud_name: process.env.NEXT_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_CLOUDINARY_API_KEY,
    api_secret: process.env.NEXT_CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Không tìm thấy file để upload" }, { status: 400 });
        }

        // Chuyển đổi File thành Buffer để push stream lên Cloudinary
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Dùng Promise wrap lại callback của upload_stream
        const uploadResult = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    folder: "temp", // Lưu ảnh tạm vào folder temp theo đúng requirement
                    resource_type: "auto",
                },
                (error, result) => {
                    if (error) {
                        console.error("Cloudinary upload error:", error);
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            // Đẩy buffer vào stream
            uploadStream.end(buffer);
        });

        // Trả về toàn bộ dữ liệu từ Cloudinary (bao gồm cả secure_url, public_id)
        return NextResponse.json(uploadResult);
    } catch (error) {
        console.error("Upload handler error:", error);
        return NextResponse.json({ error: "Lỗi server khi upload ảnh" }, { status: 500 });
    }
}

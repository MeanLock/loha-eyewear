import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    private readonly logger = new Logger(CloudinaryService.name);

    async renameImage(oldPublicId: string, newPublicId: string): Promise<string> {
        try {
            const result = await cloudinary.uploader.rename(oldPublicId, newPublicId, {
                overwrite: true,
            });
            return result.secure_url;
        } catch (error) {
            this.logger.error(`Failed to rename image from ${oldPublicId} to ${newPublicId}: ${error.message}`);
            throw error;
        }
    }

    extractPublicId(url: string): string | null {
        // Example URL: https://res.cloudinary.com/dqxdl0nbs/image/upload/v1774186205/temp/ihqwx8flps2ehthpkatb.webp
        // We want to extract: temp/ihqwx8flps2ehthpkatb
        try {
            const parts = url.split('/upload/');
            if (parts.length !== 2) return null;

            const pathWithVersion = parts[1];
            // remove 'v123456/' if present 
            const pathWithoutVersion = pathWithVersion.replace(/^v\d+\//, '');

            // Remove extension (.webp, .jpg, etc)
            const publicId = pathWithoutVersion.replace(/\.[^/.]+$/, "");

            return publicId;
        } catch (e) {
            return null;
        }
    }
}

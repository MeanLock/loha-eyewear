import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.';
        let error = 'Internal Server Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse() as any;

            // Xử lý ValidationPipe errors class-validator (trả về mảng messages)
            if (typeof res === 'object' && res.message) {
                message = Array.isArray(res.message) ? res.message.join(', ') : res.message;
                error = res.error || 'Bad Request';
            } else if (typeof res === 'string') {
                message = res;
            }
        } else if (exception instanceof Error) {
            message = exception.message;
        }

        response.status(status).json({
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
        });
    }
}

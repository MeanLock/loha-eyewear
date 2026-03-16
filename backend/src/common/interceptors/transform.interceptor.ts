import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';

@Injectable()
export class TransformInterceptor<T>
    implements NestInterceptor<T, ApiResponse<T>> {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<ApiResponse<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();

        return next.handle().pipe(
            map((data) => {
                // Nếu data trả về có chứa { data, meta } tức là đã định dạng phân trang
                if (data && typeof data === 'object' && 'data' in data && 'meta' in data) {
                    return {
                        statusCode: response.statusCode,
                        message: data.message || 'Thành công',
                        data: data.data,
                        meta: data.meta,
                    };
                }

                return {
                    statusCode: response.statusCode,
                    message: data?.message || 'Thành công',
                    data: data?.message ? data.data : data, // Bọc data thuần vào envelope
                };
            }),
        );
    }
}

import { Type, applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export interface EnvelopeOptions {
    type: Type<unknown>;
    isArray?: boolean;
    isPaginated?: boolean;
    description?: string;
}

export const ApiEnvelopeResponse = (options: EnvelopeOptions) => {
    const properties: Record<string, any> = {
        statusCode: { type: 'number', example: 200 },
        message: { type: 'string', example: 'Thành công' },
    };

    const dataSchema = options.isArray
        ? { type: 'array', items: { $ref: getSchemaPath(options.type) } }
        : { $ref: getSchemaPath(options.type) };

    properties['data'] = dataSchema;

    if (options.isPaginated) {
        properties['meta'] = {
            type: 'object',
            properties: {
                totalItems: { type: 'number', example: 100 },
                itemCount: { type: 'number', example: 20 },
                itemsPerPage: { type: 'number', example: 20 },
                totalPages: { type: 'number', example: 5 },
                currentPage: { type: 'number', example: 1 },
            },
        };
    }

    return applyDecorators(
        ApiExtraModels(options.type),
        ApiOkResponse({
            description: options.description || 'Request successful',
            schema: {
                type: 'object',
                properties,
            },
        }),
    );
};

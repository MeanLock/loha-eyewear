import { ApiProperty } from '@nestjs/swagger';
import { AccountRole } from '../../../database/enums/account-role.enum';

export class UserInfoDto {
    @ApiProperty({ format: 'uuid' })
    id: string;

    @ApiProperty({ example: 'admin@loha.com' })
    email: string;

    @ApiProperty({ example: 'System Admin' })
    full_name: string;

    @ApiProperty({ enum: AccountRole, example: 'admin' })
    role: string;
}

export class LoginDataDto {
    @ApiProperty({ description: 'JWT Token dùng cho Bearer Auth' })
    access_token: string;

    @ApiProperty()
    user: UserInfoDto;
}

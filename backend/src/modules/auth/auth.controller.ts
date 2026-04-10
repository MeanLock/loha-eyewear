import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginDataDto } from './dto/login-response.dto';
import { ApiEnvelopeResponse } from '../../common/decorators/swagger.decorator';
import { SearchCustomerDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Đăng nhập để nhận token' })
    @ApiEnvelopeResponse({ type: LoginDataDto })
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('customer/search') // Thay Get bằng Post
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Tìm kiếm khách hàng' })
    async findCustomer(@Body() dto: SearchCustomerDto) {
        return this.authService.findCustomer(dto);
    }
}

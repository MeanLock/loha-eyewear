import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Account } from '../../database/entities';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { AccountRole } from 'src/database/enums';
import { CreateCustomerDto, SearchCustomerDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Account)
        private readonly accountRepository: Repository<Account>,
        private readonly jwtService: JwtService,
    ) { }

    async login(loginDto: LoginDto) {
        const user = await this.accountRepository.findOne({
            where: { email: loginDto.email },
        });

        if (!user) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password_hash);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
        }

        if (!user.is_verified) {
            // Trong hệ thống thật có thể throw exception khác cho việc xác thực
            // Tạm thời cho phép pass hết vì yêu cầu log in tay
        }

        const payload: JwtPayload = {
            sub: user.id,
            email: user.email,
            role: user.role,
        };

        // Update last login
        user.last_login_at = new Date();
        await this.accountRepository.save(user);

        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                full_name: user.full_name,
                role: user.role,
            },
        };
    }

    async findCustomer(dto: SearchCustomerDto) {
        const { phone, name, birthYear } = dto;

        // Nếu không có bất kỳ thông tin nào thì nghỉ khỏe, đỡ tốn tài nguyên DB
        if (!phone && !name && !birthYear) return null;

        const where: any = {};

        if (phone) {
            // Ưu tiên tuyệt đối: Nếu có phone thì chỉ tìm theo phone
            where.phone = phone;
        } else {
            // Case dự phòng: Nếu không có phone thì mới kết hợp Name + Year
            if (name) where.name = name;
            if (birthYear) {
                where.dob = Between(
                    new Date(Date.UTC(birthYear, 0, 1)),     // 01/01 đầu năm UTC
                    new Date(Date.UTC(birthYear, 11, 31, 23, 59, 59)) // 31/12 cuối năm UTC
                );
            }
        }

        return await this.accountRepository.findOne({ where });
    }

    // Tương lai: async register() {} 
    async customerAccountCreate(dto: CreateCustomerDto) {
        const { phone, name, birthYear, dob } = dto;

        // 1. Kiểm tra trùng số điện thoại
        const existingUser = await this.accountRepository.findOne({
            where: { phone },
        });

        if (existingUser) {
            throw new UnauthorizedException('Số điện thoại đã tồn tại');
        }

        // 2. Xử lý ngày sinh (dob)
        let finalDob: Date;
        if (dob) {
            // Nếu có chuỗi ISO full (ví dụ: 1995-05-20T...)
            finalDob = new Date(dob);
        } else {
            // Nếu chỉ có năm sinh, tạo ngày 01/01 của năm đó (UTC)
            // Cách này đảm bảo không bị nhảy ngày do múi giờ
            finalDob = new Date(Date.UTC(birthYear, 0, 1));
        }

        // 3. Tạo và lưu account
        const account = this.accountRepository.create({
            phone,
            full_name: name,
            dob: finalDob,
            role: AccountRole.CUSTOMER,
        });

        return await this.accountRepository.save(account);
    }
}

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../../database/entities';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private configService: ConfigService,
        @InjectRepository(Account)
        private accountRepository: Repository<Account>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET', 'super_secret_default_key_2026'),
        });
    }

    async validate(payload: JwtPayload) {
        // Trả về object user sẽ được gán vào request.user
        const user = await this.accountRepository.findOne({
            where: { id: payload.sub }
        });

        if (!user || user.deleted_at) {
            throw new UnauthorizedException('Token không hợp lệ hoặc tài khoản đã bị khóa');
        }

        return user;
    }
}

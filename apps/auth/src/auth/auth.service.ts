import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@app/jwt';
import { UserRepository } from 'apps/auth/src/repositories/user.repository';
import { LoginHistoryRepository } from 'libs/common/repositories/login-history.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly loginHistoryRepository: LoginHistoryRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(request: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = request;
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new NotFoundException('이메일 또는 비밀번호를 확인해주세요.');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      await this.loginHistoryRepository.save({
        userId: user.id,
        success: false,
      });

      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    const payload = { sub: user.id, role: user.role };
    const accessToken = this.jwtService.sign(payload);
    const expiresIn = this.configService.get('JWT_EXPIRES_IN');
    const expires = new Date(Date.now() + expiresIn * 1000);

    await this.loginHistoryRepository.save({ userId: user.id, success: true });

    return plainToInstance(LoginResponseDto, {
      id: user.id,
      accessToken,
      expires,
    });
  }
}

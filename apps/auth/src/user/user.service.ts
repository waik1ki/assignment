import { ConflictException, Injectable } from '@nestjs/common';
import { UserRepository } from 'apps/auth/src/repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    const exUser = await this.userRepository.findByEmail(dto.email);

    if (exUser) {
      throw new ConflictException('동일한 이메일이 존재합니다.');
    }

    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(dto.password, salt);

    const user = await this.userRepository.save({
      email: dto.email,
      password,
    });

    return plainToInstance(UserResponseDto, user);
  }

  async updateUser(
    id: string,
    dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    const updateQuery = {};

    if (dto.role) {
      Object.assign(updateQuery, {
        role: dto.role,
      });
    }

    if (dto.password) {
      const salt = await bcrypt.genSalt();
      const password = await bcrypt.hash(dto.password, salt);

      Object.assign(updateQuery, {
        password,
      });
    }

    const user = await this.userRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(id) },
      updateQuery,
    );

    return plainToInstance(UserResponseDto, user);
  }
}

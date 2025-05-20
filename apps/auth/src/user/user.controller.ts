import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResponseDto } from './dtos/user-response.dto';
import { CreateUserRequestDto } from './dtos/create-user-request.dto';
import { UpdateUserRequestDto } from './dtos/update-user-request.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 등록
  @Post()
  createUser(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.createUser(dto);
  }

  // 유저 수정
  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return this.userService.updateUser(userId, dto);
  }
}

import { PartialType, PickType } from '@nestjs/mapped-types';
import { CreateUserRequestDto } from './create-user-request.dto';
import { USER_ROLES, UserRole } from 'apps/auth/src/schemas/user.schema';
import { IsEnum, ValidateIf } from 'class-validator';

export class UpdateUserRequestDto extends PartialType(
  PickType(CreateUserRequestDto, ['password', 'role']),
) {
  @ValidateIf((o) => o.role !== undefined)
  @IsEnum(USER_ROLES)
  role?: UserRole;
}

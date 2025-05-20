import { Expose } from 'class-transformer';

export class LoginResponseDto {
  @Expose()
  id: string;

  @Expose()
  accessToken: string;

  @Expose()
  expires: string;
}

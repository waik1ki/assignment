import { Module, DynamicModule } from '@nestjs/common';
import { JwtModule as NestJwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from './jwt.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({})
export class JwtModule {
  static forRootAsync(): DynamicModule {
    return {
      module: JwtModule,
      imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        NestJwtModule.registerAsync({
          imports: [ConfigModule],
          useFactory: (config: ConfigService): JwtModuleOptions => ({
            secret: config.get('JWT_SECRET'),
            signOptions: {
              expiresIn: Number(config.get('JWT_EXPIRES_IN')),
            },
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [JwtStrategy, JwtService],
      exports: [JwtService, PassportModule, JwtStrategy],
    };
  }
}

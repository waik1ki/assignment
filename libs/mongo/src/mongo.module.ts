import { Module, Global, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoService } from './mongo.service';

@Global()
@Module({})
export class MongoModule {
  static connect(dbname: string): DynamicModule {
    return {
      module: MongoModule,
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
            uri: configService.get('MONGO_URI') + `/${dbname}`,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [MongoService],
      exports: [MongoService],
    };
  }

  static schema(models: { name: string; schema: any }[]): DynamicModule {
    return {
      module: MongoModule,
      imports: [MongooseModule.forFeature(models)],
      exports: [MongooseModule],
    };
  }
}

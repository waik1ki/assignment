import { Module, Global, DynamicModule, Provider } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoService } from './mongo.service';

@Global()
@Module({})
export class MongoModule {
  static connect(dbname: string): DynamicModule {
    const token = getConnectionToken(dbname);

    const mongoServiceProvider: Provider = {
      provide: MongoService,
      useFactory: (conn) => new MongoService(conn),
      inject: [token],
    };

    return {
      module: MongoModule,
      imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          connectionName: dbname,
          useFactory: (configService: ConfigService) => ({
            uri: configService.get('MONGO_URI') + `/${dbname}`,
          }),
          inject: [ConfigService],
        }),
      ],
      providers: [mongoServiceProvider],
      exports: [mongoServiceProvider],
    };
  }

  static schema(
    models: { name: string; schema: any }[],
    connection: string,
  ): DynamicModule {
    return {
      module: MongoModule,
      imports: [MongooseModule.forFeature(models, connection)],
      exports: [MongooseModule],
    };
  }
}

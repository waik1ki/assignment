import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';

@Injectable()
export class MongoService implements OnModuleInit {
  private readonly logger = new Logger(MongoService.name);

  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    this.connection.on('connected', () =>
      this.logger.log('📦 MongoDB connected'),
    );
    this.connection.on('error', (err) =>
      this.logger.error('❌ MongoDB connection error', err),
    );
    this.connection.on('disconnected', () =>
      this.logger.warn('⚠️ MongoDB disconnected'),
    );
  }

  getConnection(): Connection {
    return this.connection;
  }
}

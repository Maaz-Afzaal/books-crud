import { Module } from '@nestjs/common';
import { BookModule } from './module/book.module';
import { ConfigModule ,ConfigService} from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot(),

    //Connect Mongodb
    // MongooseModule.forRoot('mongodb+srv://maaz:root@cluster0.byorw.mongodb.net/?retryWrites=true&w=majority'),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    //Books Module
    BookModule],
})
export class AppModule {}

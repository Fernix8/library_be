import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BorrowBooksModule } from './borrow_books/borrow_books.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

console.log("🔍 MONGO_URI:", process.env.MONGODB);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường dùng toàn cục
    }),
    
    MongooseModule.forRoot(process.env.MONGODB),
    BookModule, BorrowBooksModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}

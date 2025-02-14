import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BorrowBooksModule } from './borrow_books/borrow_books.module';

console.log("🔍 MONGO_URI:", process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường dùng toàn cục
    }),
    
    MongooseModule.forRoot(process.env.MONGO_URI),
    BookModule, BorrowBooksModule,
  ],
})
export class AppModule {}

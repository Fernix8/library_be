import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BorrowBooksModule } from './borrow_books/borrow_books.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Biến môi trường dùng toàn cục
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || "mongodb+srv://boyearnmoney78:KnJCAMkcZVeoRgQL@library.4ysze.mongodb.net/?retryWrites=true&w=majority&appName=library"), // Kết nối MongoDB
    BookModule, BorrowBooksModule,
  ],
})
export class AppModule {}

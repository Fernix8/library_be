import { Module } from '@nestjs/common';
import { BorrowBooksService } from './borrow_books.service';
import { ConfigModule } from '@nestjs/config';
import { BorrowBooksController } from './borrow_books.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService],
})
export class BorrowBooksModule {}

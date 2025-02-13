import { Module } from '@nestjs/common';
import { BorrowBooksService } from './borrow_books.service';
import { BorrowBooksController } from './borrow_books.controller';

@Module({
  controllers: [BorrowBooksController],
  providers: [BorrowBooksService],
})
export class BorrowBooksModule {}

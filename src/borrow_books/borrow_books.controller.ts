import { Controller, Post, Body } from '@nestjs/common';
import { BorrowBooksService } from './borrow_books.service';
import { CreateBorrowBookDto } from './dto/create-borrow_book.dto';

@Controller('borrow_books')
export class BorrowBooksController {
  constructor(private readonly borrowBooksService: BorrowBooksService) {}

  @Post('request')
  async sendBorrowRequest(@Body() createBorrowBookDto: CreateBorrowBookDto) {
    return this.borrowBooksService.sendBorrowRequest(createBorrowBookDto);
  }
}

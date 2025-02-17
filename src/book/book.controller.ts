import { Controller, Get, Post, Body, Param, Patch, Delete, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto'
import { Book } from './entities/book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) { }

  @Post()
  create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.bookService.create(createBookDto);
  }

  @Get()
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 12
  ): Promise<{ books: Book[], total: number, totalPages: number, currentPage: number }> {
    const pageNumber = Number(page) || 1; // Ensure page is a valid number
    const pageSize = Number(limit) || 12; // Ensure limit is a valid number
    return this.bookService.findAll(pageNumber, pageSize);
  }

  @Get('top5')
  async getTop5NewBooks(): Promise<Book[]> {
    return this.bookService.getTop5NewBooks();
  }

  @Get('search')
  async searchBooks(
    @Query('query') query: string,
    @Query('searchBy') searchBy: 'title' | 'author',  // Accept the 'searchBy' query parameter
  ): Promise<Book[]> {
    return this.bookService.searchBooks(query, searchBy);  // Pass both query and searchBy to the service
  }
  

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.bookService.remove(id);
  }
}

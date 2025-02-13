import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().exec();
  }

  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) throw new NotFoundException('Book not found');
    return updatedBook;
  }

  async searchBooks(query: string): Promise<Book[]> {
    if (!query) {
      return [];
    }

    const regex = new RegExp(query.trim(), 'i'); // Case-insensitive search

    return this.bookModel
      .find({
        $or: [{ title: regex }, { author: regex }],
      })
      .select('bookCode title author publisher publishedYear') // Select specific fields
      .limit(20) // Limit results for better performance
      .exec();
  }
  
  async remove(id: string): Promise<void> {
    const deletedBook = await this.bookModel.findByIdAndDelete(id).exec();
    if (!deletedBook) throw new NotFoundException('Book not found');
  }

  async bulkCreate(books: CreateBookDto[]): Promise<void> {
    await this.bookModel.insertMany(books);
  }
}

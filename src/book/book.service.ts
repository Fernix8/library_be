import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) { }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = new this.bookModel(createBookDto);
    return newBook.save();
  }

  async findAll(page: number = 1, limit: number = 12): Promise<{ books: Book[], total: number, totalPages: number, currentPage: number }> {
    const skip = (page - 1) * limit; // Calculate how many documents to skip

    const [books, total] = await Promise.all([
      this.bookModel.find().skip(skip).limit(limit).exec(), // Fetch paginated books
      this.bookModel.countDocuments().exec() // Get total book count
    ]);

    return {
      books,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page
    };
  }


  async findOne(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id).exec();
    if (!book) throw new NotFoundException('Book not found');
    return book;
  }

  async getTop5NewBooks(): Promise<Book[]> {
    return this.bookModel
      .find()  // Find all books
      .sort({ createdAt: -1 })  // Sort by 'createdAt' in descending order (newest first)
      .limit(5)  // Limit the result to the top 5
      .exec();  // Execute the query
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const updatedBook = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true })
      .exec();
    if (!updatedBook) throw new NotFoundException('Book not found');
    return updatedBook;
  }

  async searchBooks(query: string, searchBy: 'title' | 'author'): Promise<Book[]> {
    if (!query) {
      return [];
    }

    const regex = new RegExp(query.trim(), 'i'); // Case-insensitive search

    // Modify the search logic to match the searchBy condition
    const searchCondition = searchBy === 'title'
      ? { title: regex }
      : { author: regex };

    return this.bookModel
      .find(searchCondition)  // Use dynamic search condition based on searchBy
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

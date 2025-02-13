import { NestFactory } from '@nestjs/core';
import { AppModule } from './src/app.module.ts';
import { BookService } from './src/book/book.service.ts';
import * as XLSX from 'xlsx';

async function importExcelData(filePath) {
  const app = await NestFactory.createApplicationContext(AppModule); // Bootstrap NestJS
  const bookService = app.get(BookService); // Get BookService

  // Read Excel file
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // First sheet
  const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

  // Convert Excel data to match Book model
  const books = data.map((row) => ({
    bookCode: row['Mã đoạn'],
    bookId: row['Mã Sách'], 
    title: row['Tên sách'],
    parallelTitle: row['Nhan đề song song'] || '',
    bookStorage: row['Kho Sách (Chỉ ghi Ký hiệu)'] || '',
    description: row['Mô tả - Phụ đề'] || '',
    volume: row['Tập'] || '',
    volumeName: row['Tên tập'] || '',
    author: row['Tên Tác Giả'],
    coAuthor: row['Đồng Tác Giả'] || '',
    translator: row['Dịch Giả'] || '',
  }));

  // Insert into MongoDB
  await bookService.bulkCreate(books);
  console.log(`Successfully imported ${books.length} books into MongoDB`);

  await app.close(); // Close NestJS app
}

// Run the import function
const filePath = './data.XLS'; // Update with your file path
importExcelData(filePath);

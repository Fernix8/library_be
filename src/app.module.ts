import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BookModule } from './book/book.module';
import { BorrowBooksModule } from './borrow_books/borrow_books.module';

console.log("🔍 Checking MONGO_URI:", process.env.MONGO_URI); // Debug

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure environment variables are available globally
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log("🔍 Connecting to MongoDB with URI:", uri); // Debugging
        if (!uri) {
          throw new Error("❌ MONGO_URI is not defined! Check Railway environment variables.");
        }
        return { uri };
      },
      inject: [ConfigService],
    }),
    
    BookModule, 
    BorrowBooksModule,
  ],
})
export class AppModule {}

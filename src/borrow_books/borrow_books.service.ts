import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import { CreateBorrowBookDto } from './dto/create-borrow_book.dto';

@Injectable()
export class BorrowBooksService {
  private readonly transporter;

  constructor(private configService: ConfigService) {
    // Set up Nodemailer transporter using environment variables
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.configService.get<string>('EMAIL_USER'),  // Get email from environment variable
        pass: this.configService.get<string>('EMAIL_PASS'),  // Get app-specific password from environment variable
      },
    });
  }

  async sendBorrowRequestEmail(borrowBookDto: CreateBorrowBookDto) {
    const mailOptions = {
      from: 'reply@gmail.com',
      to: 'thuvienpct2021@gmail.com',
      subject: 'New Borrow Book Request',
      text: this.formatBorrowRequest(borrowBookDto),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  private formatBorrowRequest(borrowBookDto: CreateBorrowBookDto): string {
    return `
      A new borrow book request has been submitted:

      - Card Number: ${borrowBookDto.cardNumber}
      - Full Name: ${borrowBookDto.fullName}
      - Class/Department: ${borrowBookDto.classOrDepartment}
      - Book Code: ${borrowBookDto.bookCode}
      - Book Title: ${borrowBookDto.bookTitle}
      - Borrow Date: ${borrowBookDto.borrowDate}
    `;
  }
}

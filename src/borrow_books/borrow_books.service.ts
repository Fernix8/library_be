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
      subject: 'Yêu cầu mượn sách mới',
      text: this.formatBorrowRequest(borrowBookDto),
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email đã được gửi thành công!');
    } catch (error) {
      console.error('Lỗi khi gửi email:', error);
    }
  }

  private formatBorrowRequest(borrowBookDto: CreateBorrowBookDto): string {
    return `
      Một yêu cầu mượn sách mới đã được gửi:
      - Email người mượn: ${borrowBookDto.cardNumber}
      - Số điện người mượn: ${borrowBookDto.phone}
      - Số thẻ: ${borrowBookDto.cardNumber}
      - Họ và tên: ${borrowBookDto.fullName}
      - Lớp/Khoa: ${borrowBookDto.classOrDepartment}
      - Mã sách: ${borrowBookDto.bookId}
      - Tên sách: ${borrowBookDto.bookTitle}
      - Ngày mượn: ${borrowBookDto.borrowDate}
      - Ghi chú: ${borrowBookDto.note}
    `;
  }
}

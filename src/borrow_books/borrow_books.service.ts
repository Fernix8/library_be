import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { CreateBorrowBookDto } from './dto/create-borrow_book.dto';

@Injectable()
export class BorrowBooksService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'testsendmadil123@gmail.com',
        pass: '123456789aB',
      },
    });
  }

  async sendBorrowRequest(createBorrowBookDto: CreateBorrowBookDto): Promise<{ message: string }> {
    const { cardNumber, fullName, classOrDepartment, bookCode, bookTitle, borrowDate } = createBorrowBookDto;

    const mailOptions = {
      from: '123456789aB@gmail.com',
      to: 'noreply@adguard.com',
      subject: 'Yêu Cầu Mượn Sách',
      text: `
        Thông tin yêu cầu mượn sách:
        - Số thẻ / Mã giáo viên: ${cardNumber}
        - Họ và tên: ${fullName}
        - Lớp / Tổ bộ môn: ${classOrDepartment}
        - Mã sách: ${bookCode}
        - Tên sách: ${bookTitle}
        - Ngày mượn: ${borrowDate}
      `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { message: 'Yêu cầu mượn sách đã được gửi thành công!' };
    } catch (error) {
      throw new Error('Không thể gửi email. Vui lòng thử lại!');
    }
  }
}

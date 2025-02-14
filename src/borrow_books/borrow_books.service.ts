import { Injectable } from '@nestjs/common';

@Injectable()
export class BorrowBooksService {
  private readonly RESEND_API_KEY = process.env.RESEND_API_KEY; // Load API key

  async sendBorrowRequestEmail(borrowData: any) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'no-reply@resend.example.com',
          to: 'checkpassbypvt89@gmail.com', // Fixed recipient
          subject: '📚 New Book Borrow Request',
          text: `A new book borrow request has been made:

          - Name: ${borrowData.fullName}
          - Card Number: ${borrowData.cardNumber}
          - Department: ${borrowData.classOrDepartment}
          - Book Title: ${borrowData.bookTitle}
          - Borrow Date: ${borrowData.borrowDate}

          Please review the request.`,
        }),
      });

      if (!response.ok) {
        throw new Error(`❌ Failed to send email: ${await response.text()}`);
      }

      const data = await response.json();
      console.log('✅ Email sent successfully:', data);
      return data;
    } catch (error) {
      console.error('❌ Error sending email:', error);
      return null;
    }
  }
}

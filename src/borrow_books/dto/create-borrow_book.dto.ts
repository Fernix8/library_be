import { IsDateString, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBorrowBookDto {
    @IsNotEmpty()
    email: string; // Email người mượn

    @IsOptional()
    phone?: string; // Email người mượn

    @IsNotEmpty()
    cardNumber: string; // Số thẻ / Mã giáo viên
  
    @IsNotEmpty()
    fullName: string; // Họ và tên
  
    @IsNotEmpty()
    classOrDepartment: string; // Lớp / Tổ bộ môn
  
    @IsNotEmpty()
    bookId: string; // Mã sách
  
    @IsNotEmpty()
    bookTitle: string; // Tên sách
  
    @IsNotEmpty()
    @IsDateString()
    borrowDate: string; // Ngày mượn (YYYY-MM-DD)

    @IsOptional()
    note?: string; 
}

import { IsDateString, IsNotEmpty } from "class-validator";

export class CreateBorrowBookDto {
    @IsNotEmpty()
    cardNumber: string; // Số thẻ / Mã giáo viên
  
    @IsNotEmpty()
    fullName: string; // Họ và tên
  
    @IsNotEmpty()
    classOrDepartment: string; // Lớp / Tổ bộ môn
  
    @IsNotEmpty()
    bookCode: string; // Mã sách
  
    @IsNotEmpty()
    bookTitle: string; // Tên sách
  
    @IsNotEmpty()
    @IsDateString()
    borrowDate: string; // Ngày mượn (YYYY-MM-DD)
}

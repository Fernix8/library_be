import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true }) // Automatically adds createdAt, updatedAt fields
export class Book {
  @Prop({ required: true, unique: true })
  stt: number; // Mã đoạn

  @Prop({ required: true, unique: true })
  bookCode: string; // Mã đoạn

  @Prop({ required: true, unique: true })
  bookId: string; // Mã Sách

  @Prop({ required: true })
  title: string; // Tên sách

  @Prop()
  parallelTitle?: string; // Nhan đề song song

  @Prop()
  librarySection?: string; // Kho Sách (Chỉ ghi Ký hiệu)

  @Prop()
  description?: string; // Mô tả - Phụ đề

  @Prop()
  volume?: number; // Tập (Số tập)

  @Prop()
  volumeTitle?: string; // Tên tập

  @Prop()
  author: string; // Tên Tác Giả

  @Prop()
  coAuthor?: string; // Đồng Tác Giả

  @Prop()
  translator?: string; // Dịch Giả

  @Prop()
  manufacturingPlace?: string // Nơi sản xuất

  @Prop()
  publisher?: string; // Nhà sản xuất

  @Prop()
  publishedYear?: string; // Năm sản xuất

  @Prop()
  quantity?: number; // số lượng

  @Prop()
  edition?: number; // lần xb

  @Prop()
  price?: number; // giá bìa

  @Prop()
  classificationCode?: number; // mã phân loại

  @Prop()
  paper?: number; // số trang

  @Prop()
  size?: number; // khổ cỡ

  @Prop()
  letter?: string; // tùng thư

  @Prop()
  footnote?: string; // phụ chú

  @Prop()
  dktq?: string // số sổ dktq

  @Prop()
  topic?: string // chủ đề

  @Prop()
  note?: string // chú thích
}

export const BookSchema = SchemaFactory.createForClass(Book);

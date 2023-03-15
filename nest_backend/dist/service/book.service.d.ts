import { Model } from 'mongoose';
import { BookDto } from 'src/dto/book.dto';
import { BookDocument, Book } from 'src/schema/book.schema';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<BookDocument>);
    fetchBooks(): Promise<Book[]>;
    fetchBookById(id: String): Promise<Book>;
    insertBook(body: BookDto): Promise<Book>;
    updateBook(id: String, body: Object): Promise<Book>;
    deleteBook(id: String): Promise<Book>;
}

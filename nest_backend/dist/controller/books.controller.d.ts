import { BookDto } from "src/dto/book.dto";
import { BookService } from "src/service/book.service";
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    fetchBooks(): Promise<import("../schema/book.schema").Book[]>;
    fetchBookById(id: String): Promise<import("../schema/book.schema").Book>;
    createBook(body: BookDto): Promise<import("../schema/book.schema").Book>;
    updateBook(id: String, body: Object): Promise<import("../schema/book.schema").Book>;
    deleteBook(id: String): Promise<import("../schema/book.schema").Book>;
}

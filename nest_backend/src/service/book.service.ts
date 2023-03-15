import {
  HttpException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BookDto } from 'src/dto/book.dto';
import { BookDocument, Book } from 'src/schema/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async fetchBooks(): Promise<Book[]> {
    const allBooks = await this.bookModel.find().exec(); //Will return all books from db
    if (!allBooks || !allBooks[0]) {
      //To check if minimum of single book exists in DB
      throw new NotFoundException();
    }
    return allBooks;
  }

  /**
   *@description create a book by its id
   *@body conatins data to be create new book
   */
  async fetchBookById(id: String): Promise<Book> {
    try {
      const book = await this.bookModel.findById(id);
      if (!book) {
        //To check if a book exists or not
        throw new HttpException('Book Not Found', 404);
      }
      return book;
    } catch (error) {
      throw new HttpException('aasd', 406);
    }
  }

  /**
   *@description create a body
   *@body conatins data to be updated
   */
  async insertBook(body: BookDto): Promise<Book> {
    try {
      const newBook = new this.bookModel(body);
      return await newBook.save();
    } catch (error) {
      throw new HttpException(error.message, 406);
    }
  }

  /**
   *@description Update a book by its id
   *@param id
   *@body conatins data to be updated
   */
  async updateBook(id: String, body: Object): Promise<Book> {
    const updatedBook = await this.bookModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    if (!updatedBook) throw new NotFoundException(); // To check if a book with specific id exists in db or not
    return updatedBook;
  }

  /**
   *@description Delete a book by its id
   *@param id
   */
  async deleteBook(id: String): Promise<Book> {
    const deletedBook = await this.bookModel.findByIdAndRemove(id); //Performs Hard delete operation
    if (!deletedBook) throw new NotFoundException(); //To check if a book exists in db or not
    return deletedBook;
  }
}

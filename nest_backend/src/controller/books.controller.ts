import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BookDto } from "src/dto/book.dto";
import { BookService } from "src/service/book.service";

@Controller('books')
export class BookController {
 constructor (private readonly bookService : BookService){}
    @Get()
    //To get all books
      fetchBooks(){
         return this.bookService.fetchBooks();
      }

 /**
   *@description Get a book by its id
   *@param id
   */
 @Get(':id')
 fetchBookById(@Param('id') id:String) {
   return this.bookService.fetchBookById(id)
 }

 /**
   *@description Creates a new book
   *@body contains name , author and publishedOn
   */
 @Post()
 async createBook(@Body() body:BookDto){
    return this.bookService.insertBook(body);
 }

  /**
   *@description update a book nby its id
   *@param id
   *@body contains name , author and publishedOn
   */
 @Patch(':id')
 updateBook(@Param('id') id:String , @Body() body:Object){
   return this.bookService.updateBook(id,body)
 }

  /**
   *@description Delete a book by its id
   *@param id
   */
 @Delete(':id')
 deleteBook (@Param('id') id:String) {
   return this.bookService.deleteBook(id)
 }
}
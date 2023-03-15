import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { BookController } from "src/controller/books.controller";
import { Book, BookSchema } from "src/schema/book.schema";
import { BookService } from "src/service/book.service";

@Module({

    imports:[
        //Importing Book Schema 
        MongooseModule.forFeature([{name:Book.name,schema:BookSchema}])
    ],
    controllers:[BookController],
    providers:[BookService]
})
export class BookModule {}
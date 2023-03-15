import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type BookDocument =HydratedDocument<Book> 

@Schema()
export class Book {
    @Prop({required:true})
    name:String

    @Prop({required:true})
    author:String

    @Prop({required:true})
    publishedOn:Date
}

export const BookSchema = SchemaFactory.createForClass(Book)
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({
    type: String,
    required: true,
    minlength: 3,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
    min: 0,
  })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

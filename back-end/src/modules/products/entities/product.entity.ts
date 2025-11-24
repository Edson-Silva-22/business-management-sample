import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export enum ProductStatus {
  NOTSTARTED = "notStarted",
  INPROGRESS = 'inProgress',
  REVIEW = 'review',
  DONE = 'done'
}

@Schema({ timestamps: true })
export class Product {
  @Prop()
  name: string

  @Prop()
  description: string

  @Prop({ enum: ProductStatus, default: ProductStatus.NOTSTARTED })
  status: ProductStatus

  @Prop({
    default: Date.now
  })
  order: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);
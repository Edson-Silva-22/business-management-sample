import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/modules/products/entities/product.entity';
import { SeedService } from './seeds.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI! || 'mongodb://localhost:27017/dashboard-sample'),
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema }
    ])
  ],
  providers: [SeedService],
})
export class SeedModule {}

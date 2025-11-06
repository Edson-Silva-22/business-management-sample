import { Module } from '@nestjs/common';
import { ProductsModule } from './modules/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    ProductsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

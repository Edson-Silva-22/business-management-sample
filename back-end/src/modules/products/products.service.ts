import { HttpException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>
  ) {}

  handleError(error: unknown) {
    console.error(error);
    if (error instanceof HttpException) throw error;
    throw new InternalServerErrorException('Erro interno do servidor');  
  }

  async create(createProductDto: CreateProductDto) {
    try {
      const createdProduct = await this.productModel.create(createProductDto);
      return createdProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findAll() {
    try {
      const products = await this.productModel.find().exec();
      return products;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOne(id: string) {
    try {
      const findOneProduct = await this.productModel.findById(id).exec();
      if (!findOneProduct) throw new NotFoundException('Produto não encontrado');

      return findOneProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        id,
        updateProductDto,
        { new: true }
      ).exec();

      if (!updatedProduct) throw new NotFoundException('Produto não encontrado');

      return updatedProduct;
    } catch (error) {
      this.handleError(error);
    }
  }

  async remove(id: string) {
    try {
      const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
      if (!deletedProduct) throw new NotFoundException('Produto não encontrado');

      return "Produto deletado com sucesso";
    } catch (error) {
      this.handleError(error);
    }
  }
}

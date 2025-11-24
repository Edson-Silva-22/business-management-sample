import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/modules/products/entities/product.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async run() {
    try {
      await this.productsSeed();
    } catch (error) {
      console.error('Erro ao executar os seeds:', error);
    }
  }

  async productsSeed() {
    try {
      await this.productModel.deleteMany({});

      const productsSeed = [
        {
          "name": "Produto 01",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique illo, nisi a debitis nulla dignissimos, blanditiis dolorem, ullam voluptatem dolor id.",
          "status": "notStarted"
        },
        {
          "name": "Produto 02",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam similique illo, nisi a debitis nulla dignissimos, blanditiis dolorem, ullam voluptatem dolor id.",
          "status": "notStarted"
        },
        {
          "name": "Produto 03",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, provident dicta fugiat impedit suscipit deserunt!",
          "status": "notStarted"
        },
        {
          "name": "Produto 04",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores maiores sed explicabo perferendis doloribus quas!",
          "status": "inProgress"
        },
        {
          "name": "Produto 05",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia enim dolore dicta exercitationem.",
          "status": "inProgress"
        },
        {
          "name": "Produto 06",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, ipsa voluptate dolorem molestias velit!",
          "status": "inProgress"
        },
        {
          "name": "Produto 07",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod pariatur temporibus repudiandae doloremque odit.",
          "status": "review"
        },
        {
          "name": "Produto 08",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam, totam magni perspiciatis sit nostrum!",
          "status": "review"
        },
        {
          "name": "Produto 09",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus voluptate soluta dolorem earum minima!",
          "status": "review"
        },
        {
          "name": "Produto 10",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, ad voluptas quibusdam earum tempora.",
          "status": "done"
        },
        {
          "name": "Produto 11",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, velit cumque nesciunt ratione vero.",
          "status": "done"
        },
        {
          "name": "Produto 12",
          "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, repellat possimus. Corrupti, quis!",
          "status": "done"
        }
      ];

      await this.productModel.insertMany(productsSeed);

      console.log('Seed concluído com sucesso ✔️');
    } catch (error) {
      console.error('Erro ao inserir seed de produtos:', error);
    }
  }
}

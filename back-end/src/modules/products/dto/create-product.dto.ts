import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator"
import { ProductStatus } from "../entities/product.entity"

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string

  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  @IsString({ message: 'A descrição deve ser uma string' })
  description: string

  @IsOptional()
  @IsEnum(ProductStatus, { message: 'Status inválido' })
  status: ProductStatus
}

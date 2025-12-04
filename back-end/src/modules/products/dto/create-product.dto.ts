import { IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator"
import { ProductStatus } from "../entities/product.entity"

export class CreateProductDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  name: string

  @IsOptional()
  @IsObject({ message: 'A descrição deve ser um objeto' })
  description?: Record<string, any>

  @IsOptional()
  @IsEnum(ProductStatus, { message: 'Status inválido' })
  status: ProductStatus
}

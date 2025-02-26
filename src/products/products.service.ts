import { Injectable, Scope } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateProductDto } from './dto/create-product.dto';
import { Product, ProductSchema } from './schemas/product.schema';
import { TenantService } from '../common/tenant.service';

@Injectable()
export class ProductsService {
  constructor(private readonly tenantService: TenantService) {}

  private async getProductModel(tenantId: string): Promise<Model<Product>> {
    return this.tenantService.getTenantModel<Product>(
      Product.name,
      ProductSchema,
      tenantId,
    );
  }

  async create(createProductDto: CreateProductDto, tenantId: string) {
    const productModel = await this.getProductModel(tenantId);
    const product = await productModel.create(createProductDto);
    return product.save();
  }

  async findAll(tenantId: string) {
    const productModel = await this.getProductModel(tenantId);
    const products = await productModel.find({});
    return products;
  }
}

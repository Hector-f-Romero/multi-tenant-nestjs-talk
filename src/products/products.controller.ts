import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Request } from 'express';

interface RequestWithTenant extends Request {
  tenantId: string;
}

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(
    @Req() req: RequestWithTenant,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(createProductDto, req.tenantId);
  }

  @Get()
  findAll(@Req() req: RequestWithTenant) {
    return this.productsService.findAll(req.tenantId);
  }
}

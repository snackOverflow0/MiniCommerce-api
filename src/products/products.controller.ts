import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Protected route
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    // Current authenticated user
    @Req() req: any,
    // Extract body
    @Body() body: any
  ) {
    return this.productsService.create({
      ...body,

      // Product belongs to logged-in user
      userId: req.user.userId
    });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() body: any,
    @Req() req: any
  ) {
    Number(id),
    body,
    req.user.userId
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  delete(
    @Param('id') id: string,
    @Req() req: any
  ) {
    Number(id),
    req.user.userId
  }
}

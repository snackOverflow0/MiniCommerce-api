import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService
  ) {}

  // Create product
  async create(data: any) {
    return this.prisma.product.create({
      data
    })
  }

  // Get all products
  findAll() {
    return this.prisma.product.findMany({
      
      // Include owner info
      include: {
        user: true
      }
    })
  }
}

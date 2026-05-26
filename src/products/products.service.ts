import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class ProductsService {
  constructor(
    private prisma: PrismaService,

    // Redis access
    private cacheService: CacheService
  ) {}

  // Create product
  async create(data: any) {
    const product =  this.prisma.product.create({
      data
    })

    // Remove old cache
    await this.cacheService.del(
      'products'
    )

    return product
  }

  // Get all products
  async findAll() {

    // Try cache first
    const cachedProducts = 
      await this.cacheService.get(
        'products'
      )

    // If cache exists
    if (cachedProducts) {
      console.log('Products from Redis cache')

      // Redis stores strings
      // Convert back to array
      return JSON.parse(cachedProducts)
    }

    console.log('Products from PostgreSQL')

    // Fetch from database
    const products = 
      await this.prisma.product.findMany({
        include: {
          user: true
        }
      })
   
    await this.cacheService.set(
      'products',
      JSON.stringify(products)
    )

    return products
  }

  // Update product
  async update(
    productId: number,

    data: any,

    currentUserId: number,
  ) {

    // Find product
    const product =
      await this.prisma.product.findUnique({

        where: {
          id: productId,
        },
      });

    // Product missing
    if (!product) {

      throw new NotFoundException(
        'Product not found',
      );
    }

    // Ownership check
    if (
      product.userId !== currentUserId
    ) {

      throw new ForbiddenException(
        'You do not own this product',
      );
    }

    // Update product
    const updatedProduct =
      await this.prisma.product.update({

        where: {
          id: productId,
        },

        data,
      });

    // Clear cache
    await this.cacheService.del(
      'products',
    );

    return updatedProduct;
  }

  async delete(
    productId: number,

    currentUserId: number,
  ) {

    // Find product
    const product =
      await this.prisma.product.findUnique({

        where: {
          id: productId,
        },
      });

    if (!product) {

      throw new NotFoundException(
        'Product not found',
      );
    }

    // Ownership validation
    if (
      product.userId !== currentUserId
    ) {

      throw new ForbiddenException(
        'You do not own this product',
      );
    }

    // Delete product
    await this.prisma.product.delete({

      where: {
        id: productId,
      },
    });

    // Clear cache
    await this.cacheService.del(
      'products',
    );

    return {
      message:
        'Product deleted',
    };
  }
}

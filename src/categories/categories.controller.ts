import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { AuthGuard } from '@nestjs/passport';
import { CategoryResponseDto } from './dto/response.dto';
import { Category } from './entities/category.entity';
import { plainToInstance } from 'class-transformer';

@UseGuards(AuthGuard('jwt'))
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category: Category =
      await this.categoriesService.create(createCategoryDto);
    return plainToInstance(CategoryResponseDto, category);
  }

  @Get()
  async findAll(): Promise<CategoryResponseDto[]> {
    const categories: Category[] = await this.categoriesService.findAll();
    return plainToInstance(CategoryResponseDto, categories);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CategoryResponseDto> {
    const category: Category | null = await this.categoriesService.findOne(id);
    return plainToInstance(CategoryResponseDto, category);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryResponseDto> {
    const category: Category = await this.categoriesService.update(
      id,
      updateCategoryDto,
    );
    return plainToInstance(CategoryResponseDto, category);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.remove(id);
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class DecksService {
  constructor(
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createDeckDto: CreateDeckDto, userId: string): Promise<Deck> {
    const user: User | null = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const deck: Deck | null = await this.deckRepository.create(createDeckDto);
    deck.user = user;
    if (createDeckDto.categoryId) {
      const category: Category | null = await this.categoryRepository.findOne({
        where: { id: createDeckDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      deck.category = category;
    }
    return this.deckRepository.save(deck);
  }

  async findAll(userId: string): Promise<Deck[]> {
    return this.deckRepository.find({
      where: { user: { id: userId } },
      relations: ['category'],
    });
  }

  async findOne(id: string, userId: string): Promise<Deck> {
    const deck: Deck | null = await this.deckRepository.findOne({
      where: { user: { id: userId } },
      relations: ['category'],
    });
    if (!deck) {
      throw new NotFoundException('Deck not found');
    }
    return deck;
  }

  async update(
    id: string,
    updateDeckDto: UpdateDeckDto,
    userId: string,
  ): Promise<Deck> {
    const deck: Deck | null = await this.findOne(id, userId);
    if (updateDeckDto.title) {
      deck.title = updateDeckDto.title;
    }
    if (updateDeckDto.categoryId) {
      const category: Category | null = await this.categoryRepository.findOne({
        where: { id: updateDeckDto.categoryId },
      });
      if (!category) {
        throw new NotFoundException('Category not found');
      }
      deck.category = category;
    }
    return this.deckRepository.save(deck);
  }

  async remove(id: string, userId: string): Promise<Deck> {
    const deck = await this.findOne(id, userId);
    return await this.deckRepository.remove(deck);
  }
}

import { Module } from '@nestjs/common';
import { DecksService } from './decks.service';
import { DecksController } from './decks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Deck } from './entities/deck.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { CategoriesModule } from 'src/categories/categories.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [DecksController],
  exports: [DecksService],
  imports: [
    TypeOrmModule.forFeature([Deck, User, Category]),
    CategoriesModule,
    UsersModule,
  ],
  providers: [DecksService],
})
export class DecksModule {}

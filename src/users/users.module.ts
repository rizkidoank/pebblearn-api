import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionsService } from 'src/encryptions/encryptions.service';
import { Deck } from 'src/decks/entities/deck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Deck])],
  controllers: [UsersController],
  exports: [UsersService],
  providers: [UsersService, EncryptionsService],
})
export class UsersModule {}

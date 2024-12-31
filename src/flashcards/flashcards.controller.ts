import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { AuthGuard } from '@nestjs/passport';
import { FlashcardResponseDto } from './dto/response.dto';
import { Flashcard } from './entities/flashcard.entity';
import { plainToInstance } from 'class-transformer';

@UseGuards(AuthGuard('jwt'))
@Controller('decks/:deckId/flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  async create(
    @Param('deckId') deckId: string,
    @Req() req: any,
    @Body() createFlashcardDto: CreateFlashcardDto,
  ): Promise<FlashcardResponseDto> {
    const flashcard: Promise<Flashcard> = this.flashcardsService.create(
      deckId,
      req.user.userId,
      createFlashcardDto,
    );
    return plainToInstance(FlashcardResponseDto, flashcard);
  }

  @Get()
  async findAll(
    @Param('deckId') deckId: string,
    @Req() req: any,
  ): Promise<FlashcardResponseDto[]> {
    const flashcards: Flashcard[] = await this.flashcardsService.findAll(
      deckId,
      req.user.userId,
    );
    return plainToInstance(FlashcardResponseDto, flashcards);
  }

  @Get(':id')
  async findOne(
    @Param('deckId') deckId: string,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<FlashcardResponseDto> {
    const flashcard: Promise<Flashcard> = this.flashcardsService.findOne(
      deckId,
      req.user.userId,
      id,
    );
    return plainToInstance(FlashcardResponseDto, flashcard);
  }

  @Patch(':id')
  async update(
    @Param('deckId') deckId: string,
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<FlashcardResponseDto> {
    const flashcard: Flashcard = await this.flashcardsService.findOne(
      deckId,
      req.user.userId,
      id,
    );
    const updatedFlashcard: Flashcard = await this.flashcardsService.update(
      deckId,
      flashcard.deck.user.id,
      flashcard.id,
      updateFlashcardDto,
    );
    return plainToInstance(FlashcardResponseDto, updatedFlashcard);
  }

  @Delete(':id')
  async remove(
    @Param('deckId') deckId: string,
    @Param('id') id: string,
    @Req() req: any,
  ): Promise<FlashcardResponseDto> {
    const flashcard: Flashcard = await this.flashcardsService.remove(
      deckId,
      req.user.userId,
      id,
    );
    return plainToInstance(FlashcardResponseDto, flashcard);
  }
}

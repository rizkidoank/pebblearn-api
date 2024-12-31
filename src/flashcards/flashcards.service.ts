import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFlashcardDto } from './dto/create-flashcard.dto';
import { UpdateFlashcardDto } from './dto/update-flashcard.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Flashcard } from './entities/flashcard.entity';
import { Repository } from 'typeorm';
import { Deck } from 'src/decks/entities/deck.entity';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard)
    private readonly flashcardRepository: Repository<Flashcard>,
    @InjectRepository(Deck)
    private readonly deckRepository: Repository<Deck>,
  ) {}

  async findDeck(deckId: string): Promise<Deck> {
    const deck: Deck | null = await this.deckRepository.findOne({
      where: { id: deckId },
    });

    if (!deck) {
      throw new NotFoundException('Deck not found or not belong to user!');
    }

    return deck;
  }

  async create(
    deckId: string,
    userId: string,
    createFlashcardDto: CreateFlashcardDto,
  ): Promise<Flashcard> {
    const deck: Deck = await this.findDeck(deckId);

    console.log(deck);
    createFlashcardDto.deck = deck;

    const flashcard: Flashcard =
      this.flashcardRepository.create(createFlashcardDto);
    return this.flashcardRepository.save(flashcard);
  }

  async findAll(deckId: string, userId: string): Promise<Flashcard[]> {
    console.log(userId);
    const deck: Deck = await this.findDeck(deckId);
    return this.flashcardRepository.find({
      where: { deck: { id: deck.id } },
      relations: ['deck'],
    });
  }

  async findOne(
    deckId: string,
    userId: string,
    id: string,
  ): Promise<Flashcard> {
    const deck: Deck = await this.findDeck(deckId);
    const flashcard: Flashcard | null = await this.flashcardRepository.findOne({
      where: [{ id: id }, { deck: { id: deck.id } }],
      relations: ['deck'],
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard is not exists');
    }
    return flashcard;
  }

  async update(
    deckId: string,
    userId: string,
    flashcardId: string,
    updateFlashcardDto: UpdateFlashcardDto,
  ): Promise<Flashcard> {
    const flashcard = await this.findOne(deckId, userId, flashcardId);

    if (updateFlashcardDto.deck?.id) {
      const deck = await this.deckRepository.findOne({
        where: {
          id: updateFlashcardDto.deck.id,
          user: { id: userId },
        },
      });

      if (!deck) {
        throw new NotFoundException(
          'Deck not found or does not belong to user',
        );
      }

      flashcard.deck = deck;
    }

    if (updateFlashcardDto.front) {
      flashcard.front = updateFlashcardDto.front;
    }
    if (updateFlashcardDto.back) {
      flashcard.back = updateFlashcardDto.back;
    }

    return this.flashcardRepository.save(flashcard);
  }

  async remove(
    deckId: string,
    userId: string,
    flashcardId: string,
  ): Promise<Flashcard> {
    const flashcard: Flashcard = await this.findOne(
      deckId,
      userId,
      flashcardId,
    );
    return await this.flashcardRepository.remove(flashcard);
  }
}

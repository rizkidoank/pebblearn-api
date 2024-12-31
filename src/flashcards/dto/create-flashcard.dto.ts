import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Deck } from 'src/decks/entities/deck.entity';

export class CreateFlashcardDto {
  @IsNotEmpty()
  @IsString()
  front: string;

  @IsNotEmpty()
  @IsString()
  back: string;

  @Type(() => Deck)
  deck: Deck;
}

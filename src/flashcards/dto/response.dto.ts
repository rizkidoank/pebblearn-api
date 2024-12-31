import { Exclude, Expose, Type } from 'class-transformer';
import { DeckResponseDto } from 'src/decks/dto/response.dto';
import { BaseResponseDto } from 'src/shared/dto/base.response.dto';

@Exclude()
export class FlashcardResponseDto extends BaseResponseDto {
  @Expose()
  front: string;

  @Expose()
  back: string;

  @Expose()
  @Type(() => DeckResponseDto)
  deck: DeckResponseDto;
}

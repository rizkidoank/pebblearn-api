import { Exclude, Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/categories/dto/response.dto';
import { FlashcardResponseDto } from 'src/flashcards/dto/response.dto';
import { BaseResponseDto } from 'src/shared/dto/base.response.dto';
import { UserResponseDto } from 'src/users/dto/response.dto';

@Exclude()
export class DeckResponseDto extends BaseResponseDto {
  @Expose()
  title: string;

  @Expose()
  @Type(() => CategoryResponseDto)
  category?: CategoryResponseDto;

  @Expose()
  @Type(() => FlashcardResponseDto)
  flashcards?: FlashcardResponseDto[];

  @Expose()
  @Type(() => UserResponseDto)
  user: UserResponseDto;
}

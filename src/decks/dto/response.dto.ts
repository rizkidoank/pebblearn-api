import { Exclude, Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from 'src/categories/dto/response.dto';
import { BaseResponseDto } from 'src/shared/dto/base.response.dto';

@Exclude()
export class DeckResponseDto extends BaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => CategoryResponseDto)
  category?: CategoryResponseDto;
}

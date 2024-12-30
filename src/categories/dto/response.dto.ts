import { Exclude, Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/shared/dto/base.response.dto';

@Exclude()
export class CategoryResponseDto extends BaseResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;
}

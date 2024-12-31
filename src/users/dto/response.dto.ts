import { Exclude, Expose } from 'class-transformer';
import { BaseResponseDto } from 'src/shared/dto/base.response.dto';

@Exclude()
export class UserResponseDto extends BaseResponseDto {
  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  name: string;
}

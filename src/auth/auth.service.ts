import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { JwtLoginResponseDto, RegisterResponseDto } from './dto/responses.dto';
import { plainToInstance } from 'class-transformer';
import { LoginDto } from './dto/login.dto';
import { JwtPayload } from './auth.interface';
import { EncryptionsService } from 'src/encryptions/encryptions.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionsService,
  ) {}

  async validate(username: string, password: string): Promise<User> {
    const user: User = await this.usersService.findByUsername(username);
    if (!user) {
      throw new BadRequestException("User doesn't exist");
    }
    const isPasswordMatch: boolean = await this.encryptionService.compare(
      password,
      user.password,
    );
    if (!isPasswordMatch) {
      throw new BadRequestException("Password doesn't match with records");
    }
    return user;
  }

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    const user: User = await this.usersService.create(registerDto);
    return plainToInstance(RegisterResponseDto, user);
  }

  async login(loginDto: LoginDto): Promise<JwtLoginResponseDto> {
    const validUser: User = await this.validate(
      loginDto.username,
      loginDto.password,
    );
    if (!validUser) {
      throw new UnauthorizedException();
    }
    const payload: JwtPayload = {
      sub: validUser.id,
      username: validUser.username,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      tokenType: 'Bearer',
    };
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { DecksService } from './decks.service';
import { CreateDeckDto } from './dto/create-deck.dto';
import { UpdateDeckDto } from './dto/update-deck.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeckResponseDto } from './dto/response.dto';
import { Deck } from './entities/deck.entity';
import { plainToInstance } from 'class-transformer';

@UseGuards(AuthGuard('jwt'))
@Controller('decks')
export class DecksController {
  constructor(private readonly decksService: DecksService) {}

  @Post()
  async create(
    @Req() req: any,
    @Body() createDeckDto: CreateDeckDto,
  ): Promise<DeckResponseDto> {
    const deck: Promise<Deck> = this.decksService.create(createDeckDto, req.user.id);
    return plainToInstance(DeckResponseDto, deck);
  }

  @Get()
  findAll(@Req() req: any) {
    const decks: Promise<Deck[]> = this.decksService.findAll(req.user.id);
    return plainToInstance(DeckResponseDto, decks);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: any) {
    const deck: Promise<Deck> = this.decksService.findOne(id, req.user.id);
    return plainToInstance(DeckResponseDto, deck);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Req() req: any,
    @Body() updateDeckDto: UpdateDeckDto,
  ) {
    const deck: Promise<Deck> = this.decksService.update(id, updateDeckDto, req.user.id);
    return plainToInstance(DeckResponseDto, deck);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: any,) {
    const deck: Promise<Deck> = this.decksService.remove(id, req.user.id);
    return plainToInstance(DeckResponseDto, deck);
  }
}

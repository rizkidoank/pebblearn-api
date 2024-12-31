import { Deck } from 'src/decks/entities/deck.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Flashcard extends BaseEntity {
  @Column()
  front: string;

  @Column()
  back: string;

  @ManyToOne(() => Deck, (deck) => deck.flashcards, { onDelete: 'CASCADE' })
  deck: Deck;
}

import { Deck } from 'src/decks/entities/deck.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(() => Deck, (deck) => deck.category)
  decks: Deck[];
}

import { Deck } from 'src/decks/entities/deck.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Deck, (deck) => deck.user)
  decks: Deck[];
}

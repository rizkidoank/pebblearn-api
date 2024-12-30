import { Category } from 'src/categories/entities/category.entity';
import { BaseEntity } from 'src/shared/entities/base.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Deck extends BaseEntity {
  @Column()
  title: string;

  @ManyToOne(() => User, (user) => user.decks, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Category, (category) => category.decks, {
    onDelete: 'SET NULL',
  })
  category: Category;
}

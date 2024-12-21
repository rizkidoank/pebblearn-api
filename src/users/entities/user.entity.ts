import { BaseEntity } from 'src/shared/entities/base.entity';
import { Column } from 'typeorm';

export class User extends BaseEntity {
  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}

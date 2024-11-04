import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Base } from '../../../common/entity/base.entity';
import { Posts } from '../../posts/entity/post.entity';

@Entity({ name: 'users' })
export class Users extends Base {
  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar', nullable: false })
  firstName: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar', nullable: false })
  lastName: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar', nullable: false })
  email: string;

  @ApiProperty()
  @Expose()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'date', default: new Date() })
  createdAt: Date;

  @ApiProperty()
  @Expose()
  @Column({ type: 'date', default: new Date() })
  updatedAt: Date;

  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar' })
  accountId: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar' })
  provider: string;

  @ApiProperty()
  @Expose()
  @Column({ type: 'varchar', nullable: false })
  picture: string;

  @ApiProperty()
  @Expose()
  @OneToMany(() => Posts, (p) => p.user)
  posts!: Posts[]
}

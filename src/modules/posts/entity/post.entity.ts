import { Users } from '../../users/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Base } from '../../../common/entity/base.entity';

@Entity({ name: 'posts' })
export class Posts extends Base {
    @ApiProperty()
    @Expose()
    @Column({ type: 'varchar' })
    title: string;

    @Expose()
    @ApiProperty()
    @Column({ type: "varchar" })
    content: string;

    @ApiProperty()
    @ManyToOne(() => Users, (u) => u.posts)
    @Exclude()
    user!: Users;
}
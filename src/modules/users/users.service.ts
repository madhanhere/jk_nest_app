import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


import {
  IUser,
} from '@interface/users';
import { Users } from './entity/user.entity';
import { ERRORS } from '../../common/messages/error';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>
  ) {}

  async findUserById(id: string): Promise<Users> {
    const user = await this.usersRepository.findOne({
      where: {
        id: id,
  
      },
      relations: ['posts'],
    });

    if (!user) {
      throw new HttpException(
        ERRORS.USERS.NOTFOUND,
        HttpStatus.EXPECTATION_FAILED,
      );
    }

    return user;
  }

  async getUserAccount(user: IUser): Promise<Users | null> {
    // const userDetails = await this.usersRepository
    //   .createQueryBuilder('u')
    //   .leftJoinAndSelect('u.posts', 'posts')
    //   .where(`u.id = :id`, { id: user.id })
    //   .getOne();

    const userDetails = await this.usersRepository.findOne({ where: { id: user.id }});
    return userDetails;
  }


}

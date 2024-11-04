import { AuthGuard } from '../../guards/auth.guards';
import {
  Controller,
  Get,
  Param,
  UseGuards
} from '@nestjs/common';

import { IUser } from '@interface/users';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../decorator/user.decorator';
import { Users } from './entity/user.entity';
import { UsersService } from './users.service';

@ApiTags('user')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiCreatedResponse({
    description: 'logged in user profile',
    type: Users,
  })
  @UseGuards(AuthGuard)
  // @Serialize(Users) TODO: uncomment this once created custom Serialize
  @Get()
  async getUserProfile(@User() user: IUser,):Promise<Users> {
    const profile = await this.userService.getUserAccount(user);
    return profile
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<Users> {
    const users = await this.userService.findUserById(id );

    return users;
  }

}

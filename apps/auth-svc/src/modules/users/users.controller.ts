import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserModel } from './interfaces/users.interface';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      user: await this.usersService.findOne(id),
    };
  }

  @Post()
  saveUser(@Body() userDTO: CreateUserDto) {
    return this.usersService.saveUser(userDTO as IUserModel);
  }

  @Put(':id')
  updateUser(@Body() userDTO: UpdateUserDto, @Param('id') id: string) {
    return this.usersService.update(userDTO as IUserModel, { id });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.permanentlyDelete(id);
  }

  @Delete('/soft/:id')
  softDeleteUser(@Param('id') id: string) {
    return this.usersService.softDelete(id);
  }
}

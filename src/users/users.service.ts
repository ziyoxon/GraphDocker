import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }
  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find()  // Return all users from the database;
  }

  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });  // Return a single user by their ID;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await this.usersRepository.update({ id }, updateUserDto);  // Update a user by their ID;
    return this.findOne(id);  // Return the updated user;
  }

  async remove(id: number) {
    await this.usersRepository.delete({ id });  // Delete a user by their ID;
    return id;
  }
}

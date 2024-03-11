import * as bcrypt from 'bcryptjs';
import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findAll() {
    return await this.usersRepository.find({});
  }

  async create(createUserDto: CreateUserDto) {
    await this.validateUserEmailExists(createUserDto.email);
    return this.usersRepository.create({
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({ email });
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid)
        throw new UnauthorizedException('Invalid creadentials');
      return user;
    } catch (error) {
      // User not found
      throw new UnauthorizedException('Invalid creadentials');
    }
  }

  async validateUserEmailExists(email: string) {
    try {
      await this.usersRepository.findOne({ email });
    } catch (error) {
      // User not found
      return;
    }
    // User already exists
    throw new UnprocessableEntityException('email already exists');
  }

  async validateUserById(_id: string) {
    return await this.usersRepository.findOne({ _id });
  }
}

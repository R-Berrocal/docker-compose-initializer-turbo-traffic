import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/user.dto';

@Injectable()
export class AppService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async createUser(createUserDto: CreateUserDto) {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findAll() {
    return this.userModel.find();
  }
}

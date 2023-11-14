import { Controller, Get } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { CreateUserDto } from './dtos/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'create_user' })
  crateUser(createUserDto: CreateUserDto) {
    return this.appService.createUser(createUserDto);
  }

  @Get('/users')
  findAll() {
    return this.appService.findAll();
  }
}

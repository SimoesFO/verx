import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("It's working")
@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '🚀 Back-end is working!';
  }
}

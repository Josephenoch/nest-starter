import { Controller, Get, Headers } from '@nestjs/common';

@Controller('/')
export class AppController {
  @Get()
  getHello(@Headers() header: any) {
    console.log(header);
    return 'Hello World';
  }
}

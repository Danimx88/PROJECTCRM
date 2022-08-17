import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { AutheService } from './authe/authe.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,private authService: AutheService) {}
  
  @UseGuards(AuthGuard('local'))
  @Post('login2')
  async login(@Request() req) {
    return this.authService.login2(req.user);
  }

}

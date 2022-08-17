import { Body, Controller, Post } from '@nestjs/common';
import { LoginStatus, LoginUserDto } from 'src/agnoruser/dto/agnoruser.dto';
import { AutheService } from './authe.service';

@Controller('authe')
export class AutheController {

    constructor(private readonly authService:AutheService) {}

}

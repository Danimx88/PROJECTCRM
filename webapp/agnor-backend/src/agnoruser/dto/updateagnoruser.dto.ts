import { PartialType } from '@nestjs/mapped-types';
import { UserDto } from './agnoruser.dto';


export class UpdateUserDto extends PartialType(UserDto) {}
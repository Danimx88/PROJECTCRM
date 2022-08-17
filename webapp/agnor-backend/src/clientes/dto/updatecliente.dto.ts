import { PartialType } from '@nestjs/mapped-types';
import { ClienteDto } from './cliente.dto';

export class UpdateClienteDto extends PartialType(ClienteDto) {}
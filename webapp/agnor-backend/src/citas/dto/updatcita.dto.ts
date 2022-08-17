import { PartialType } from '@nestjs/mapped-types';
import { CitaDto } from './cita.dto';

export class UpdateCitaDto extends PartialType(CitaDto) {}
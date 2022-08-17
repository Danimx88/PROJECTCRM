import { Module } from '@nestjs/common';
import { Citas } from './model/cita.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CitasController } from './citas.controller';
import { CitasService } from './citas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Citas])],
    exports: [TypeOrmModule],
    controllers: [CitasController],
    providers: [CitasService],
})
export class CitasModule {}

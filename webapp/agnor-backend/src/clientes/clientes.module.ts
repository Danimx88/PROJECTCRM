import { Module, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientesController } from './clientes.controller';
import { ClientesService } from './clientes.service';
import { Cliente } from './model/cliente.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    exports: [TypeOrmModule],
    controllers: [ClientesController],
    providers: [ClientesService, Logger],
})
export class ClientesModule {}

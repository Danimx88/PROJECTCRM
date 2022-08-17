import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Cliente } from './clientes/model/cliente.entity';
import { ClientesModule } from './clientes/clientes.module';
import { CitasModule } from './citas/citas.module';
import { Citas } from './citas/model/cita.entity';
import { AgnoruserController } from './agnoruser/agnoruser.controller';
import { AgnoruserService } from './agnoruser/agnoruser.service';
import { AgnoruserModule } from './agnoruser/agnoruser.module';
import { CommonModule } from './common/common.module';
import { AgnorUser } from './agnoruser/model/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { AutheModule } from './authe/authe.module';



@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}, ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '212.1.211.1',
      port: 3306,
      username: 'u152717637_karenpechir',
      password: 'P@$$W0rd',
      database: 'u152717637_agnorcrm',
      entities: [Cliente, Citas, AgnorUser], 
      synchronize: false,
      
    }),
   
    ClientesModule,
    CitasModule,
    AgnoruserModule,
    CommonModule,
    AutheModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtModule, JwtService],
})
export class AppModule {}

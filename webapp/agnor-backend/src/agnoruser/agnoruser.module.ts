import { Logger, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AgnoruserController } from './agnoruser.controller';
import { AgnoruserService } from './agnoruser.service';
import { AgnorUser } from './model/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([AgnorUser]), JwtModule,],
    exports: [AgnoruserService, TypeOrmModule],
    controllers: [AgnoruserController],
    providers: [AgnoruserService, Logger],
})
export class AgnoruserModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AgnoruserModule } from 'src/agnoruser/agnoruser.module';
import { AutheController } from './authe.controller';
import { AutheService } from './authe.service';
import { jwtConstants, JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
    imports: [
        AgnoruserModule,
        PassportModule.register({
            defaultStrategy: 'jwt',
            property: 'user',
            session: false,
        }),
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '1d' }
        }),
    ],
    controllers: [AutheController],
    providers: [AutheService, JwtStrategy, LocalStrategy],
    exports: [
        PassportModule, LocalStrategy, AutheService
    ],
})
export class AutheModule { }

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AgnoruserService } from 'src/agnoruser/agnoruser.service';



@Injectable()
export class AutheService {
    constructor(private readonly usersService: AgnoruserService, private readonly jwtService: JwtService,) { }

    async validateUser2(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne2(username);
        console.log(user);
        if (user && (await this.passwordsAreEqual2(user.contrasena, pass))) {
            const { contrasena, ...result } = user;
            return result;
        }
        return null;
    }

    async login2(user: any) {
        const payload = { usuario: user.usuario, sub: user.id, name: user.nombre+' '+user.apellidos, grupo: user.grupo, rol: user.rol};
        console.log(this.jwtService.sign(payload))
        return {
            access_token: this.jwtService.sign(payload)
        };
    }

    private async passwordsAreEqual2(hashedPassword: string, plainPassword: string): Promise<boolean> {
        return await (plainPassword === hashedPassword);
    }
}


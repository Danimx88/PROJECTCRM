import {  IsNotEmpty } from 'class-validator';
import { AgnorUser } from '../model/user.entity';

export class UserDto{
    id: number;
    usuario: string;
    correo: string;
    nombre: string;
    apellidos: string;
    edad: number;
    telefono: number;
    contrasena: string;
    ultimasesion: number;
    sesionfecha: number;
    grupo: number;
    coordinador: string;
    uinmuebles24: string;
    cinmuebles24: string;
    uvivanuncios: string;
    cvivanuncios: string;
    rol: string;
}

export class LoginUserDto {  
    @IsNotEmpty()  readonly usuario: string;
    @IsNotEmpty()  readonly contrasena: string;
}

export interface LoginStatus {
    usuario: string;
    accessToken: any;
    expiresIn: any;
  }

  export const toUserDto = (data: AgnorUser): UserDto => {
    const { id, usuario, correo, nombre,apellidos,edad,telefono,contrasena,ultimasesion,sesionfecha,
        grupo,coordinador,uinmuebles24,cinmuebles24,uvivanuncios, cvivanuncios, rol } = data;
  
    let userDto: UserDto = {
        id,
        usuario,
        correo,
        nombre,
        apellidos,
        edad,
        telefono,
        contrasena,
        ultimasesion,
        sesionfecha,
        grupo,
        coordinador,
        uinmuebles24,
        cinmuebles24,
        uvivanuncios,
        cvivanuncios,
        rol,
    };
  
    return userDto;
  };
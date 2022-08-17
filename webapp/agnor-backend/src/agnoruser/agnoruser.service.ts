import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable, map } from 'rxjs';
import { Repository, Like } from 'typeorm';
import { LoginUserDto, toUserDto, UserDto } from './dto/agnoruser.dto';
import { UpdateUserDto } from './dto/updateagnoruser.dto';
import { AgnoruserI } from './interface/agnoruser.interface';
import { AgnorUser } from './model/user.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AgnoruserService {

    constructor(
        @InjectRepository(AgnorUser) private userRepository: Repository<AgnorUser>, 
    ) {}

// Get all objects
async findAll(): Promise<AgnorUser[]> {
    const users = await this.userRepository.find();
    return users;
  }

paginate(options: IPaginationOptions): Observable<Pagination<AgnorUser>> {
  return from(paginate<AgnorUser>(this.userRepository, options)).pipe(
    map((clientesageable: Pagination<AgnorUser>) => {
       
        return clientesageable;
    })
)
}

paginateFilterByName(options: IPaginationOptions, user: AgnoruserI): Observable<Pagination<AgnoruserI>>{
  return from(this.userRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: {id: "DESC"},
      select: ['id', 'usuario', 'correo','nombre','apellidos','edad','telefono','contrasena',
      'ultimasesion','sesionfecha','grupo','coordinador','uinmuebles24','cinmuebles24','uvivanuncios','cvivanuncios',],
      where: [
          { usuario: Like(`%${user.usuario}%`)}
      ]
  })).pipe(
      map(([user, totalUsuarios]) => {
          const usuariosPageable: Pagination<AgnoruserI> = {
              items: user,
              links: {
                  first: options.route + `?limit=${options.limit}`,
                  previous: options.route + ``,
                  next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
                  last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalUsuarios / Number(options.limit))}`
              },
              meta: {
                  currentPage: Number(options.page),
                  itemCount: user.length,
                  itemsPerPage: Number(options.limit),
                  totalItems: totalUsuarios,
                  totalPages: Math.ceil(totalUsuarios / Number(options.limit))
              }
          };              
          return usuariosPageable;
      })
  )
}

// Get a single objects
async getUser(idUser: string): Promise<AgnorUser> {
    const usuario = await this.userRepository.findOne({where: {id: parseInt(idUser)}}); 
    if (!usuario) throw new NotFoundException('Este usuario no existe');
    return usuario;
}

async getOneUser(username: string): Promise<AgnorUser> {
    const usuario = await this.userRepository.findOne({where: {usuario: username}}); 
    if (!usuario) throw new NotFoundException('Este usuario no existe');
    return usuario;
}

// Create a single object
async createUser(userDto: UserDto): Promise<AgnorUser> {
    const newUser = await this.userRepository.save({
        usuario: userDto.usuario,
        correo: userDto.correo,
        nombre: userDto.nombre,
        apellidos: userDto.apellidos,
        edad: userDto.edad,
        telefono: userDto.telefono,
        contrasena: userDto.contrasena,
        ultimasesion: userDto.ultimasesion,
        sesionfecha: userDto.sesionfecha,
        grupo: userDto.grupo,
        coordinador: userDto.coordinador,
        uinmuebles24: userDto.uinmuebles24,
        cinmuebles24: userDto.cinmuebles24,
        uvivanuncios: userDto.uvivanuncios,
        cvivanuncios: userDto.cvivanuncios,
      });
      return newUser;
}

// Delete a object
async deleteUser(idUser: string): Promise<void> {
    const userExist = await this.userRepository.findOne({where: {id: parseInt(idUser)}});
      if (!userExist) throw new NotFoundException('Este usuario no existe');
  
      await this.userRepository.delete(userExist);
}

// Update a single objects
async updateUser(idUser: string, updateUserDto: Partial<UpdateUserDto>) {
    const userExist = await this.userRepository.findOne({where: {id: parseInt(idUser)}});
    if (!userExist) throw new NotFoundException('Este cliente no existe');
    const updatedUser = Object.assign(userExist, updateUserDto);
    return await this.userRepository.save(updatedUser);
  }

  //-----------------------Login-----------------
  async findByLogin({ usuario, contrasena }: LoginUserDto): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { usuario } });
    if (!user) {
      throw new HttpException('Usuario no encontrado', HttpStatus.UNAUTHORIZED);
    }
    // compare passwords
    const areEqual = await this.comparePasswordss(user.contrasena, contrasena);
    if (!areEqual) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    return toUserDto(user);
  }

  async findByPayload({ usaurio }: any): Promise<UserDto> {
    return await this.findOne({ where: { usaurio } });
  }

  comparePassword(newPassword: string, passwordHash: string) {
    if (newPassword===passwordHash) {
        return true
    } else {
        return false
    }
    //from(newPassword. (passwordHash));


  



    //------------------------>End<---------------------------
}

async findOne2(usuario: string): Promise<AgnorUser | undefined> {
  return await this.userRepository.findOne({ where: { usuario } });
}

comparePasswordss(newPassword: string, passwordHash: string): Observable<any>{
  return from(newPassword.match(passwordHash))
  //from(newPassword. (passwordHash));
}
async findOne(options?: object): Promise<UserDto> {
    const user = await this.userRepository.findOne(options);
    return toUserDto(user);
  }
}

export const comparePasswords = async (userPassword, currentPassword) => {
  bcrypt.passwordHash(userPassword)
  return await bcrypt.compare(currentPassword, userPassword);
};
import { Body, Controller, Get, HttpStatus, Logger, NotFoundException, Param, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/authe/guards/jwt-guards';
import { AgnoruserService } from './agnoruser.service';
import { UserDto } from './dto/agnoruser.dto';
import { UpdateUserDto } from './dto/updateagnoruser.dto';
import { AgnoruserI } from './interface/agnoruser.interface';

@Controller('api/usuarios')
export class AgnoruserController {
  constructor(private readonly userService: AgnoruserService, private readonly _logger: Logger,) { }

  // GET all objects
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('usuario') usuario: string
  ): Observable<Pagination<AgnoruserI>> {
    limit = limit > 100 ? 100 : limit;
    if (usuario === null || usuario === undefined) {
      return this.userService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/usuarios' });
    } else {
      return this.userService.paginateFilterByName(
        { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/usuarios' },
        { usuario }
      )
    }
  }

  // GET a single object
  // @UseGuards(JwtAuthGuard)
  @Get('/:idUsuario')
  async getOneCliente(@Res() res, @Param('idUsuario') idUsuario) {
    const usuario = await this.userService.getUser(idUsuario);
    if (!usuario) throw new NotFoundException('Usuario no existe!');
    return res.status(HttpStatus.OK).json(usuario);
  }

  //Create a new Cliente
  // @UseGuards(JwtAuthGuard)
  @Post('/new')
  createCliente(@Body() userDto: UserDto) {
    return this.userService.createUser(userDto);
  }

  //Update a Cliente
  // @UseGuards(JwtAuthGuard)
  @Patch('/:idUsuario')
  updateCliente(@Param('idUsuario') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }
}

import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, Patch, Post, Put, Query, Res, UseGuards } from '@nestjs/common';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/authe/guards/jwt-guards';
import { CitasService } from './citas.service';
import { CitaDto } from './dto/cita.dto';
import { UpdateCitaDto } from './dto/updatcita.dto';
import { CitaI } from './interface/cita.interface';
import { Citas } from './model/cita.entity';

@Controller('api/citas')
export class CitasController {

  constructor(private readonly citaService: CitasService) { }

  // GET all objects
  // @UseGuards(JwtAuthGuard)
  @Get('/')
  index(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('titulo') titulo: string
  ): Observable<Pagination<CitaI>> {
    limit = limit > 100 ? 100 : limit;
    if (titulo === null || titulo === undefined) {
      return this.citaService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/citas' });
    } else {
      return this.citaService.paginateFilterByName(
        { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/citas' },
        { titulo }
      )
    }
  }
  // GET a single object
  // @UseGuards(JwtAuthGuard)
  @Get('/:idCitas')
  async getOneCitas(@Res() res, @Param('idCitas') idCitas) {
    const cita = await this.citaService.getCita(idCitas);
    if (!cita) throw new NotFoundException('Cita no existe!');
    return res.status(HttpStatus.OK).json(cita);
  }

  //Create a new Object
  // @UseGuards(JwtAuthGuard)
  @Post('/create')
  createCitas(@Body() citaDto: CitaDto) {
    return this.citaService.createCita(citaDto);
  }

  //Update a Object
  // @UseGuards(JwtAuthGuard)
  @Put(':id/update')
    async updateCita(@Param('id') id, @Body() cita: Citas): Promise<any> {
        
      cita.id = Number(id);
        return this.citaService.updateCita(cita);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.citaService.deleteCita(id);
    }

}

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { from, Observable, map } from 'rxjs';
import { Repository, Like, DeleteResult, UpdateResult } from 'typeorm';
import { CitaDto } from './dto/cita.dto';

import { CitaI } from './interface/cita.interface';
import { Citas } from './model/cita.entity';

@Injectable()
export class CitasService {

  constructor(@InjectRepository(Citas) private citaRepository: Repository<Citas>,) { }

  // Get all objects
  async findAll(): Promise<Citas[]> {
    const citas = await this.citaRepository.find();
    return citas;
  }

  paginate(options: IPaginationOptions): Observable<Pagination<Citas>> {
    return from(paginate<Citas>(this.citaRepository, options,{
      order: {
        ['id']: 'DESC',
      }})).pipe(
      map((citasPageable: Pagination<Citas>) => {
        return citasPageable;
      })
    )
  }

  paginateFilterByName(options: IPaginationOptions, cita: CitaI): Observable<Pagination<CitaI>> {
    return from(this.citaRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'idcontacto', 'titulo', 'descripcion', 'fecha', 'estado',
        'grupo', 'fecha_registro', 'seguimiento', 'elaborado', 'tipodecita', 'apoyos', 'direccioncit',],
      where: [
        { titulo: Like(`%${cita.titulo}%`) }
      ]
    })).pipe(
      map(([citas, totalCitas]) => {
        const citasPageable: Pagination<CitaI> = {
          items: citas,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalCitas / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: citas.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalCitas,
            totalPages: Math.ceil(totalCitas / Number(options.limit))
          }
        };
        return citasPageable;
      })
    )
  }


  // Get a single objects
  async getCita(idCita: string): Promise<Citas> {
    const cita = await this.citaRepository.findOne({ where: { id: parseInt(idCita) } });
    if (!cita) throw new NotFoundException('Esta cita no existe');
    return cita;
  }

  // Create a single object
  async createCita(citaDto: CitaDto): Promise<Citas> {
    const newCita = await this.citaRepository.save({
      idcontacto: citaDto.idcontacto,
      titulo: citaDto.titulo,
      descripcion: citaDto.descripcion,
      fecha: citaDto.fecha,
      estado: citaDto.estado,
      grupo: citaDto.grupo,
      fecha_registro: citaDto.fecha_registro,
      seguimiento: citaDto.seguimiento,
      elaborado: citaDto.elaborado,
      tipodecita: citaDto.tipodecita,
      apoyos: citaDto.apoyos,
      direccioncit: citaDto.direccioncit,
    });
    return newCita;
  }

  // Delete a object
  async deleteCita(idCita): Promise<DeleteResult> {
  
   return await this.citaRepository.delete(idCita);
  }

  // Update a single objects
  async updateCita(cita: Citas): Promise<UpdateResult> {

    return await this.citaRepository.update(cita.id, cita)
  }

}

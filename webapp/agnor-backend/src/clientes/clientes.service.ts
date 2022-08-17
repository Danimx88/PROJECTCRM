import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageRequest } from 'src/common/models/pagination/page-request.model';
import { Page } from 'src/common/models/pagination/page.model';
import { Repository, Like, UpdateResult, DeleteResult } from 'typeorm';
import { ClienteDto } from './dto/cliente.dto';

import { Cliente } from './model/cliente.entity';
import { ClienteI } from './interface/cliente.interface';


import {
  IPaginationLinks,
  IPaginationMeta,
  paginate,
  Pagination,
  IPaginationOptions as IPaginationOptionsBase,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { from, map, Observable } from 'rxjs';





@Injectable()
export class ClientesService {

  constructor(@InjectRepository(Cliente) private clienteRepository: Repository<Cliente>,) { }


    // Update a single objects
    async updateCliente(cliente: Cliente): Promise<UpdateResult> {

      return await this.clienteRepository.update(cliente.id, cliente)
    }
  
  // Get all objects
  async findAll(): Promise<Cliente[]> {
    const clientes = await this.clienteRepository.find();
    return clientes;
  }

  paginate(options: IPaginationOptions): Observable<Pagination<Cliente>> {
    return from(paginate<Cliente>(this.clienteRepository, options,{
      order: {
        ['id']: 'DESC',
      }})).pipe(
      map((clientesageable: Pagination<Cliente>) => {

        return clientesageable;
      })
    )
  }
  paginate2(options: IPaginationOptions, cliente: ClienteI): Observable<Pagination<ClienteI>> {
    return from(this.clienteRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'nombre', 'departamento', 'edad', 'fecha_registro', 'clasificacion', 'estado',
        'apellidos', 'telefono1', 'telefono2', 'correo', 'tipoanuncio', 'lineanegocio', 'tipopropiedad', 'fechaentrada',
        'notas', 'semaforo', 'asignadoa', 'tiempoasignado', 'grupo', 'formadepago', 'montocliente', 'rangoprecios',],
      where: [
        { grupo: Like(`%${cliente.grupo}%`) }]
    })).pipe(
      map(([clientes, totalClientes]) => {
        const clientesageable: Pagination<ClienteI> = {
          items: clientes,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalClientes / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clientes.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClientes,
            totalPages: Math.ceil(totalClientes / Number(options.limit))
          }
        };
        return clientesageable;
      })
    )
  }
  paginate3(options: IPaginationOptions, cliente: ClienteI): Observable<Pagination<ClienteI>> {
    return from(this.clienteRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'nombre', 'departamento', 'edad', 'fecha_registro', 'clasificacion', 'estado',
        'apellidos', 'telefono1', 'telefono2', 'correo', 'tipoanuncio', 'lineanegocio', 'tipopropiedad', 'fechaentrada',
        'notas', 'semaforo', 'asignadoa', 'tiempoasignado', 'grupo', 'formadepago', 'montocliente', 'rangoprecios',],
      where: [
        { asignadoa: Like(`%${cliente.asignadoa}%`) }
      ]
    })).pipe(
      map(([clientes, totalClientes]) => {
        const clientesageable: Pagination<ClienteI> = {
          items: clientes,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalClientes / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clientes.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClientes,
            totalPages: Math.ceil(totalClientes / Number(options.limit))
          }
        };
        return clientesageable;
      })
    )
  }

  // async paginate(options: IPaginationOptions): Promise<Pagination<Cliente>> {
  //   const queryBuilder = this.clienteRepository.createQueryBuilder('c');
  //   queryBuilder.orderBy('c.id', 'DESC'); // Or whatever you need to do

  //   return from(paginate<Cliente>(this.clienteRepository, options)).pipe(
  //         map((clientesageable: Pagination<Cliente>) => {
  //           return clientesageable;
  //         })
  //       )
  //     }

  paginateFilterByName(options: IPaginationOptions, cliente: ClienteI): Observable<Pagination<ClienteI>> {
    return from(this.clienteRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'nombre', 'departamento', 'edad', 'fecha_registro', 'clasificacion', 'estado',
        'apellidos', 'telefono1', 'telefono2', 'correo', 'tipoanuncio', 'lineanegocio', 'tipopropiedad', 'fechaentrada',
        'notas', 'semaforo', 'asignadoa', 'tiempoasignado', 'grupo', 'formadepago', 'montocliente', 'rangoprecios',],
      where: [
        { nombre: Like(`%${cliente.nombre}%`) }, { apellidos: Like(`%${cliente.nombre}%`) }
      ]
    })).pipe(
      map(([clientes, totalClientes]) => {
        const clientesageable: Pagination<ClienteI> = {
          items: clientes,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalClientes / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clientes.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClientes,
            totalPages: Math.ceil(totalClientes / Number(options.limit))
          }
        };
        return clientesageable;
      })
    )
  }

  paginateFilterByName2(options: IPaginationOptions, cliente: ClienteI, cliente2: ClienteI): Observable<Pagination<ClienteI>> {
    return from(this.clienteRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'nombre', 'departamento', 'edad', 'fecha_registro', 'clasificacion', 'estado',
        'apellidos', 'telefono1', 'telefono2', 'correo', 'tipoanuncio', 'lineanegocio', 'tipopropiedad', 'fechaentrada',
        'notas', 'semaforo', 'asignadoa', 'tiempoasignado', 'grupo', 'formadepago', 'montocliente', 'rangoprecios',],
      where: [
        { nombre: Like(`%${cliente.nombre}%`) }, { apellidos: Like(`%${cliente.nombre}%`), }, { grupo: Like(`%${cliente2.grupo}%`) }
      ]
    })).pipe(
      map(([clientes, totalClientes]) => {
        const clientesageable: Pagination<ClienteI> = {
          items: clientes,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalClientes / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clientes.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClientes,
            totalPages: Math.ceil(totalClientes / Number(options.limit))
          }
        };
        return clientesageable;
      })
    )
  }

  paginateFilterByName3(options: IPaginationOptions, cliente: ClienteI, cliente2: ClienteI): Observable<Pagination<ClienteI>> {
    return from(this.clienteRepository.findAndCount({
      skip: Number(options.page) * Number(options.limit) || 0,
      take: Number(options.limit) || 10,
      order: { id: "DESC" },
      select: ['id', 'nombre', 'departamento', 'edad', 'fecha_registro', 'clasificacion', 'estado',
        'apellidos', 'telefono1', 'telefono2', 'correo', 'tipoanuncio', 'lineanegocio', 'tipopropiedad', 'fechaentrada',
        'notas', 'semaforo', 'asignadoa', 'tiempoasignado', 'grupo', 'formadepago', 'montocliente', 'rangoprecios',],
      where: [
        { nombre: Like(`%${cliente.nombre}%`) }, { apellidos: Like(`%${cliente.nombre}%`) }, { asignadoa: Like(`%${cliente2.asignadoa}%`) }
      ]
    })).pipe(
      map(([clientes, totalClientes]) => {
        const clientesageable: Pagination<ClienteI> = {
          items: clientes,
          links: {
            first: options.route + `?limit=${options.limit}`,
            previous: options.route + ``,
            next: options.route + `?limit=${options.limit}&page=${Number(options.page) + 1}`,
            last: options.route + `?limit=${options.limit}&page=${Math.ceil(totalClientes / Number(options.limit))}`
          },
          meta: {
            currentPage: Number(options.page),
            itemCount: clientes.length,
            itemsPerPage: Number(options.limit),
            totalItems: totalClientes,
            totalPages: Math.ceil(totalClientes / Number(options.limit))
          }
        };
        return clientesageable;
      })
    )
  }

  // Get a single objects
  async getCliente(idCliente: number): Promise<Cliente> {
    const cliente = await this.clienteRepository.findOne({ where: { id: idCliente } });
    if (!cliente) throw new NotFoundException('Este cliente no existe');
    return cliente;
  }

  public async getAllClientesByPage(pageRequest: PageRequest): Promise<Page<Cliente>> {
    const sort: { [key: string]: string } = pageRequest.sort.asKeyValue();
    const result = await this.clienteRepository.findAndCount({
      order: sort,
      skip: ((pageRequest.page - 1) * pageRequest.size),
      take: pageRequest.size
    });
    return Page.from(result[0], result[1], pageRequest);
  }

  // Create a single object
  async createCliente(clienteDto: ClienteDto): Promise<Cliente> {
    const newCliente = await this.clienteRepository.save({
      nombre: clienteDto.nombre,
      departamento: clienteDto.departamento,
      edad: clienteDto.edad,
      fecha_registro: clienteDto.fecha_registro,
      clasificacion: clienteDto.clasificacion,
      estado: clienteDto.estado,
      apellidos: clienteDto.apellidos,
      telefono1: clienteDto.telefono1,
      telefono2: clienteDto.telefono2,
      correo: clienteDto.correo,
      tipoanuncio: clienteDto.tipoanuncio,
      lineanegocio: clienteDto.lineanegocio,
      tipopropiedad: clienteDto.tipopropiedad,
      fechaentrada: clienteDto.fechaentrada,
      notas: clienteDto.notas,
      semaforo: clienteDto.semaforo,
      asignadoa: clienteDto.asignadoa,
      tiempoasignado: clienteDto.tiempoasignado,
      grupo: clienteDto.grupo,
      formadepago: clienteDto.formadepago,
      montocliente: clienteDto.montocliente,
      rangoprecios: clienteDto.rangoprecios,
    });
    return newCliente;
  }

  // Delete a object
  async deleteCliente(idCliente): Promise<DeleteResult> {
    return await this.clienteRepository.delete(idCliente);
}


}

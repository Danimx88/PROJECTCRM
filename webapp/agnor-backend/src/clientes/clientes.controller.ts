import { Body, Controller, Delete, Get, HttpStatus, Logger, NotFoundException, Param, Patch, Post, Put, Query, Res, UseGuards, } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClienteI } from './interface/cliente.interface';
import { ClienteDto } from './dto/cliente.dto';
import { UpdateClienteDto } from './dto/updatecliente.dto';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { JwtAuthGuard } from 'src/authe/guards/jwt-guards';
import { Cliente } from './model/cliente.entity';

@Controller('api/clientes')
export class ClientesController {

    constructor(private readonly clienteService: ClientesService, private readonly _logger: Logger,) { }

    // @UseGuards(JwtAuthGuard)
    @Get('/')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('nombre') nombre: string
    ): Observable<Pagination<ClienteI>> {

        limit = limit > 100 ? 100 : limit;
        if (nombre === null || nombre === undefined) {
            return this.clienteService.paginate({ page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes' });
        } else {
            return this.clienteService.paginateFilterByName(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes' },
                { nombre }
            )
        }
    }

    @Get('/coordinador')
    indexc(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('nombre') nombre: string,
        @Query('grupo') grupo: string
    ): Observable<Pagination<ClienteI>> {

        limit = limit > 100 ? 100 : limit;
        if (nombre === null || nombre === undefined) {
            return this.clienteService.paginate2(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes/coordinador' },
                { grupo }
            )
        } else {
            return this.clienteService.paginateFilterByName2(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes' },
                { nombre }, { grupo }
            )
        }
    }

    @Get('/asesor')
    indexa(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('nombre') nombre: string,
        @Query('asignadoa') asignadoa: string
    ): Observable<Pagination<ClienteI>> {

        limit = limit > 100 ? 100 : limit;
        if (nombre === null || nombre === undefined) {
            return this.clienteService.paginate3(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes/asesor' },
                { asignadoa }
            )
        } else {
            return this.clienteService.paginateFilterByName3(
                { page: Number(page), limit: Number(limit), route: 'http://localhost:3000/api/clientes' },
                { nombre }, { asignadoa }
            )
        }
    }

    @Get('/all')
    async getAllClientes(@Res() res) {
        const clientes = await this.clienteService.findAll();
        return res.status(HttpStatus.OK).json(clientes);
    }

    // @Get('/')
    // public async getAllClientesByPage(
    //     @Query('pageNumber') pageNumber: number = 1,
    //     @Query('pageSize') pageSize: number = 10,
    //     @Query('sortCol') sortCol: string = 'id',
    //     @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING): Promise<Page<Cliente>> {
    //   try {
    //     const pageRequest: PageRequest = PageRequest.from(pageNumber, pageSize, sortCol, sortDir);
    //     return this.clienteService.getAllClientesByPage(pageRequest);
    //   } catch (error) {
    //     this._logger.error(error);
    //   }
    // }

    // GET a single object
    // @UseGuards(JwtAuthGuard)
    @Get('/:idCliente')
    async getOneCliente(@Res() res, @Param('idCliente') idCliente) {
        const cliente = await this.clienteService.getCliente(idCliente);
        if (!cliente) throw new NotFoundException('Cliente no existe!');
        return res.status(HttpStatus.OK).json(cliente);
    }

    //Create a new Cliente
    // @UseGuards(JwtAuthGuard)
    @Post('/create')
    createCliente(@Body() clienteDto: ClienteDto) {
        return this.clienteService.createCliente(clienteDto);
    }

    //Update a Cliente
    // @UseGuards(JwtAuthGuard)
    @Put(':id/update')
    async updateCliente(@Param('id') id, @Body() cliente: Cliente): Promise<any> {

        cliente.id = Number(id);
        return this.clienteService.updateCliente(cliente);
    }

    @Delete(':id/delete')
    async delete(@Param('id') id): Promise<any> {
        return this.clienteService.deleteCliente(id);
    }

}
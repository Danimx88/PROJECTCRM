import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClienteService } from "../cliente.service";
import { Cliente, ClienteData, ClientesPageable } from '../interface/cliente.interface';
import { merge, Observable, of as observableOf } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { faPen, faTrash, faMagnifyingGlassPlus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ClienteListComponent implements OnInit {

  filterValue: string = null;
  dataSource: ClientesPageable = null;
  usuarioCli: any = this.getDecodedAccessToken(localStorage.getItem('currentUser'))
  cliente: Cliente = {
    nombre: '',
    departamento: '',
    edad: 0,
    fecha_registro: '',
    clasificacion: '',
    estado: '',
    apellidos: '',
    telefono1: 0,
    telefono2: 0,
    correo: '',
    tipoanuncio: '',
    lineanegocio: '',
    tipopropiedad: '',
    fechaentrada: '',
    notas: '',
    semaforo: '',
    asignadoa: '',
    tiempoasignado: '',
    grupo: '',
    formadepago: '',
    montocliente: '',
    rangoprecios: '',
  };
  pageEvent: PageEvent;
  faPen = faPen;
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  displayedColumns: string[] = ['id', 'nombre', 'departamento', 'edad', 'registro', 'clasificación', 'estado', 'operaciones'];

  constructor(private clienteService: ClienteService, private _httpClient: HttpClient) {
  }
  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    if (this.usuarioCli.rol == 'ADMINISTRADOR') {
      this.clienteService.findAll(1, 10).pipe(
        map((clienteData: ClientesPageable) => this.dataSource = clienteData)
      ).subscribe();
    } else if (this.usuarioCli.rol == 'COORDINADOR') {
      const num = this.usuarioCli.grupo;
      const firstStr = String(num).slice(0, 1);
      const inicio= firstStr+'00';
      const final= firstStr + '99'
      
      const firstNum = Number(inicio);
      const lastNum = Number(final);
      console.log(firstNum)
      console.log(lastNum)
      this.clienteService.findAllC(1, 10, firstNum).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    } else if (this.usuarioCli.rol == 'ASESOR') {
      console.log(this.usuarioCli.name)
      this.clienteService.findAllA(1, 10, this.usuarioCli.name).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    }
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    if (this.usuarioCli.rol == 'ADMINISTRADOR') {
      if (this.filterValue == null) {
        page = page + 1;
        this.clienteService.findAll(page, size).pipe(
          map((clienteData: ClienteData) => this.dataSource = clienteData)
        ).subscribe();
      } else {
        this.clienteService.paginateByName(page, size, this.filterValue).pipe(
          map((clienteData: ClienteData) => this.dataSource = clienteData)
        ).subscribe()
      }
    } else if (this.usuarioCli.rol == 'COORDINADOR') {
      const num = this.usuarioCli.grupo;
      const firstStr = String(num).slice(0, 1);
      const inicio= firstStr+'00';
      const final= firstStr + '99'
      
      const firstNum = Number(inicio);
      const lastNum = Number(final);
      console.log(firstNum)
      console.log(lastNum)
      this.clienteService.findAllC(page, size, firstNum).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    } else if (this.usuarioCli.rol == 'ASESOR') {
      console.log(this.usuarioCli.name)
      this.clienteService.findAllA(page, size, this.usuarioCli.name).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    }
  }

  findByName(nombre: string) {
    if (this.usuarioCli.rol == 'ADMINISTRADOR') {
      this.clienteService.paginateByName(0, 10, nombre).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    } else if (this.usuarioCli.rol == 'COORDINADOR') {
      const num = this.usuarioCli.grupo;
      const firstStr = String(num).slice(0, 1);
      const inicio= firstStr+'00';
      const final= firstStr + '99'
      
      const firstNum = Number(inicio);
      const lastNum = Number(final);
      console.log(firstNum)
      console.log(lastNum)
      this.clienteService.paginateByNameCo(0, 10, nombre, firstNum).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    } else if (this.usuarioCli.rol == 'ASESOR') {
      this.clienteService.paginateByNameAs(0, 10, nombre,this.usuarioCli.name).pipe(
        map((clienteData: ClienteData) => this.dataSource = clienteData)
      ).subscribe()
    }
  }

  deleteCliente(id: any): void {
    this.clienteService.deleteCliente(id)
      .subscribe(
        (result) => {
          console.log(result);
          this.initDataSource();
        },
        err => console.log(err)
      )
  }

  getCliente(id: string) {
    this.clienteService.getCliente(id)
      .subscribe(
        next => this.cliente = next,
        err => console.log(err)
      )
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
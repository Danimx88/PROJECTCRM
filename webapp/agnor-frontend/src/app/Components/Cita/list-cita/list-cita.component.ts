import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { faCirclePlus, faMagnifyingGlassPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { ClienteService } from '../../Cliente/cliente.service';
import { CitaService } from '../cita.service';
import { Cita, CitaData, CitasPageable } from '../interface/cita.interface';

@Component({
  selector: 'app-list-cita',
  templateUrl: './list-cita.component.html',
  styleUrls: ['./list-cita.component.css']
})
export class ListCitaComponent implements OnInit {

  filterValue: string = null;
  dataSource: CitasPageable = null;
  cliente: any = {
    nombre: null,
    departamento: null,
    edad: null,
    fecha_registro: null,
    clasificacion: null,
    estado: null,
    apellidos: null,
    telefono1: null,
    telefono2: null,
    correo: null,
    tipoanuncio: null,
    lineanegocio: null,
    tipopropiedad: null,
    fechaentrada: null,
    notas: null,
    semaforo: null,
    asignadoa: null,
    tiempoasignado: null,
    grupo: null,
    formadepago: null,
    montocliente: null,
    rangoprecios: null,
  };
  cita: Cita= {
    idcontacto:null,
    titulo: null,
    descripcion: null,
    fecha: null,
    estado: null,
    grupo:null,
    fecha_registro: null,
    seguimiento: null,
    elaborado: null,
    tipodecita: null,
    apoyos: null,
    direccioncit: null,
  };
  pageEvent: PageEvent;
  faPen = faPen;
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  displayedColumns: string[] = ['id', 'titulo', 'descripcion','fecha','estado','grupo', 'operaciones'];

  constructor(private citaService: CitaService, private _httpClient: HttpClient,private clienteService: ClienteService) { 
  }
  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.citaService.findAll(1, 10).pipe(
      map((citaData: CitasPageable) => this.dataSource = citaData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    if(this.filterValue == null) {
      page = page +1;
      this.citaService.findAll(page, size).pipe(
        map((citaData: CitaData) => this.dataSource = citaData)
      ).subscribe();
    } else {
      this.citaService.paginateByTitulo(page, size, this.filterValue).pipe(
        map((citaData: CitaData) => this.dataSource = citaData)
      ).subscribe()
    }
  }

  findByTitulo(nombre: string) {
    console.log(nombre);
    this.citaService.paginateByTitulo(0, 10, nombre).pipe(
      map((citaData: CitaData) => this.dataSource = citaData)
    ).subscribe()
  }

  deleteCita(id: any): void {
    this.citaService.deleteCita(id)
      .subscribe(
        res => {
          console.log(res);
          this.initDataSource();
        },
        err => console.log(err)
      )
  }

   getCita(id:string){
    this.citaService.getCita(id)
      .subscribe(res => {
       
        this.cita = res;
        this.getCliente(res.idcontacto)
        console.log(this.cliente)
        //this.setValues()
      },
      err => console.log(err)
            
      )
  }

  getCliente(id: any){
    this.clienteService.getCliente(id.toString())
    .subscribe(res => {
      
      this.cliente = res;
      //this.setValues()
    },
    err => console.log(err)
          
    )

  }
   
  }




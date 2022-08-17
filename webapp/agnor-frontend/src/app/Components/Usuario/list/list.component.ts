import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { faCirclePlus, faMagnifyingGlassPlus, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { map } from 'rxjs';
import { UserData, Usuario, UsuariosPageable } from '../interface/user.interface';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListUserComponent implements OnInit {
  filterValue: string = null;
  dataSource: UsuariosPageable = null;
  usuario: Usuario= {
    usuario: '',
    correo: '',
    nombre: '',
    apellidos: '',
    edad: 0,
    telefono: 0,
    contrasena: '',
    ultimasesion: 0,
    sesionfecha: 0,
    grupo: 0,
    coordinador: '',
    uinmuebles24: '',
    cinmuebles24: '',
    uvivanuncios: '',
    cvivanuncios: '',
  };
  pageEvent: PageEvent;
  faPen = faPen;
  faTrash = faTrash;
  faCirclePlus = faCirclePlus;
  faMagnifyingGlassPlus = faMagnifyingGlassPlus;
  displayedColumns: string[] = ['id', 'nombre', 'usuario','correo','edad','telefono','ultimasesion' , 'operaciones']; 

  constructor(private usuarioService: UsuarioService, private _httpClient: HttpClient) { 
  }
  ngOnInit(): void {
    this.initDataSource();
  }

  initDataSource() {
    this.usuarioService.findAll(1, 10).pipe(
      map((usuarioData: UsuariosPageable) => this.dataSource = usuarioData)
    ).subscribe();
  }

  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;
    if(this.filterValue == null) {
      page = page +1;
      this.usuarioService.findAll(page, size).pipe(
        map((usuarioData: UserData) => this.dataSource = usuarioData)
      ).subscribe();
    } else {
      this.usuarioService.paginateByUser(page, size, this.filterValue).pipe(
        map((usuarioData: UserData) => this.dataSource = usuarioData)
      ).subscribe()
    }
  }

  findByName(nombre: string) {
    console.log(nombre);
    this.usuarioService.paginateByUser(0, 10, nombre).pipe(
      map((usuarioData: UserData) => this.dataSource = usuarioData)
    ).subscribe()
  }

  deleteUsuario(id: string): void {
    this.usuarioService.deleteUsuaroio(id)
      .subscribe(
        res => {
          console.log(res);
          this.initDataSource();
        },
        err => console.log(err)
      )
  }

  getUsuario(id:string){
    this.usuarioService.getUsuario(id)
      .subscribe(
        next => this.usuario = next,
        err => console.log(err)
      )
  }

}

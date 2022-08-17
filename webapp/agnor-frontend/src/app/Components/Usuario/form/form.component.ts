import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../interface/user.interface';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormUserComponent implements OnInit {

  usuario: Usuario = {
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
  edit: boolean = false;


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.usuarioService.getUsuario(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.usuario = res;
            this.edit = true;
          },
          err => console.log(err)
        )
    }
  }

  submitUsuario() {
    this.usuarioService.createUsuario(this.usuario)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/usuario']);
        },
        err => console.log(err)
      )
  }

  updateUsuario() {
    this.usuarioService.updateUsuario(this.usuario.id.toString(), this.usuario)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/usuario'])
        },
        err => console.log(err)
      )
  }
}

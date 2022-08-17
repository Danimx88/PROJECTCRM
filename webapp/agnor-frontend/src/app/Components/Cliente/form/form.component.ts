import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../interface/cliente.interface';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export default class ClienteFormComponent implements OnInit, AfterContentInit {
  clienteForm: FormGroup;
  showSpinner = false;
  submitted = false;
  breakpoint: number;

  usuarioAc: any = this.getDecodedAccessToken(localStorage.getItem('currentUser'))
  dateString = new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' });

  cliente: Cliente = {
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
  edit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  ngAfterContentInit(): void {
    console.log(this.edit)
    console.log(Object.keys(this.cliente).length)
  }

  ngOnInit() {

    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 4;
    const params = this.activatedRoute.snapshot.params;
    if (params['id']) {
      this.edit = true;
      this.clienteService.getCliente(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.cliente = res;
            this.edit = true;
            this.setValues()
          },
          err => console.log(err)
        )
      console.log(this.edit)
    }


    this.clienteForm = this.formBuilder.group({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      departamento: new FormControl(null, [Validators.required]),
      edad: new FormControl(0, [Validators.required, Validators.max(99)]),
      // fecha_registro: new FormControl(null, [Validators.required]),
      clasificacion: new FormControl(null, [Validators.required]),
      estado: new FormControl(null, [Validators.required]),
      apellidos: new FormControl(null, [Validators.required]),
      telefono1: new FormControl(null, [Validators.required]),
      telefono2: new FormControl(0),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      tipoanuncio: new FormControl(null, [Validators.required]),
      lineanegocio: new FormControl(null, [Validators.required]),
      tipopropiedad: new FormControl(null, [Validators.required]),
      fechaentrada: new FormControl(null, [Validators.required]),
      notas: new FormControl(null, [Validators.required]),
      // semaforo: new FormControl(null, [Validators.required]),
      // asignadoa: new FormControl(null, [Validators.required]),
      // tiempoasignado: new FormControl(null, [Validators.required]),
      // grupo: new FormControl(null, [Validators.required]),
      formadepago: new FormControl(null, [Validators.required]),
      montocliente: new FormControl(0, [Validators.required]),
      rangoprecios: new FormControl(null, [Validators.required]),
    });


  }

  submitCliente() {

    this.submitted = true
    this.cliente.nombre = this.clienteForm.get('nombre').value,
      this.cliente.departamento = this.clienteForm.get('departamento').value,
      this.cliente.edad = this.clienteForm.get('edad').value,
      this.cliente.fecha_registro = new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      this.cliente.clasificacion = this.clienteForm.get('clasificacion').value,
      this.cliente.estado = this.clienteForm.get('estado').value,
      this.cliente.apellidos = this.clienteForm.get('apellidos').value,
      this.cliente.telefono1 = this.clienteForm.get('telefono1').value,
      this.cliente.telefono2 = this.clienteForm.get('telefono2').value,
      this.cliente.correo = this.clienteForm.get('correo').value,
      this.cliente.tipoanuncio = this.clienteForm.get('tipoanuncio').value,
      this.cliente.lineanegocio = this.clienteForm.get('lineanegocio').value,
      this.cliente.tipopropiedad = this.clienteForm.get('tipopropiedad').value,
      this.cliente.fechaentrada = this.clienteForm.get('fechaentrada').value,
      this.cliente.notas = this.clienteForm.get('notas').value,
      this.cliente.semaforo = 'verde',
      this.cliente.asignadoa = this.usuarioAc.name + ' ' + this.usuarioAc.lastname,
      this.cliente.tiempoasignado = '0',
      this.cliente.grupo = this.usuarioAc.grupo,
      this.cliente.formadepago = this.clienteForm.get('formadepago').value,
      this.cliente.montocliente = this.clienteForm.get('montocliente').value,
      this.cliente.rangoprecios = this.clienteForm.get('rangoprecios').value;

    if (this.clienteForm.invalid) {
      this.findInvalidControls()

      return;
    }
    else {

      this.clienteService.createCliente(this.cliente)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/cliente']);
          },
          err => console.log(err)
        )
    }
  }

  updateCliente() {
    this.submitted = true
    
    this.cliente.id= this.cliente.id
    this.cliente.nombre = this.clienteForm.get('nombre').value,
      this.cliente.departamento = this.clienteForm.get('departamento').value,
      this.cliente.edad = this.clienteForm.get('edad').value,
      // this.cliente.fecha_registro = new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      this.cliente.clasificacion = this.clienteForm.get('clasificacion').value,
      this.cliente.estado = this.clienteForm.get('estado').value,
      this.cliente.apellidos = this.clienteForm.get('apellidos').value,
      this.cliente.telefono1 = this.clienteForm.get('telefono1').value,
      this.cliente.telefono2 = this.clienteForm.get('telefono2').value,
      this.cliente.correo = this.clienteForm.get('correo').value,
      this.cliente.tipoanuncio = this.clienteForm.get('tipoanuncio').value,
      this.cliente.lineanegocio = this.clienteForm.get('lineanegocio').value,
      this.cliente.tipopropiedad = this.clienteForm.get('tipopropiedad').value,
      this.cliente.fechaentrada = this.clienteForm.get('fechaentrada').value,
      this.cliente.notas = this.clienteForm.get('notas').value,
      this.cliente.semaforo = 'verde',
      // this.cliente.asignadoa = this.usuarioAc.name + ' ' + this.usuarioAc.lastname,
      // this.cliente.tiempoasignado = '0',
      // this.cliente.grupo = this.usuarioAc.grupo,
      this.cliente.formadepago = this.clienteForm.get('formadepago').value,
      this.cliente.montocliente = this.clienteForm.get('montocliente').value,
      this.cliente.rangoprecios = this.clienteForm.get('rangoprecios').value;
    if (this.clienteForm.invalid) {
      this.findInvalidControls()

      return;
    }
    else {
    
    this.clienteService.updateCliente(this.cliente).subscribe((result)=>{
      console.log(result);
    });;
     
          this.router.navigate(['/cliente'])
      
    }
  }

  get f() {
    return this.clienteForm.controls;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 4;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public findInvalidControls() {
    for (let el in this.clienteForm.controls) {
      if (this.clienteForm.controls[el].errors) {
        console.log(el)
      }
    }
  }

  isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  setValues() {
    this.clienteForm.controls['nombre'].setValue(this.cliente.nombre)
    this.clienteForm.controls['departamento'].setValue(this.cliente.departamento)
    this.clienteForm.controls['edad'].setValue(this.cliente.edad)
    // this.cliente.fecha_registro = this.cliente.fecha_registro + '(editado: ' + new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' })+')'
    this.clienteForm.controls['clasificacion'].setValue(this.cliente.clasificacion)
    this.clienteForm.controls['estado'].setValue(this.cliente.estado)
    this.clienteForm.controls['apellidos'].setValue(this.cliente.apellidos)
    this.clienteForm.controls['telefono1'].setValue(this.cliente.telefono1)
    this.clienteForm.controls['telefono2'].setValue(this.cliente.telefono2)
    this.clienteForm.controls['correo'].setValue(this.cliente.correo)
    this.clienteForm.controls['tipoanuncio'].setValue(this.cliente.tipoanuncio)
    this.clienteForm.controls['lineanegocio'].setValue(this.cliente.lineanegocio)
    this.clienteForm.controls['tipopropiedad'].setValue(this.cliente.tipopropiedad)
    this.clienteForm.controls['fechaentrada'].setValue(this.cliente.fechaentrada)
    this.clienteForm.controls['notas'].setValue(this.cliente.notas)
    // this.clienteForm.controls['semaforo'].setValue(this.cliente.semaforo)
    // this.clienteForm.controls['asignadoa'].setValue(this.cliente.asignadoa)
    // this.clienteForm.controls['tiempoasignado'].setValue(this.cliente.tiempoasignado)
    // this.clienteForm.controls['grupo'].setValue(this.cliente.grupo)
    this.clienteForm.controls['formadepago'].setValue(this.cliente.formadepago)
    this.clienteForm.controls['montocliente'].setValue(this.cliente.montocliente)
    this.clienteForm.controls['rangoprecios'].setValue(this.cliente.rangoprecios)
  }

}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../Cliente/cliente.service';
import { Cita } from '../interface/cita.interface';
import { CitaService } from "../cita.service";
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../Cliente/interface/cliente.interface';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-form-cita',
  templateUrl: './form-cita.component.html',
  styleUrls: ['./form-cita.component.css']
})
export class FormCitaComponent implements OnInit, AfterContentInit {
  citaForm: FormGroup;
  showSpinner = false;
  submitted = false;
  breakpoint: number;
  clientesAll: any;

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
  cita: Cita = {
    idcontacto: null,
    titulo: null,
    descripcion: null,
    fecha: null,
    estado: null,
    grupo: null,
    fecha_registro: null,
    seguimiento: null,
    elaborado: null,
    tipodecita: null,
    apoyos: null,
    direccioncit: null,
  };
  edit: boolean = false;


  constructor(
    private formBuilder: FormBuilder,
    private clienteServices: ClienteService,
    private citaService: CitaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    
  ) { }
  ngAfterContentInit(): void {
    console.log(this.edit)
    console.log(Object.keys(this.cita).length)
  }

  ngOnInit() {

    this.clienteServices.getClientes().subscribe(response => {
      this.clientesAll = response;
   })
    this.breakpoint = (window.innerWidth <= 1000) ? 1 : 3;
    const params = this.activatedRoute.snapshot.params;
    
    if (params['id']) {
      this.edit = true;
      this.citaService.getCita(params['id'])
        .subscribe(
          res => {
            console.log(res);
            this.cita = res;
            this.edit = true;
            // this.setValues()
          },
          err => console.log(err)
        )
      console.log(this.edit)
    }
    if (params['idCliente']) {
      this.edit = true;
      this.clienteServices.getCliente(params['idCliente'])
        .subscribe(
          res => {
            console.log(res);
            this.cliente = res;
            this.setValueCliente()
          },
          err => console.log(err)
        )
      console.log(this.edit)
    }

    this.citaForm = this.formBuilder.group({
      tipodecita: new FormControl(null, [Validators.required]),
      titulo: new FormControl(null, [Validators.required]),
      descripcion: new FormControl(null, [Validators.required]),
      // fecha_registro: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required]),
      hora: new FormControl(null, [Validators.required]),
      direccion1: new FormControl(null, [Validators.required]),
      direccion2: new FormControl(null, [Validators.required]),
      apoyos: new FormControl(null),
      apoyos1: new FormControl(null),
      apoyos2: new FormControl(null),
      cliente: new FormControl(null, [Validators.required]),
      
    });
  }

  submitCita() {

    this.submitted = true
      this.cita.idcontacto= this.citaForm.get('cliente').value,
      this.cita.titulo= this.citaForm.get('titulo').value,
      this.cita.descripcion= this.citaForm.get('descripcion').value,
      this.cita.fecha= this.citaForm.get('fecha').value,
      this.cita.estado= 'Incompleto',
      this.cita.grupo= this.usuarioAc.grupo,
      this.cita.fecha_registro= new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' }),
      this.cita.seguimiento= '',
      this.cita.elaborado= this.usuarioAc.name + ' ' + this.usuarioAc.lastname,
      this.cita.tipodecita= this.citaForm.get('tipodecita').value,
      this.cita.apoyos= this.citaForm.get('apoyos').value + ' ' + this.citaForm.get('apoyos1').value + ' ' + this.citaForm.get('apoyos2').value ,
      this.cita.direccioncit= this.citaForm.get('direccion1').value + ' | ' + this.citaForm.get('direccion2').value;

    if(this.citaForm.invalid) {
      this.findInvalidControls()

      return;
    }
    else {

      this.citaService.createCita(this.cita)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/cita']);
          },
          err => console.log(err)
        )
    }
  }

  updateCita() {
    this.submitted = true

    // this.cliente.id = this.cliente.id
    // this.cliente.nombre = this.clienteForm.get('nombre').value,
    //   this.cliente.departamento = this.clienteForm.get('departamento').value,
    //   this.cliente.edad = this.clienteForm.get('edad').value,
    //   // this.cliente.fecha_registro = new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    //   this.cliente.clasificacion = this.clienteForm.get('clasificacion').value,
    //   this.cliente.estado = this.clienteForm.get('estado').value,
    //   this.cliente.apellidos = this.clienteForm.get('apellidos').value,
    //   this.cliente.telefono1 = this.clienteForm.get('telefono1').value,
    //   this.cliente.telefono2 = this.clienteForm.get('telefono2').value,
    //   this.cliente.correo = this.clienteForm.get('correo').value,
    //   this.cliente.tipoanuncio = this.clienteForm.get('tipoanuncio').value,
    //   this.cliente.lineanegocio = this.clienteForm.get('lineanegocio').value,
    //   this.cliente.tipopropiedad = this.clienteForm.get('tipopropiedad').value,
    //   this.cliente.fechaentrada = this.clienteForm.get('fechaentrada').value,
    //   this.cliente.notas = this.clienteForm.get('notas').value,
    //   this.cliente.semaforo = 'verde',
    //   // this.cliente.asignadoa = this.usuarioAc.name + ' ' + this.usuarioAc.lastname,
    //   // this.cliente.tiempoasignado = '0',
    //   // this.cliente.grupo = this.usuarioAc.grupo,
    //   this.cliente.formadepago = this.clienteForm.get('formadepago').value,
    //   this.cliente.montocliente = this.clienteForm.get('montocliente').value,
    //   this.cliente.rangoprecios = this.clienteForm.get('rangoprecios').value;
    if (this.citaForm.invalid) {
      this.findInvalidControls()

      return;
    }
    else {

      this.citaService.updateCita(this.cita).subscribe((result) => {
        console.log(result);
      });;

      this.router.navigate(['/cita'])

    }
  }

  get f() {
    return this.citaForm.controls;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 1000) ? 1 : 3;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public findInvalidControls() {
    for (let el in this.citaForm.controls) {
      if (this.citaForm.controls[el].errors) {
        console.log(el)
      }
    }
  }

  isEmpty(obj: Record<string, any>): boolean {
    return Object.keys(obj).length === 0;
  }

  setValues() {
    // this.clienteForm.controls['nombre'].setValue(this.cliente.nombre)
    // this.clienteForm.controls['departamento'].setValue(this.cliente.departamento)
    // this.clienteForm.controls['edad'].setValue(this.cliente.edad)
    // // this.cliente.fecha_registro = this.cliente.fecha_registro + '(editado: ' + new Date().toLocaleTimeString('es-mx', { day: '2-digit', month: '2-digit', year: 'numeric' })+')'
    // this.clienteForm.controls['clasificacion'].setValue(this.cliente.clasificacion)
    // this.clienteForm.controls['estado'].setValue(this.cliente.estado)
    // this.clienteForm.controls['apellidos'].setValue(this.cliente.apellidos)
    // this.clienteForm.controls['telefono1'].setValue(this.cliente.telefono1)
    // this.clienteForm.controls['telefono2'].setValue(this.cliente.telefono2)
    // this.clienteForm.controls['correo'].setValue(this.cliente.correo)
    // this.clienteForm.controls['tipoanuncio'].setValue(this.cliente.tipoanuncio)
    // this.clienteForm.controls['lineanegocio'].setValue(this.cliente.lineanegocio)
    // this.clienteForm.controls['tipopropiedad'].setValue(this.cliente.tipopropiedad)
    // this.clienteForm.controls['fechaentrada'].setValue(this.cliente.fechaentrada)
    // this.clienteForm.controls['notas'].setValue(this.cliente.notas)
    // // this.clienteForm.controls['semaforo'].setValue(this.cliente.semaforo)
    // // this.clienteForm.controls['asignadoa'].setValue(this.cliente.asignadoa)
    // // this.clienteForm.controls['tiempoasignado'].setValue(this.cliente.tiempoasignado)
    // // this.clienteForm.controls['grupo'].setValue(this.cliente.grupo)
    // this.clienteForm.controls['formadepago'].setValue(this.cliente.formadepago)
    // this.clienteForm.controls['montocliente'].setValue(this.cliente.montocliente)
    // this.clienteForm.controls['rangoprecios'].setValue(this.cliente.rangoprecios)
  }

  setValueCliente(){
    this.citaForm.controls['cliente'].setValue(this.cliente.id)
  }
 
  selectedEstado: String = "--Elige un Estado--";
  
	Estados: Array<any> = [
	
		{ estado: 'Aguascalientes', municipio: [ {name: 'Aguascalientes'}, {name: 'Asientos'}, 
    {name: 'Calvillo'}, {name: 'Cosío'}, {name: 'Jesús María'}, {name: 'APabellón de Arteaga'},
    {name: 'Rincón de Romos'}, {name: 'San José de Gracia'}, {name: 'Tepezalá'},
    {name: 'El Llano'}, {name: 'San Francisco de los Romo'}, ] },

    { estado: 'Baja California', municipio: [{name: 'Ensenada'}, {name: 'Mexicali'},{name: 'Tecate'}, {name: 'Tijuana'},
    {name: 'Playas de Rosarito'}, {name: 'San Quintín'},] },

    { estado: 'Baja California Sur', municipio: [ {name: 'Comondú'}, {name: 'Mulegé'}, 
    {name: 'La Paz'}, {name: 'Los Cabos'}, {name: 'Loreto'} ] },

    { estado: 'Campeche', municipio: [ {name: 'Calkiní'}, {name: 'Campeche'},{name: 'Carmen'}, {name: 'Champotón'},
    {name: 'Hecelchakán'}, {name: 'Hopelchén'},{name: 'Palizada'}, {name: 'Tenabo'},
    {name: 'Escárcega'}, {name: 'Calakmul'},{name: 'Candelaria'}, {name: 'Seybaplaya'}, ] },

    { estado: 'Chiapas', municipio: [ {name: 'Chiapas'}, ] },

    { estado: 'Chihuahua', municipio: [ {name: 'Chihuahua'}, ] },

    { estado: 'Coahuila de Zaragoza', municipio: [ {name: 'Coahuila de Zaragoza'}, ] },

    { estado: 'Colima', municipio: [ {name: 'Colima'},] },

    { estado: 'Ciuidad de México', municipio: [ 
    {name: 'Azcapotzalco'}, {name: 'Coyoacán'},{name: 'Cuajimalpa de Morelos'},
    {name: 'Gustavo A. Madero'}, {name: 'Iztacalco'},{name: 'Iztapalapa'},
    {name: 'La Magdalena Contreras'}, {name: 'Milpa Alta'},{name: 'Álvaro Obregón'},
    {name: 'Tláhuac'}, {name: 'Tlalpan'},{name: 'Xochimilco'},
    {name: '	Benito Juárez'}, {name: 'Cuauhtémoc'},{name: 'Miguel Hidalgo'},{name: 'Venustiano Carranza'} ] },

    { estado: 'Durango', municipio: [ {name: 'Durango'}, ] },

    { estado: 'Guanajuato', municipio: [ {name: 'Guanajuato'}, ] },

    { estado: 'Guerrero', municipio: [{name: 'Guerrero'}, ] },

    { estado: 'Hidalgo', municipio: [ {name: 'Hidalgo'}, ] },

    { estado: 'Jalisco', municipio: [ {name: 'Jalisco'}, ] },

    { estado: 'Estado de México', municipio: [ 
      {name: 'Acambay de Ruíz Castañeda'}, {name: 'Acolman'},{name: 'Aculco'},{name: 'Almoloya de Alquisiras'},{name: 'Almoloya de Juárez'},
      {name: 'Almoloya del Río'}, {name: 'Amanalco'},{name: 'Amatepec'},{name: 'Amecameca'},{name: 'Apaxco'},
      {name: 'Atenco'}, {name: 'Atizapán'},{name: 'Atizapán de Zaragoza'},{name: 'Atlacomulco'},{name: 'Atlautla'},
      {name: 'Axapusco'}, {name: 'Ayapango'},{name: 'Calimaya'},{name: 'Capulhuac'},{name: 'Coacalco de Berriozábal'},
      {name: 'Coatepec Harinas'}, {name: 'Cocotitlán'},{name: 'Coyotepec'},{name: 'Cuautitlán'},{name: 'Chalco'},
      {name: 'Chapa de Mota'}, {name: 'Chapultepec'},{name: 'Chiautla'},{name: 'Chicoloapan'},{name: 'Chiconcuac'},
      {name: 'Chimalhuacán'}, {name: 'Donato Guerra'},{name: 'Ecatepec de Morelos'},{name: 'Ecatzingo'},{name: 'Huehuetoca'},
      {name: 'Hueypoxtla'}, {name: 'Huixquilucan'},{name: 'Isidro Fabela'},{name: 'Ixtapaluca'},{name: 'Ixtapan de la Sal'},
      {name: 'Ixtapan del Oro'}, {name: 'Ixtlahuaca'},{name: 'Xalatlaco'},{name: 'Jaltenco'},{name: 'Jilotepec'},
      {name: 'Jilotzingo'}, {name: 'Jiquipilco'},{name: 'Jocotitlán'},{name: 'Joquicingo'},{name: 'Juchitepec'},
      {name: 'Lerma'}, {name: 'Malinalco'},{name: 'Melchor Ocampo'},{name: 'Metepec'},{name: 'Mexicaltzingo'},
      {name: 'Morelos'}, {name: 'Naucalpan de Juárez'},{name: 'Nezahualcóyotl'},{name: 'Nextlalpan'},{name: 'Nicolás Romero'},
      {name: 'Nopaltepec'}, {name: 'Ocoyoacac'},{name: 'Ocuilan'},{name: 'El Oro'},{name: 'Otumba'},
      {name: 'Otzoloapan'}, {name: 'Otzolotepec'},{name: 'Ozumba'},{name: 'Papalotla'},{name: 'La Paz'},
      {name: 'Polotitlán'}, {name: 'Rayón'},{name: 'San Antonio la Isla'},{name: 'San Felipe del Progreso'},{name: 'San Martín de las Pirámides'},
      {name: 'San Mateo Atenco'}, {name: 'San Simón de Guerrero'},{name: 'Santo Tomás'},{name: 'Soyaniquilpan de Juárez'},{name: 'Sultepec'},
      {name: 'Tecámac'}, {name: 'Tejupilco'},{name: 'Temamatla'},{name: 'Temascalapa'},{name: 'Temascalcingo'},
      {name: 'Temascaltepec'}, {name: 'Temoaya'},{name: 'Tenancingo'},{name: 'Tenango del Aire'},{name: 'Tenango del Valle'},
      {name: 'Teoloyucan'}, {name: 'Teotihuacán'},{name: 'Tepetlaoxtoc'},{name: 'Tepetlixpa'},{name: 'Tepotzotlán'},
      {name: 'Tequixquiac'}, {name: 'Texcaltitlán'},{name: 'Texcalyacac'},{name: 'Texcoco'},{name: 'Tezoyuca'},
      {name: 'Tianguistenco'}, {name: 'Timilpan'},{name: 'Tlalmanalco'},{name: 'Tlalnepantla de Baz'},{name: 'Tlatlaya'},
      {name: 'Toluca'}, {name: 'Tonatico'},{name: 'Tultepec'},{name: 'Tultitlán'},{name: 'Valle de Bravo'},
      {name: 'Villa de Allende'}, {name: 'Villa del Carbón'},{name: 'Villa Guerrero'},{name: 'Villa Victoria'},{name: 'Xonacatlán'},
      {name: 'Zacazonapan'}, {name: 'Zacualpan'},{name: 'Zinacantepec'},{name: 'Zumpahuacán'},{name: 'Zumpango'},
      {name: 'Cuautitlán Izcalli'}, {name: 'Valle de Chalco Solidaridad'},{name: 'Luvianos'},{name: 'San José del Rincón'},{name: 'Tonanitla'},] },

    { estado: 'Michoacán de Ocampo', municipio: [ {name: 'Michoacán'}, ] },
    { estado: 'Morelos', municipio: [ {name: 'Morelos'}, ] },
    { estado: 'Nayarit', municipio: [ {name: 'Nayarit'}, ] },
    { estado: 'Nuevo León', municipio: [ {name: 'Nuevo León'}, ] },
    { estado: 'Oaxaca', municipio: [ {name: 'Oaxaca'}, ] },
    { estado: 'Puebla', municipio: [ {name: 'Puebla'}, ] },
    { estado: 'Querétaro', municipio: [ {name: 'Querétaro'}, ] },
    { estado: 'Quintana Roo', municipio: [ {name: 'Quintana Roo'}, ] },
    { estado: 'San Luis Potosí', municipio: [ {name: 'San Luis Potosí'}, ] },
    { estado: 'Sinaloa', municipio: [ {name: 'Sinaloa'}, ] },
    { estado: 'Sonora', municipio: [ {name: 'Sonora'}, ] },
    { estado: 'Tabasco', municipio: [ {name: 'Tabasco'}, ] },
    { estado: 'Tamaulipas', municipio: [ {name: 'Tamaulipas'}, ] },
    { estado: 'Tlaxcala', municipio: [ {name: 'Tlaxcala'}, ] },
    { estado: 'Veracruz de Ignacio de la Llave', municipio: [ {name: 'Veracruz'}, ] },
    { estado: 'Yucatán', municipio: [ {name: 'Yucatán'}, ] },
    { estado: 'Zacatecas', municipio: [ {name: 'Zacatecas'}, ] },
	];
  

	//cities: Array<any>; //Angular 8
	municipio: Array<any> = []; //Angular 11
	
	//changeCountry(country) { //Angular 8
	changeEstado(estado: any) { //Angular 11
		//this.states = this.Countries.find(cntry => cntry.name == country).states; //Angular 8
		this.municipio = this.Estados.find((edo: any) => edo.estado == estado.target.value).municipio; //Angular 11
	}

  
}

export interface Cliente {
    id?: number;
    nombre: string; 
    departamento: string;
    edad: number;
    fecha_registro: string;
    clasificacion: string;
    estado: string;
    apellidos: string;
    telefono1: number;
    telefono2: number;
    correo: string;
    tipoanuncio: string;
    lineanegocio: string;
    tipopropiedad: string;
    fechaentrada: string;
    notas: string;
    semaforo: string;
    asignadoa: string;
    tiempoasignado: string;
    grupo: string;
    formadepago: string;
    montocliente: string;
    rangoprecios: string;
  }

  export interface Meta {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface Links {
    first: string;
    previous: string;
    next: string;
    last: string;
}

export interface ClientesPageable {
    items: Cliente[];
    meta: Meta;
    links: Links;
}
export interface ClienteData {
    items: Cliente[],
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    }, 
    links: {
      first: string;
      previous: string;
      next: string;
      last: string;
    }
  };
import { Links, Meta } from "../../Cliente/interface/cliente.interface";

export interface Usuario {
    id?: number;
    usuario: string;
    correo: string;
    nombre: string;
    apellidos: string;
    edad: number;
    telefono: number;
    contrasena: string;
    ultimasesion: number;
    sesionfecha: number;
    grupo: number;
    coordinador: string;
    uinmuebles24: string;
    cinmuebles24: string;
    uvivanuncios: string;
    cvivanuncios: string;
  }

export interface UsuariosPageable {
    items: Usuario[];
    meta: Meta;
    links: Links;
}
export interface UserData {
    items: Usuario[],
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
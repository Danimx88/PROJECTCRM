import { Links, Meta } from "../../Cliente/interface/cliente.interface";

export interface Cita {
    id?: number;
    idcontacto: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    estado: string;
    grupo: number;
    fecha_registro: string;
    seguimiento: string;
    elaborado: string;
    tipodecita: string;
    apoyos: string;
    direccioncit: string;
}

export interface CitasPageable {
    items: Cita[];
    meta: Meta;
    links: Links;
}
export interface CitaData {
    items: Cita[],
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
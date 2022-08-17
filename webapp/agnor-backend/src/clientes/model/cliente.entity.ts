import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  departamento: string;

  @Column()
  edad: number;

  @Column()
  fecha_registro: string;

  @Column()
  clasificacion: string;

  @Column()
  estado: string;

  @Column()
  apellidos: string;

  @Column()
  telefono1: number;

  @Column()
  telefono2: number;

  @Column()
  correo: string;

  @Column()
  tipoanuncio: string;

  @Column()
  lineanegocio: string;

  @Column()
  tipopropiedad: string;

  @Column()
  fechaentrada: string;

  @Column()
  notas: string;

  @Column()
  semaforo: string;

  @Column()
  asignadoa: string;

  @Column()
  tiempoasignado: string;

  @Column()
  grupo: string;

  @Column()
  formadepago: string;

  @Column()
  montocliente: string;

  @Column()
  rangoprecios: string;
//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column({ default: true })
//   isActive: boolean;
}
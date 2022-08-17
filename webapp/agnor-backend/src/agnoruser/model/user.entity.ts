import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('agnorusers')
export class AgnorUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  usuario: string;

  @Column()
  correo: string;

  @Column()
  nombre: string;

  @Column()
  apellidos: string;

  @Column()
  edad: number;

  @Column()
  telefono: number;

  @Column()
  contrasena: string;

  @Column()
  ultimasesion: number;

  @Column()
  sesionfecha: number;

  @Column()
  grupo: number;

  @Column()
  coordinador: string;

  @Column()
  uinmuebles24: string;

  @Column()
  cinmuebles24: string;

  @Column()
  uvivanuncios: string;

  @Column()
  cvivanuncios: string;

  @Column()
  rol: string;
  
//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column({ default: true })
//   isActive: boolean;
}
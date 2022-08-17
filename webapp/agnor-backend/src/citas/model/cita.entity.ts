import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('citas')
export class Citas {
@PrimaryGeneratedColumn()
    id: number;

  @Column()
    idcontacto: number;

  @Column()
    titulo: string;

  @Column()
    descripcion: string;

  @Column()
    fecha: string;

  @Column()
    estado: string;

  @Column()
    grupo: number;

  @Column()
    fecha_registro: string;

  @Column()
    seguimiento: string;

  @Column()
    elaborado: string;

  @Column()
    tipodecita: string;

  @Column()
    apoyos: string;

  @Column()
    direccioncit: string;


//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column({ default: true })
//   isActive: boolean;
}
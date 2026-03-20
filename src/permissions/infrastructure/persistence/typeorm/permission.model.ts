import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { TypeormRoleModel } from '../../../../roles/infrastructure/persistence/typeorm/role.model';

@Entity('prm_permissions')
export class TypeormPermissionModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  description: string;

  @Column({ default: true })
  isActive: boolean;

  // Relación Muchos a Muchos con Roles
  // El primer parámetro apunta a la entidad destino
  // El segundo parámetro define la propiedad inversa en la otra entidad
  @ManyToMany(() => TypeormRoleModel, (role) => role.permissions)
  roles: TypeormRoleModel[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

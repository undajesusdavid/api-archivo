// src/modules/users/infrastructure/persistence/entities/user.orm-entity.ts
import { Entity, PrimaryColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { TypeormRoleModel } from '../../../../roles/infrastructure/persistence/typeorm/role.model';

@Entity('usr_users')
export class UserOrmEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: true }) // Seguridad: No devuelve el password por defecto en las consultas
  password: string;

  @Column({ default: true })
  active: boolean;

  /**
   * Relación Muchos a Muchos con Roles
   * Definimos @JoinTable aquí para que al guardar un usuario
   * podamos persistir sus roles fácilmente.
   */
  @ManyToMany(() => TypeormRoleModel, (role) => role.users)
  @JoinTable({
    name: 'usr_user_roles', // Nombre de la tabla intermedia
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: TypeormRoleModel[];

  // Si decides usar timestamps en el futuro, solo descomenta:
  // @CreateDateColumn()
  // createdAt: Date;
}

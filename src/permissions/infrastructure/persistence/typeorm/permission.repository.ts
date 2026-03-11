import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { PermissionRepository } from 'src/permissions/core/contracts/PermissionRepository';
import { TypeormPermissionModel } from './permission.model';
import { ErrorRepositoryService } from 'src/shared/app/errors/ErrorRepositoryService';
import { BaseTypeOrmRepository } from 'src/shared/infrastructure/persistence/typeorm/typeorm.base-repository';
import { Permission } from 'src/permissions/core/entities/Permission';
import { TypeormPermissionMapper } from './permission.mapper';

@Injectable()
export class TypeOrmPermissionRepository
  extends BaseTypeOrmRepository<Permission, TypeormPermissionModel, number>
  implements PermissionRepository
{
  constructor(
    @InjectRepository(TypeormPermissionModel)
    private readonly permissionRepository: Repository<TypeormPermissionModel>,
  ) {
    super(permissionRepository, new TypeormPermissionMapper());
  }

  async findByName(name: string): Promise<Permission | null> {
    try {
      const record = await this.entityRepository.findOne({
        where: { name } as any,
      });
      return record ? this.mapper.toDomain(record) : null;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar obtener el permiso por nombre',
        'PERMISSION_FINDBYNAME_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'findByName',
        },
      );
    }
  }

  async changePermissionStatus(id: string, status: boolean): Promise<boolean> {
    try {
      const result = await this.entityRepository.update(id, {
        isActive: status,
      } as any);
      return (result.affected ?? 0) > 0;
    } catch (error) {
      throw new ErrorRepositoryService(
        'Error al intentar cambiar el estado del permiso',
        'PERMISSION_CHANGESTATUS_FAILED',
        {
          originalError: error,
          class: this.constructor.name,
          method: 'changePermissionStatus',
        },
      );
    }
  }

  async findExistingIds(ids: number[]): Promise<number[]> {
    const uniqueIds = [...new Set(ids)];

    const permissions = await this.entityRepository.find({
      where: {
        id: In(uniqueIds),
      } as any,
      select: ['id'] as any,
    });

    return permissions.map((p) => p.id);
  }
}

import { Module, Inject } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/shared/infrastructure/adapters/nest/context/shared.module';
import { NestBaseModule } from 'src/shared/infrastructure/adapters/nest/bus/base-module';
import { COMMAND_BUS } from 'src/shared/app/bus/command-bus';
import { QUERY_BUS } from 'src/shared/app/bus/query-bus';
import { NestCommandBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-command-bus';
import { NestQueryBus } from 'src/shared/infrastructure/adapters/nest/bus/nest-query-bus';
import { InventoryController } from '../controllers/inventory.controller';
import { TypeOrmBoxModel } from '../../persistence/typeorm/box.model';
import { TypeOrmFolderModel } from '../../persistence/typeorm/folder.model';
import { TypeOrmRecordModel } from '../../persistence/typeorm/record.model';
import { TypeOrmDocumentModel } from '../../persistence/typeorm/document.model';
import { TypeOrmBoxRepository } from '../../persistence/typeorm/box.repository';
import { BOX_REPOSITORY } from '../../../core/contracts/BoxRepository';
import { TypeOrmBoxMapper } from '../../persistence/typeorm/box.mapper';
import { CreateBoxUseCase } from '../../../app/create-box/create-box.use-case';
import { CreateBoxCommand } from '../../../app/create-box/create-box.command';
import { GetInventoryUseCase } from '../../../app/get-inventory/get-inventory.use-case';
import { GetInventoryQuery } from '../../../app/get-inventory/get-inventory.query';

import { TypeOrmFolderRepository } from '../../persistence/typeorm/folder.repository';
import { FOLDER_REPOSITORY } from '../../../core/contracts/FolderRepository';
import { TypeOrmFolderMapper } from '../../persistence/typeorm/folder.mapper';
import { TypeOrmRecordRepository } from '../../persistence/typeorm/record.repository';
import { RECORD_REPOSITORY } from '../../../core/contracts/RecordRepository';
import { TypeOrmRecordMapper } from '../../persistence/typeorm/record.mapper';
import { TypeOrmDocumentRepository } from '../../persistence/typeorm/document.repository';
import { DOCUMENT_REPOSITORY, type DocumentRepository } from '../../../core/contracts/DocumentRepository';
import { TypeOrmDocumentMapper } from '../../persistence/typeorm/document.mapper';
import { type BoxRepository } from '../../../core/contracts/BoxRepository';
import { type FolderRepository } from '../../../core/contracts/FolderRepository';
import { type RecordRepository } from '../../../core/contracts/RecordRepository';

@Module({
  imports: [
    SharedModule,
    TypeOrmModule.forFeature([
      TypeOrmBoxModel,
      TypeOrmFolderModel,
      TypeOrmRecordModel,
      TypeOrmDocumentModel,
    ]),
  ],
  controllers: [InventoryController],
  providers: [
    {
      provide: BOX_REPOSITORY,
      useClass: TypeOrmBoxRepository,
    },
    {
      provide: FOLDER_REPOSITORY,
      useClass: TypeOrmFolderRepository,
    },
    {
      provide: RECORD_REPOSITORY,
      useClass: TypeOrmRecordRepository,
    },
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: TypeOrmDocumentRepository,
    },
    TypeOrmBoxMapper,
    TypeOrmFolderMapper,
    TypeOrmRecordMapper,
    TypeOrmDocumentMapper,
    {
      provide: CreateBoxUseCase,
      useFactory: (boxRepo: BoxRepository) => new CreateBoxUseCase(boxRepo),
      inject: [BOX_REPOSITORY],
    },
    {
      provide: GetInventoryUseCase,
      useFactory: (
        boxRepo: BoxRepository,
        folderRepo: FolderRepository,
        recordRepo: RecordRepository,
        docRepo: DocumentRepository,
      ) => new GetInventoryUseCase(boxRepo, folderRepo, recordRepo, docRepo),
      inject: [BOX_REPOSITORY, FOLDER_REPOSITORY, RECORD_REPOSITORY, DOCUMENT_REPOSITORY],
    },
  ],
  exports: [BOX_REPOSITORY, FOLDER_REPOSITORY, RECORD_REPOSITORY, DOCUMENT_REPOSITORY],
})
export class InventoryModule extends NestBaseModule {
  constructor(
    @Inject(COMMAND_BUS) commandBus: NestCommandBus,
    @Inject(QUERY_BUS) queryBus: NestQueryBus,
  ) {
    super('Inventory', commandBus, queryBus);
  }

  protected registerCommands(): void {
    this.commandBus.register(CreateBoxCommand, CreateBoxUseCase);
  }

  protected registerQueries(): void {
    this.queryBus.register(GetInventoryQuery, GetInventoryUseCase);
  }
}

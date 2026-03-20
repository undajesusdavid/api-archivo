import { IUseCase } from 'src/shared/core/interfaces/use-case.interface';
import { CreateBoxCommand } from './create-box.command';
import { type BoxRepository } from '../../core/contracts/BoxRepository';
import { Box } from '../../core/entities/Box';
import { InventoryStatus } from '../../core/value-objects/InventoryStatus';
import { ConservationStatus } from '../../core/value-objects/ConservationStatus';

export class CreateBoxUseCase implements IUseCase<CreateBoxCommand, void> {
  constructor(
    private readonly boxRepository: BoxRepository,
  ) {}

  async execute(command: CreateBoxCommand): Promise<void> {
    const existingBox = await this.boxRepository.findByLocationCode(command.locationCode);
    if (existingBox) {
      throw new Error(`A box already exists at location: ${command.locationCode}`);
    }

    const box = new Box({
      id: command.id,
      locationCode: command.locationCode,
      creationDate: new Date(),
      metadata: command.metadata || {},
      status: InventoryStatus.IN_SHELF,
      conservationStatus: (command.conservationStatus as ConservationStatus) || ConservationStatus.GOOD,
    });

    await this.boxRepository.save(box);
  }
}

import { Logger } from '@nestjs/common';
import { Seeder } from './seeder.interface';

export class SeederRunner {
  private readonly logger = new Logger(SeederRunner.name);

  constructor(private readonly seeders: Seeder[]) {}

  async run(): Promise<void> {
    this.logger.log('🚀 Iniciando proceso de seeding...');

    for (const seeder of this.seeders) {
      const seederName = seeder.constructor.name;
      try {
        this.logger.log(`⏳ Ejecutando seeder: ${seederName}...`);
        await seeder.run();
        this.logger.log(`✅ Seeder ${seederName} completado con éxito.`);
      } catch (error) {
        this.logger.error(`❌ Error al ejecutar el seeder ${seederName}:`, error);
        throw error;
      }
    }

    this.logger.log('🏁 Proceso de seeding finalizado.');
  }
}

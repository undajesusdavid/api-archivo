import { BootNest } from './shared/infrastructure/adapters/nest/boot';

async function bootstrap() {
  await BootNest();
}

bootstrap().catch((err) => {
  console.error('Error during bootstrap:', err);
});

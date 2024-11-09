import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CliController } from './cli/cli.controller';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  // Tomar el nombre de usuario como argumento desde la línea de comandos
  const username = process.argv[2]; // process.argv contiene los argumentos de la CLI

  if (!username) {
    console.error('Por favor, proporciona un nombre de usuario de GitHub');
    process.exit(1);
  }

  // Obtener una instancia del controlador CLI
  const cliController = app.get(CliController);

  // Llamar al método que obtiene la actividad del usuario
  await cliController.getUserActivity(username);

  // Cerrar la aplicación
  await app.close();
}

bootstrap();

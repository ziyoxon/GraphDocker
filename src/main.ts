import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService)
  const PORT = config.get<number>("API_PORT");
  await app.listen( PORT || 3030 , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`)
  });
}
start();

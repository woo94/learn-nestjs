import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  /**
   * bootstrap our application
   * 
   * 새로운 Nest application instance를 만들기 위해서 core NestFactory class를 사용해야함.
   * NestFactory는 몇개의 static method를 노출시켜서 application instance를 만들 수 있게 해줌.
   * create() method는 INestApplication interface를 만족시키는 application object를 반환함.
   */
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // app.setGlobalPrefix('sidebar');

  app.enableCors({
    origin: ['https://to-do-app-frontend-zeta.vercel.app','http://localhost:3000'], 
    methods:'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  const config = new DocumentBuilder()
  .setTitle('ToDoList')
  .setDescription('The todolist API Description')
  .setVersion('1.0')
  .addTag('to do')
  .build()

  const documentFactory = () => SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, documentFactory);


  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }));

  await app.listen(5000);
}
bootstrap();

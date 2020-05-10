/*
 * @Author: zhuchuanyong
 * @Date: 2020-05-07 22:34:14
 * @LastEditors: zhuchuanyong
 * @LastEditTime: 2020-05-10 21:18:12
 * @FilePath: \src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { prop, getModelForClass } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

async function bootstrap() {

  await mongoose.connect('mongodb://localhost:27017/',
    {
      useNewUrlParser: true,
      useFindAndModify:false,
      useCreateIndex:true,
      dbName: "nest-blog-api"
    }
  );

  const app = await NestFactory.create(AppModule);

  // Swagger接口文档配置
  const options = new DocumentBuilder()
    .setTitle('文档标题')
    .setDescription('api描述')
    .setVersion('1.0') // 版本
    .addTag('cats') // 标签
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-doc', app, document); // /api-doc 接口文档路径


  await app.listen(3000);
}
bootstrap();

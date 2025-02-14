import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("🔍 ENV Variables:", process.env); // Debugging

  if (!process.env.MONGODB) {
    console.error("❌ MONGO_URI is not defined!");
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 8000,);
}
bootstrap();

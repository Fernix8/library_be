import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("🔍 ENV Variables:", process.env); // Debugging

  if (!process.env.MONGODB) {
    console.error("❌ MONGO_URI is not defined!");
    process.exit(1);
  }

  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://library-fe-delta.vercel.app" // Deployed frontend on Vercel
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies if needed
  });

  await app.listen(process.env.PORT || 8000,);
}
bootstrap();

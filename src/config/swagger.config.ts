import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
  .setTitle("Backend API")
  .setDescription("Includes all the backend APIs for Audio event detection")
  .setVersion("1.0")
  //.addTag("backend")
  .addBearerAuth()
  .build();
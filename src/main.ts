import { NestFactory } from '@nestjs/core';
import { appendFile } from 'fs';
import { AppModule } from './app.module';
//import { LoggingInterceptor } from './shared/interceptor/logging.interceptor';
import { ErrorMessageService } from './shared/errorMessage.service';
import { ResponseInterceptor } from './shared/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
  const errorMessageService = app.get(ErrorMessageService);
app.useGlobalInterceptors(
    new ResponseInterceptor(errorMessageService),
    
  );
}
bootstrap();

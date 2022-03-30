"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const errorMessage_service_1 = require("./shared/errorMessage.service");
const response_interceptor_1 = require("./shared/interceptor/response.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    await app.listen(3000);
    const errorMessageService = app.get(errorMessage_service_1.ErrorMessageService);
    app.useGlobalInterceptors(new response_interceptor_1.ResponseInterceptor(errorMessageService));
}
bootstrap();
//# sourceMappingURL=main.js.map
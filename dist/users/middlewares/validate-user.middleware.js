"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateUserMiddleware = void 0;
const common_1 = require("@nestjs/common");
let ValidateUserMiddleware = class ValidateUserMiddleware {
    use(req, res, next) {
        console.log("Hello World");
        const { authorization } = req.headers;
        console.log("fdgvgfxd", authorization);
        if (!authorization)
            return res
                .status(403)
                .send({ error: "No authentication token provided" });
        next();
        if (authorization === "123") {
            next();
        }
        else {
            return res
                .status(403)
                .send({ error: 'Invalid authentication Token Provided.' });
        }
    }
};
ValidateUserMiddleware = __decorate([
    (0, common_1.Injectable)()
], ValidateUserMiddleware);
exports.ValidateUserMiddleware = ValidateUserMiddleware;
//# sourceMappingURL=validate-user.middleware.js.map
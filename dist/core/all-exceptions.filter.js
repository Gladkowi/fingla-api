"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllExceptionsFilter = void 0;
const common_1 = require("@nestjs/common");
let AllExceptionsFilter = class AllExceptionsFilter {
    constructor() {
        this.getErrorResponse = (status, message) => ({
            successStatus: status,
            message: message,
            timeStamp: new Date()
        });
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let successStatus;
        let message;
        let status;
        if (exception instanceof common_1.HttpException) {
            successStatus = false;
            status = exception.getStatus();
            const errorResponse = exception.getResponse();
            message =
                errorResponse.message || exception.message;
        }
        else {
            successStatus = false;
            message = 'Critical internal server error occurred!';
        }
        const errorResponse = this.getErrorResponse(successStatus, message);
        response.status(status).json(errorResponse);
    }
};
AllExceptionsFilter = __decorate([
    common_1.Catch()
], AllExceptionsFilter);
exports.AllExceptionsFilter = AllExceptionsFilter;
//# sourceMappingURL=all-exceptions.filter.js.map
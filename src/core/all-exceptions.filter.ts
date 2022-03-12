import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CustomHttpExceptionResponse, HttpExceptionResponse } from './models/http-exception-response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	catch(exception: unknown, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();

		let successStatus: boolean;
		let message: string;
		let status: HttpStatus;

		if (exception instanceof HttpException) {
			successStatus = false;
			status = exception.getStatus();
			const errorResponse = exception.getResponse();
			message =
				(errorResponse as HttpExceptionResponse).message || exception.message;
		} else {
			successStatus = false;
			message = 'Critical internal server error occurred!';
		}

		const errorResponse = this.getErrorResponse(successStatus, message);
		response.status(status).json(errorResponse);
	}

	private getErrorResponse = (
		status: boolean,
		message: string,
	): CustomHttpExceptionResponse => ({
		successStatus: status,
		message: message,
		timeStamp: new Date()
	});
}

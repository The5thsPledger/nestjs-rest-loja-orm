import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const http      = host.switchToHttp();
        const request   = http.getRequest<Request>();
        const response  = http.getResponse<Response>();
        const status    = exception.getStatus();
        response
            .status(status)
            .json({
                status      : status,
                mensagem    : exception.message,
                timeStamp   : new Date(),
                path        : request.url,
                method      : request.method,
                body        : request.body
            })
    }
}
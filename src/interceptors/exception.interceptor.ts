import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { catchError, Observable } from "rxjs";
import { UserInputExceptionHandler } from "./handlers/user-input-exception.handler";
import { JwtExceptionHandler } from "./handlers/jwt-exception.handler";
import { PrismaExceptionHandler } from "./handlers/prisma-exception.handler";

export class ExceptionInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            catchError((error) => {
                new UserInputExceptionHandler().handle(error);
                new JwtExceptionHandler().handle(error);
                new PrismaExceptionHandler().handle(error);
                throw error;
            }),
        )
    }
}
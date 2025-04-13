export interface ExceptionHandler{
    handle(error: Error): void;
}
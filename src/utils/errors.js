export class ApiError extends Error {
    constructor(message = 'Se ha encontrado un error, nuestros administradores han sido informados', statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
    }

    toJson() {
        return {
        success: false,
        error: this.message,
        statusCode: this.statusCode
        };
    }
}
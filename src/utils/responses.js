export class ApiResponse {
    constructor(data, statusCode = 200) {
      this.data = data;
      this.statusCode = statusCode;
    }
  
    toJson() {
      return {
        success: true,
        data: this.data,
        statusCode: this.statusCode
      };
    }
}
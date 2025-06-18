import { Injectable } from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GlobalApiErrorHandler {
  handleApiRequestError(error: HttpErrorResponse): string {
    switch (error.status) {
      case 0:
        return 'verifique sua conexão com a internet';
      case 500:
        return 'falha interna no servidor, tente novamente mais tarde';
      default:
        return 'falha desconhecida, tente novamente mais tarde';
    }
  }
}
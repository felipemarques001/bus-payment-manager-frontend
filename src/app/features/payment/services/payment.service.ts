import { environment } from "../../../../environments/environment";
import { PaymentRequest } from "../models/payment-request.interface";
import { inject, Injectable } from "@angular/core";
import { PaymentAmountsRequest } from "../models/payment-amounts-request.interface";
import { PaymentAmountsResponse } from "../models/payment-amounts-response.interface";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { GlobalApiErrorHandler } from "../../../core/services/global-api-error-handler.service";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private readonly http = inject(HttpClient);
    private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);

    private readonly apiUrl = `${environment.apiBaseUrl}/api/payments`;

    createPayment(payment: PaymentRequest) {
        return this.http.post(this.apiUrl, payment)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleCreatePaymentRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    calculateAmounts(request: PaymentAmountsRequest): Observable<PaymentAmountsResponse> {
        const url = `${this.apiUrl}/calculate-amounts`;
        return this.http.post<PaymentAmountsResponse>(url, request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleCalculateAmountsRequestErros(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    private handleCalculateAmountsRequestErros(error: HttpErrorResponse): string {
        return error.status === 0
            ? 'Erro ao calcular os valores, verifique sua conexão com a internet'
            : 'Serviço indisponível, tente mais tarde';
    }

    private handleCreatePaymentRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao criar o pagamento';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }
}
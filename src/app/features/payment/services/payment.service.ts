import { environment } from "../../../../environments/environment";
import { PageResponse } from "../../../shared/models/page-response.interface";
import { PaymentSummary } from "../models/payment-summary.interface";
import { PaymentRequest } from "../models/payment-request.interface";
import { inject, Injectable } from "@angular/core";
import { GlobalApiErrorHandler } from "../../../core/services/global-api-error-handler.service";
import { PaymentAmountsRequest } from "../models/payment-amounts-request.interface";
import { PaymentAmountsResponse } from "../models/payment-amounts-response.interface";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { PaymentResponse } from "../models/payment-response.interface";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private readonly http = inject(HttpClient);
    private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);
    private readonly apiUrl = `${environment.apiBaseUrl}/api/payments`;

    getPaymentSummaries(pageNumber: number): Observable<PageResponse<PaymentSummary>> {
        const pageSize: number = 24;

        const queriesParams = new HttpParams()
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);

        return this.http.get<PageResponse<PaymentSummary>>(this.apiUrl, { params: queriesParams })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleGetPaymentsSummariesRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    getPayment(paymentId: string): Observable<PaymentResponse> {
        const url = `${this.apiUrl}/${paymentId}`;
        return this.http.get<PaymentResponse>(url)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleGetPaymentRequestErros(error);
                    return throwError(() => errorMessage);
                })
            );
    }

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

    private handleGetPaymentRequestErros(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao buscar o pagamento';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }

    private handleGetPaymentsSummariesRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao buscar os pagamentos';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }

    private handleCreatePaymentRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao criar o pagamento';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }
}
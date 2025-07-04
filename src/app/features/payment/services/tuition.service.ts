import { environment } from "../../../../environments/environment";
import { TuitionStatus } from "../enums/tuition-status.enum";
import { TuitionResponse } from "../models/tuition-response.interface";
import { TuitionPaidRequest } from "../models/tuition-paid-request.interface";
import { inject, Injectable } from "@angular/core";
import { GlobalApiErrorHandler } from "../../../core/services/global-api-error-handler.service";
import { catchError, Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class TuitionService {
    private readonly http = inject(HttpClient);
    private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);
    private readonly apiUrl = `${environment.apiBaseUrl}/api/tuitions`;

    getTuitions(paymentId: string, status: TuitionStatus): Observable<TuitionResponse[]> {
        const params = new HttpParams()
            .set('paymentId', paymentId)
            .set('status', status);

        return this.http.get<TuitionResponse[]>(this.apiUrl, { params: params })
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleGetTuitionsRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    updateTuitionToPaid(tuitionId: string, tuitionPaidRequest: TuitionPaidRequest): Observable<TuitionResponse> {
        const apiUrl = `${this.apiUrl}/${tuitionId}/paid`;
        return this.http.patch<TuitionResponse>(apiUrl, tuitionPaidRequest)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleUpdateTuitionToPaidRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    updateTuitionToPending(tuitionId: string): Observable<TuitionResponse> {
        const apiUrl = `${this.apiUrl}/${tuitionId}/pending`;
        return this.http.patch<TuitionResponse>(apiUrl, null)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleUpdateTuitionToNotPaidRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
    }

    private handleGetTuitionsRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao buscar as mensalidades';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }

    private handleUpdateTuitionToPaidRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao definir mensalidade como paga';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }

    private handleUpdateTuitionToNotPaidRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Erro ao definir mensalidade como pendente';
        const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }
}
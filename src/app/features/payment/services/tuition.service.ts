import { environment } from "../../../../environments/environment";
import { TuitionResponse } from "../models/tuition-response.interface";
import { TuitionPaidRequest } from "../models/tuition-paid-request.interface";
import { inject, Injectable } from "@angular/core";
import { GlobalApiErrorHandler } from "../../../core/services/global-api-error-handler.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TuitionService {
    private readonly http = inject(HttpClient);
    private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);
    private readonly apiUrl = `${environment.apiBaseUrl}/api/tuitions`;

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

    updateTuitionToNotPaid(tuitionId: string): Observable<TuitionResponse> {
        const apiUrl = `${this.apiUrl}/${tuitionId}/not-paid`;
        return this.http.patch<TuitionResponse>(apiUrl, null)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleUpdateTuitionToNotPaidRequestError(error);
                    return throwError(() => errorMessage);
                })
            );
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
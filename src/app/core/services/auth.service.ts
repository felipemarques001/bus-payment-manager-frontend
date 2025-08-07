import { Router } from "@angular/router";
import { AccessToken } from "../../features/login/models/access-token.interface";
import { environment } from "../../../environments/environment";
import { LoginRequest } from "../../features/login/models/login-request.interface";
import { inject, Injectable } from "@angular/core";
import { GlobalApiErrorHandler } from "./global-api-error-handler.service";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly router = inject(Router);
    private readonly apiUrl = `${environment.apiBaseUrl}/api/auth`;
    private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);

    private accessToken: string | null = null;

    login(loginRequest: LoginRequest): Observable<void> {
        const url = this.apiUrl + '/login';
        return this.http.post<AccessToken>(url, loginRequest, { withCredentials: true })
            .pipe(
                map((response: AccessToken) => {
                    this.accessToken = response.accessToken;
                    return;
                }),
                catchError((error: HttpErrorResponse) => {
                    const errorMessage = this.handleLoginRequestError(error);
                    return throwError(() => errorMessage);
                }),
            );
    }

    refreshToken(): Observable<void> {
        const url = this.apiUrl + '/refresh-token';
        return this.http.get<AccessToken>(url, { withCredentials: true })
            .pipe(
                map((response: AccessToken) => {
                    this.accessToken = response.accessToken;
                    return;
                }),
            );
    }

    logout(): void {
        this.accessToken = null;
        this.router.navigate(['/login']);
    }

    private handleLoginRequestError(error: HttpErrorResponse): string {
        const errorBaseMessage = 'Falha ao realizar o login';
        let errorSpecificMessage = '';

        if (error.status === 401) {
            errorSpecificMessage += 'dados inválidos';
        } else {
            errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
        }

        return `${errorBaseMessage}, ${errorSpecificMessage}`;
    }

    get getToken(): string | null {
        return this.accessToken;
    }
}
import { inject } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { HttpEvent, HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { of, take, switchMap, catchError, Observable, throwError } from "rxjs";

export function authInterceptor(request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> {
    if (request.url.includes('/refresh-token') || request.url.includes('/login')) {
        return next(request);
    }

    const authService = inject(AuthService);
    const requestWithAccessToken = setAccessTokenInRequest(request, authService);

    return next(requestWithAccessToken)
        .pipe(
            catchError((error) => {
                if (error.status !== 401) {
                    return throwError(() => error);
                }

                return tryRefreshToken(authService)
                    .pipe(
                        switchMap(() => next(setAccessTokenInRequest(request, authService)))
                    );
            }),
        );
}

function setAccessTokenInRequest(request: HttpRequest<any>, authService: AuthService): HttpRequest<any> {
    const accessToken = authService.getToken;

    if (accessToken === null) {
        return request;
    }

    return request.clone({
        headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
    });
}

function tryRefreshToken(authService: AuthService): Observable<void> {
    return authService.refreshToken()
        .pipe(
            take(1),
            catchError(() => {
                authService.logout();
                return of();
            })
        );
}
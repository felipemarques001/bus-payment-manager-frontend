import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { PaymentRequest } from "../models/payment-request.interface";
import { inject, Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PaymentService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = `${environment.apiBaseUrl}/api/payments`;

    createPayment(payment: PaymentRequest) {
        return this.http.post(this.apiUrl, payment);
    }
}
import { PaymentOptions } from "../enums/payment-options.enum";

export interface TuitionPaidRequest {
    paymentType: PaymentOptions,
}
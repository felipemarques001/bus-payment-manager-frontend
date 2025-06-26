import { TuitionPaymentType } from "../constants/payment-options.constant";

export interface TuitionPaidRequest {
    paymentType: TuitionPaymentType,
}
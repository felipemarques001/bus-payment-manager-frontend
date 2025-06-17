import { FinancialHelpRequest } from "./financial-help-request.interface";

export interface PaymentAmountsRequest {
    totalAmount: string,
    studentsQuantity: number,
    financialHelps: FinancialHelpRequest[],
}
import { FinancialHelpRequest } from "./financial-help-request.interface";

export interface PaymentRequest {
    year: string,
    month: string,
    totalAmount: string,
    studentsIds: string[],
    financialHelps: FinancialHelpRequest[],
}
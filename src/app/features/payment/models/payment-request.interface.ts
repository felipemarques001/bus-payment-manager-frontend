import { FinancialHelpRequest } from "./financial-help-request.interface";

export interface PaymentRequest {
    invoiceYear: string,
    invoiceMonth: string,
    totalAmount: string,
    studentsIds: string[],
    financialHelps: FinancialHelpRequest[],
}
import { FinancialHelpResponse } from "./financial-help-response.interface";

export interface PaymentResponse {
    id: string;
    invoiceYear: string;
    invoiceMonth: string;
    totalAmount: string;
    totalToBePaid: string;
    tuitionAmount: string;
    financialHelps: FinancialHelpResponse[];
}
import { TuitionResponse } from "./tuition-response.interface";
import { FinancialHelpResponse } from "./financial-help-response.interface";

export interface PaymentResponse {
    id: string;
    year: string;
    month: string;
    totalAmount: string;
    totalToBePaid: string;
    tuitionAmount: string;
    financialHelps: FinancialHelpResponse[];
    tuitions: TuitionResponse[];
}
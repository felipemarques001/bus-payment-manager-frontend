import { StudentResponse } from "../../../shared/models/student-response.interface";

export interface TuitionResponse {
    id: string;
    isPaid: boolean;
    paidAt: string | null;
    paymentType: string | null;
    student: StudentResponse;
}
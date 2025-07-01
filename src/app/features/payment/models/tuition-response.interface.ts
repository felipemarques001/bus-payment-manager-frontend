import { TuitionStatus } from "../enums/tuition-status.enum";
import { StudentResponse } from "../../../shared/models/student-response.interface";

export interface TuitionResponse {
    id: string;
    status: TuitionStatus;
    paidAt: string | null;
    paymentType: string | null;
    student: StudentResponse;
}
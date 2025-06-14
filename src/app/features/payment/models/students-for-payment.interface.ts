import { StudentSummary } from "./student-summary.interface";

export interface StudentsForPayment {
    students: StudentSummary[];
    totalStudents: number;
}
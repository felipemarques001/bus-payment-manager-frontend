import { Student } from '../../features/student/models/student.interface';
import { environment } from '../../../environments/environment';
import { PageResponse } from '../../shared/models/page-response.interface';
import { StudentRequest } from '../../features/student/models/student-request.interface';
import { StudentsForPayment } from '../../features/payment/models/students-for-payment.interface';
import { inject, Injectable } from '@angular/core';
import { GlobalApiErrorHandler } from './global-api-error-handler.service';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly globalApiErrorHandler = inject(GlobalApiErrorHandler);

  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/students`;

  getStudents(pageNumber: number, pageSize: number, active: boolean): Observable<PageResponse<Student>> {
    const queriesParams = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize)
      .set("active", active);

    return this.http.get<PageResponse<Student>>(this.apiUrl, { params: queriesParams })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError('buscar os estudantes', error);
          return throwError(() => errorMessage);
        })
      );
  }

  getStudentsForPayment(): Observable<StudentsForPayment> {
    const url = `${this.apiUrl}/for-payment`;
    return this.http.get<StudentsForPayment>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError(
            'buscar os estudantes para o pagamento',
            error,
          );
          return throwError(() => errorMessage);
        })
      );
  }

  createStudent(student: StudentRequest) {
    return this.http.post(this.apiUrl, student)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError('criar novo estudante', error);
          return throwError(() => errorMessage);
        })
      );
  }

  updateStudent(studentId: String, student: StudentRequest) {
    const url = `${this.apiUrl}/${studentId}`;
    return this.http.put(url, student)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError('atualizar estudante', error);
          return throwError(() => errorMessage);
        })
      );
  }

  patchActiveStatus(studentId: string, status: boolean) {
    const url = `${this.apiUrl}/${studentId}/active`;
    const reqBody = { active: status };
    return this.http.patch(url, reqBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError('atualizar status do estudante', error);
          return throwError(() => errorMessage);
        })
      );
  }

  checkPhoneNumberExists(phoneNumber: String) {
    const url = `${this.apiUrl}/check-phone-number/${phoneNumber}`;
    return this.http.get<boolean>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = this.handleRequestError(
            'verificar se o número de telefone já está em uso', 
            error,
          );
          return throwError(() => errorMessage);
        })
      );;
  }

  private handleRequestError(requestType: string, error: HttpErrorResponse): string {
    const errorBaseMessage = `Erro ao ${requestType}`;
    const errorSpecificMessage = this.globalApiErrorHandler.handleApiRequestError(error);
    return `${errorBaseMessage}, ${errorSpecificMessage}`;
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/student.interface';
import { PageResponse } from '../../../shared/models/page-response.interface';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiBaseUrl}/api/students`;

  getStudents(pageNumber: number, pageSize: number): Observable<PageResponse<Student>> {
    const queriesParams = new HttpParams()
      .set("pageNumber", pageNumber)
      .set("pageSize", pageSize);

    return this.http.get<PageResponse<Student>>(
      this.apiUrl,
      { params: queriesParams },
    );
  }
}

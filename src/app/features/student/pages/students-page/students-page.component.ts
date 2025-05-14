import { Component, inject } from '@angular/core';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-students-page',
  imports: [],
  templateUrl: './students-page.component.html',
  styleUrl: './students-page.component.scss'
})
export class StudentsPageComponent {
  private readonly studentService = inject(StudentService);

  constructor() {
    this.studentService.getStudents(0, 15).subscribe({
      next: () => console.log('Pronto'),
      // error: () => console.log('Algo deu errado'),
    })
  }
}

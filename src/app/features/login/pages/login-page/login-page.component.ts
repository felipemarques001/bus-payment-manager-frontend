import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import { LoginRequest } from '../../models/login-request.interface';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../../../../shared/components/spinner/spinner.component';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { catchError, finalize, of } from 'rxjs';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  imports: [
    ButtonComponent,
    SpinnerComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly toastrService = inject(ToastrService);

  protected readonly loginFormGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  protected isLoading: boolean = false;
  protected showInvalidEmailMessage: boolean = false;

  ngOnInit(): void {
    this.emailControl.valueChanges.subscribe(() => this.showInvalidEmailMessage = false);
  }

  protected login(): void {
    const isLoginFormValid = this.validateLoginForm();
    if (isLoginFormValid) {
      return;
    }

    const loginRequest: LoginRequest = {
      email: this.emailControl.value,
      password: this.passwordControl.value,
    }

    this.isLoading = true;
    this.authService.login(loginRequest)
      .pipe(
        catchError((errorMessage: string) => {
          this.toastrService.error(errorMessage);
          return of();
        }),
        finalize(() => this.isLoading = false),
      )
      .subscribe(() => this.router.navigate(['/home']));
  }

  private validateLoginForm(): boolean {
    /**
     * We mark all fields as touched so that error messages are displayed even if 
     * a field hasn't been filled in or touched before the button is clicked
     */
    this.emailControl.markAsTouched();
    this.passwordControl.markAsTouched();

    if (this.emailControl.errors?.['email']) {
      this.showInvalidEmailMessage = true;
      return true;
    }

    if (this.loginFormGroup.invalid) {
      return true;
    }

    return false;
  }

  get emailControl(): FormControl<string> {
    return this.loginFormGroup.controls.email;
  }

  get passwordControl(): FormControl<string> {
    return this.loginFormGroup.controls.password;
  }
}

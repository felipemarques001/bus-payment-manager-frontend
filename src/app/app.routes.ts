import { Routes } from '@angular/router';
import { homeGuard } from './features/home/guards/home.guard';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { LoginPageComponent } from './features/login/pages/login-page/login-page.component';
import { StudentsPageComponent } from './features/student/pages/students-page/students-page.component';
import { PaymentsPageComponent } from './features/payment/pages/payments-page/payments-page.component';
import { PaymentCreationPageComponent } from './features/payment/pages/payment-creation-page/payment-creation-page.component';
import { PaymentDetailsPageComponent } from './features/payment/pages/payment-details-page/payment-details-page.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginPageComponent,
    },
    {
        path: 'home',
        component: HomePageComponent,
        canActivate: [homeGuard]
    },
    {
        path: 'students',
        component: StudentsPageComponent,
    },
    {
        path: 'payments',
        component: PaymentsPageComponent,
    },
    {
        path: 'payments/create',
        component: PaymentCreationPageComponent,
    },
    {
        path: 'payments/:id',
        component: PaymentDetailsPageComponent,
    },
    {
        path: '**',
        redirectTo: '/home',
    },
];

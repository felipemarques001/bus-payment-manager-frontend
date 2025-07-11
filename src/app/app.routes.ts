import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { StudentsPageComponent } from './features/student/pages/students-page/students-page.component';
import { PaymentsPageComponent } from './features/payment/pages/payments-page/payments-page.component';
import { PaymentCreationPageComponent } from './features/payment/pages/payment-creation-page/payment-creation-page.component';
import { PaymentDetailsPageComponent } from './features/payment/pages/payment-details-page/payment-details-page.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomePageComponent,
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

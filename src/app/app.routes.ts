import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';
import { StudentsPageComponent } from './features/student/pages/students-page/students-page.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomePageComponent,
    },
    {
        path: "students",
        component: StudentsPageComponent,
    },
    {
        path: "**",
        redirectTo: "/home",
    },
];

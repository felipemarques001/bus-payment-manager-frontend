import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page/home-page.component';

export const routes: Routes = [
    {
        path: "home",
        component: HomePageComponent,
    },
    {
        path: "**",
        redirectTo: "/home",
    }
];

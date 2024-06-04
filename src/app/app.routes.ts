import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
export const routes: Routes = [
    {
        path: '',
        title: "Tabel Mahasiswa",
        component: AppComponent,
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

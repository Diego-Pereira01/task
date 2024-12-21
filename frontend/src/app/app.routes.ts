import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { TaskListComponent } from './page/task-list/task-list.component';
import { RegistrationComponent } from './page/registration/registration.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'home', component: TaskListComponent},
    {path: '**', redirectTo: 'login' }
];

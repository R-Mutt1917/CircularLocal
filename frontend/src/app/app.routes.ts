import { Routes } from '@angular/router';
import { Login } from './view/login/login';
import { Register } from './view/register/register';

export const routes: Routes = [
    {
        path: '',
        component: Login
    },
    {
        path: 'register',
        component: Register
    }
];

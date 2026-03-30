import { Routes } from '@angular/router';
import { Landing } from './features/public/landing/landing';
import { Login } from './features/public/login/login';
import { Register } from './features/public/register/register';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminDashboard } from './features/admin/dashboard/dashboard';
import { Publicaciones } from './features/user/publicaciones/publicaciones';
import { UserDashboard } from './features/user/dashboard/dashboard';
import { PublicacionDetallada } from './features/user/publicacion-detallada/publicacion-detallada';
import { SubirPublicacion } from './features/user/subir-publicacion/subir-publicacion';
import { MisPublicaciones } from './features/user/mis-publicaciones/mis-publicaciones';


export const routes: Routes = [
    { path: '', component: Landing, pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {
        path: 'app',
        //canActivate: [AuthGuard], COMENTAR EN PRODUCCION
        children: [
            { path: '', component: UserDashboard },
            { path: 'publicaciones', component: Publicaciones },
            { path: 'publicacion/:id', component: PublicacionDetallada },
            { path: 'subir', component: SubirPublicacion },
            { path: 'mis-publicaciones', component: MisPublicaciones },
        ]
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: AdminDashboard },
        ]
    },
    { path: '**', redirectTo: '' }
];
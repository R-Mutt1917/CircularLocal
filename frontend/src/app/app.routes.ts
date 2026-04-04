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
import { Profile } from './features/user/profile/profile';
import { MisPublicaciones } from './features/user/mis-publicaciones/mis-publicaciones';
import { EditarPublicacion } from './features/user/editar-publicacion/editar-publicacion';


export const routes: Routes = [
    { path: '', component: Landing, pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'profile', component: Profile},
    {
        path: 'app',
        canActivate: [AuthGuard],
        children: [
            { path: '', component: UserDashboard },
            { path: 'publicaciones', component: Publicaciones },
            { path: 'publicacion/:id', component: PublicacionDetallada },
            { path: 'subir', component: SubirPublicacion },
            { path: 'mis-publicaciones', component: MisPublicaciones },
            { path: 'editar-publicacion/:id', component: EditarPublicacion },
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
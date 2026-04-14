import { Routes } from '@angular/router';
import { Landing } from './features/public/landing/landing';
import { Login } from './features/public/login/login';
import { Register } from './features/public/register/register';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { GuestGuard } from './core/guards/guest.guard';
import { Publicaciones } from './features/user/publicaciones/publicaciones';
import { UserDashboard } from './features/user/dashboard/dashboard';
import { PublicacionDetallada } from './features/user/publicacion-detallada/publicacion-detallada';
import { SubirPublicacion } from './features/user/subir-publicacion/subir-publicacion';
import { MisPublicaciones } from './features/user/mis-publicaciones/mis-publicaciones';
import { EditarPublicacion } from './features/user/editar-publicacion/editar-publicacion';
import { Profile } from './features/user/profile/profile';
import { Moderacion } from './features/admin/moderacion/moderacion';
import { Metricas } from './features/admin/metricas/metricas';
import { Usuarios } from './features/admin/usuarios/usuarios';
import { Solicitudes } from './features/user/solicitudes/solicitudes';

export const routes: Routes = [
    { path: '', component: Landing, canActivate: [GuestGuard] },
    { path: 'login', component: Login, canActivate: [GuestGuard] },
    { path: 'register', component: Register, canActivate: [GuestGuard] },
    { path: '', component: Landing, pathMatch: 'full' },
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
            { path: 'mi-perfil', component: Profile},
            { path: 'solicitudes', component: Solicitudes},
        ]
    },
    {
        path: 'admin',
        canActivate: [AuthGuard, AdminGuard],
        children: [
            { path: '', component: Metricas },
            { path: 'moderacion', component: Moderacion },
            { path: 'usuarios', component: Usuarios },
        ]
    },
    { path: '**', redirectTo: '' },
];
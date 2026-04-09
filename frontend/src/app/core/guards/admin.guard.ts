import { inject } from "@angular/core"
import { AuthServices } from "../services/auth"
import { Router } from "@angular/router"

export const AdminGuard = () => {
    const auth = inject(AuthServices)
    const router = inject(Router)

    if (auth.isLoggedIn() && auth.role() === 'ADMIN') {
        return true
    }

    return router.createUrlTree(['/app'])
}
import { inject } from "@angular/core"
import { Router } from "@angular/router"
import { AuthServices } from "../services/auth"

export const GuestGuard = () => {
    const auth = inject(AuthServices)
    const router = inject(Router)

    if (!auth.isLoggedIn()) {
        return true
    }

    const role = auth.role()

    if (role === 'ADMIN') {
        return router.createUrlTree(['/admin'])
    }

    return router.createUrlTree(['/app'])
}

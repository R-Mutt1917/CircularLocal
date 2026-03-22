import { inject } from "@angular/core"
import { AuthServices } from "../services/auth"
import { Router } from "@angular/router"


export const AuthGuard = () => {
    const auth = inject(AuthServices)
    const router = inject(Router)

    if (auth.isLoggedIn()) {
        return true
    }

    return router.createUrlTree(['/app'])
}
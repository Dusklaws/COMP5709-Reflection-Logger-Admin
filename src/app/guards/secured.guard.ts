import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class SecuredGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkAccess();
    }

    private async checkAccess(): Promise<boolean> {
        if (await this.authService.isUserSignedIn()) {
            if (!this.authService.isUserSupervisor()) {
                return this.router.navigate(['/journals']);
            }
            return true;
        }
        return this.router.navigate(['/login']);
    }
}

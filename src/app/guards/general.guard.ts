import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class GeneralGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkAccess();
    }

    private async checkAccess(): Promise<boolean> {
        if (await this.authService.isUserSignedIn()) {
            if (!(await this.authService.updateUser())) {
                this.authService.signOut();
                return this.router.navigate(['/login']);
            }
            return true;
        }
        return this.router.navigate(['/login']);
    }
}

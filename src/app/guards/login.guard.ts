import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public canActivate(): Observable<boolean> | Promise<boolean> | boolean {
        return this.checkAccess();
    }

    private async checkAccess(): Promise<boolean> {
        if (await this.authService.isUserSignedIn()) {
            return this.router.navigate(['/students']);
        }
        return true;
    }
}

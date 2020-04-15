import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss']
})
export class LoginPageComponent {
    constructor(private readonly authService: AuthService) { }

    public async login(): Promise<void> {
        await this.authService.signIn();
    }
}

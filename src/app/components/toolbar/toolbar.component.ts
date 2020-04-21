import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() title: string;
    @Input() back: string;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) { }

    public async navigateBack() {
        return this.router.navigate([this.back]);
    }

    public async logout() {
        await this.authService.signOut();
    }
}

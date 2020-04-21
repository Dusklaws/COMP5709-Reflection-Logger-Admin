import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
    @Input() title: string;

    constructor(private readonly authService: AuthService) { }

    public async logout() {
        await this.authService.signOut();
    }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { User } from '../typings/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public user: User;
    public googleProfile: gapi.auth2.BasicProfile;

    private googleAuth: gapi.auth2.GoogleAuth;
    private readonly isGoogleInitialized: Promise<void>;
    private readonly authUrl = environment.apiBaseUrl + '/auth';


    constructor(
        private readonly httpClient: HttpClient,
        private readonly router: Router,
        private readonly ngZone: NgZone,
    ) {
        this.isGoogleInitialized = this.initializeGAPI();
    }

    public async initializeGAPI(): Promise<void> {
        await new Promise(resolve => {
            gapi.load('auth2', () => {
                resolve();
            });
        });

        return gapi.auth2
            .init({
                client_id: environment.googleClientId
            })
            .then(auth => {
                this.googleAuth = auth;
                this.googleProfile = auth.currentUser.get().getBasicProfile();
            });
    }

    public async isUserSignedIn(): Promise<boolean> {
        await this.isGoogleInitialized;
        return this.googleAuth.isSignedIn.get();
    }

    public async signIn(): Promise<void> {
        await this.googleAuth.signIn({ scope: 'profile email' });
        await this.updateUser();
        if (this.user) {
            console.log('afds');
            await this.ngZone.run(() => this.router.navigate(['/students']));
        }
    }

    public async signOut(): Promise<void> {
        delete this.user;
        await this.googleAuth.signOut();
        await this.ngZone.run(() => this.router.navigate(['/login']));
    }

    public getGoogleIdToken(): { googleIdToken: string } {
        const user = this.googleAuth.currentUser.get();
        return { googleIdToken: user.getAuthResponse(true).id_token };
    }

    public async updateUser(): Promise<User> {
        if (this.user) {
            return this.user;
        }

        try {
            this.user = await this.httpClient.post<User>(
                this.authUrl,
                this.getGoogleIdToken()
            ).toPromise();
            return this.user;
        } catch (e) {
            console.log(e);
        }
    }

    public isUserSupervisor(): boolean {
        return this.user.type === 'supervisor';
    }

}

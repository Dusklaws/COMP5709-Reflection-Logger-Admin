import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../typings/user';

@Injectable({
    providedIn: 'root'
})
export class ApiServce {
    private readonly apiUrl: string = environment.apiBaseUrl;

    constructor(
        private readonly httpClient: HttpClient,
        private readonly authService: AuthService
    ) { }

    public async getListOfStudents(): Promise<User[]> {
        return this.get<User[]>('students');
    }

    private async get<T>(urlSuffix: string, ): Promise<T> {
        await this.authService.updateUser();
        return this.httpClient.get<T>(
            `${this.apiUrl}/${urlSuffix}`,
            {
                headers: {
                    GoogleIdToken: this.authService.getGoogleIdToken().googleIdToken
                }
            }
        ).toPromise();
    }

}

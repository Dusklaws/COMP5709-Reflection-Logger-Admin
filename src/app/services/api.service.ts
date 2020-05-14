import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../typings/user';
import { Log } from '../typings/log';

@Injectable({
    providedIn: 'root'
})
export class ApiServce {
    private readonly apiUrl: string = environment.apiBaseUrl + 'api';

    constructor(
        private readonly httpClient: HttpClient,
        private readonly authService: AuthService
    ) { }

    public async getListOfStudents(): Promise<User[]> {
        return this.get<User[]>('students');
    }

    public async removeHelp(email: string): Promise<void> {
        return this.get<void>(`students/${email}/remove_help`);
    }

    public async getLogs(email: string): Promise<Log[]> {
        return this.get<Log[]>('logs/' + email);
    }

    private async get<T>(urlSuffix: string): Promise<T> {
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

    private async post<T>(urlSuffix: string, body: any): Promise<T> {
        await this.authService.updateUser();
        return this.httpClient.post<T>(
            `${this.apiUrl}/${urlSuffix}`, body,
            {
                headers: {
                    GoogleIdToken: this.authService.getGoogleIdToken().googleIdToken
                },
            }
        ).toPromise();
    }

}

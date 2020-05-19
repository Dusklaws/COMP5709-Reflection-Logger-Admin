import { Injectable } from '@angular/core';

import { Log } from '../typings/log';
import { ApiServce } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class LogDataService {
    private logs: Log[];

    constructor(private readonly apiService: ApiServce) { }

    public initLogs(logs: Log[]) {
        this.logs = logs;
    }

    public async getAllLogs(email: string): Promise<Log[]> {
        if (!this.logs) {
            this.logs = await this.apiService.getLogs(email);
        }
        return this.logs;
    }

    public async getLogBySubmissionTime(email: string, submissionTime: string): Promise<Log> {
        if (!this.logs) {
            this.logs = await this.apiService.getLogs(email);
        }
        return this.logs.find(l => l.submissionTime === submissionTime);
    }
}

import { Injectable } from '@angular/core';

import { Log } from '../typings/log';
import { ApiServce } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class LogDataService {
    private email: string;
    private logs: Log[];

    constructor(private readonly apiService: ApiServce) { }

    public initLogs(logs: Log[], email: string) {
        this.email = email;
        this.logs = logs;
    }

    public async getAllLogs(email: string): Promise<Log[]> {
        if (!this.logs || email !== this.email) {
            this.logs = await this.apiService.getLogs(email);
            this.email = email;
        }
        return this.logs;
    }

    public async getLogBySubmissionTime(email: string, submissionTime: string): Promise<Log> {
        if (!this.logs) {
            this.logs = await this.apiService.getLogs(email);
        }
        return this.logs.find(l => l.submissionTime === submissionTime);
    }

    public async updateLog(log: Log): Promise<Log> {
        const i = this.logs.findIndex(l => l.submissionTime === log.submissionTime);
        await this.apiService.updateLog(log);
        this.logs[i] = log;
        return log;
    }
}

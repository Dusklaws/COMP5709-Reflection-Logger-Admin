import { Injectable } from '@angular/core';

import { Log } from '../typings/log';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private logs: Log[];

    constructor() { }

    public initLogs(logs: Log[]) {
        this.logs = logs;
    }

    public getLogBySubmissionTime(submissionTime: string): Log {
        if (!this.logs) {
            return;
        }
        return this.logs.find(l => l.submissionTime === submissionTime);
    }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LogDataService } from 'src/app/services/logData.service';
import { Log } from 'src/app/typings/log';

@Component({
    selector: 'app-log',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss']
})
export class LogPageComponent implements OnInit {
    public log?: Log;
    public title = 'Log';
    public isPageReady = false;
    public email;

    constructor(
        private readonly dataService: LogDataService,
        private readonly route: ActivatedRoute
    ) { }

    public async ngOnInit() {
        this.email = this.route.snapshot.paramMap.get('email');
        const submissionTime = this.route.snapshot.paramMap.get('submissionTime');
        this.log = await this.dataService.getLogBySubmissionTime(this.email, submissionTime);
        this.title = `${this.log.logType} Log`;
        this.isPageReady = true;
    }
}



import { ActivatedRoute, Router } from '@angular/router';
import { ApiServce } from 'src/app/services/api.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Log } from '../../typings/log';
import { LogDataService } from 'src/app/services/logData.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss']
})
export class CalendarPageComponent implements OnInit {

    public isPageReady = false;
    public email: string;
    public logs: Log[];

    public events: CalendarEvent[] = [];
    public viewDate: Date = new Date();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly dataService: LogDataService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.email = this.route.snapshot.paramMap.get('email');
        this.logs = await this.dataService.getAllLogs(this.email);
        for (const log of this.logs) {
            this.events.push({
                start: new Date(log.submissionTime),
                title: log.studentType,
                meta: {
                    dailyRating: log.dailyRating,
                    dailySummary: log.dailySummary,
                    submissionTime: log.submissionTime
                },
                id: log.submissionTime
            });
        }
        this.dataService.initLogs(this.logs);
        this.isPageReady = true;
    }
}

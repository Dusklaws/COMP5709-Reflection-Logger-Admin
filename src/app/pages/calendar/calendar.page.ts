import { ActivatedRoute, Router } from '@angular/router';
import { ApiServce } from 'src/app/services/api.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Log } from '../../typings/log';
import { LogDataService } from 'src/app/services/logData.service';
import { AuthService } from 'src/app/services/auth.service';
import { kMaxLength } from 'buffer';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss']
})
export class CalendarPageComponent implements OnInit {


    public isPageReady = false;
    public email: string;
    public logs: Log[];
    public filteredLog: Log[];
    public monthFilter = 'All';
    public monthFilters = [
        'All',
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    public events: CalendarEvent[] = [];
    public viewDate: Date = new Date();

    constructor(
        private readonly route: ActivatedRoute,
        private readonly dataService: LogDataService
    ) { }

    public filterLogs() {
        this.filteredLog = this.logs.filter(l => {
            if (this.monthFilter === 'All') {
                return l;
            }
            const logMonth = new Date(l.submissionTime).toLocaleDateString('default', { month: 'long' });
            if (this.monthFilter === logMonth) {
                return l;
            }
        }).sort((a, b) => new Date(b.submissionTime).getTime() - new Date(a.submissionTime).getTime());
    }

    public async ngOnInit(): Promise<void> {
        this.email = this.route.snapshot.paramMap.get('email');
        this.logs = await this.dataService.getAllLogs(this.email);
        for (const log of this.logs) {
            this.events.push({
                start: new Date(log.submissionTime),
                title: log.logType,
                meta: {
                    dailyRating: log.dailyRating,
                    dailySummary: log.dailySummary,
                    submissionTime: log.submissionTime
                },
                id: log.submissionTime
            });
        }
        this.dataService.initLogs(this.logs, this.email);
        this.filterLogs();
        this.isPageReady = true;
    }
}

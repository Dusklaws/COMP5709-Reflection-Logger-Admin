import { ActivatedRoute, Router } from '@angular/router';
import { ApiServce } from 'src/app/services/api.service';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { Log } from '../../typings/log';
import { Subject } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    styleUrls: ['./calendar.page.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPageComponent implements OnInit {

    public email: string;
    public logs: Log[];

    public events: CalendarEvent[] = [];
    public viewDate: Date = new Date();
    public refresh: Subject<any> = new Subject();

    constructor(
        private readonly apiService: ApiServce,
        private readonly route: ActivatedRoute,
        private readonly dataService: DataService
    ) { }

    public async ngOnInit(): Promise<void> {
        this.email = this.route.snapshot.paramMap.get('email');
        this.logs = await this.apiService.getLogs(this.email);
        for (const log of this.logs) {
            this.events.push({
                start: new Date(log.submissionTime),
                title: `Daily rating: ${log.dailyRating}`,
                id: log.submissionTime
            });
        }
        this.refresh.next();
        this.dataService.initLogs(this.logs);
    }

}

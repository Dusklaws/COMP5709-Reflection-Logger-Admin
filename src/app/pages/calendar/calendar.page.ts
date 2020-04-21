import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { ApiServce } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { Log } from '../../typings/log';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./calendar.page.scss']
})
export class CalendarPageComponent implements OnInit {

    viewDate: Date = new Date();

    events: CalendarEvent[] = [];
    clickedDate: Date;
    clickedColumn: number;
    public email: string;
    public logs: Log[];
    refresh: Subject<any> = new Subject();


    constructor(
        private readonly apiService: ApiServce,
        private readonly route: ActivatedRoute
    ) { }

    public async ngOnInit(): Promise<void> {
        this.email = this.route.snapshot.paramMap.get('email');
        this.logs = await this.apiService.getLogs(this.email);
        const a: CalendarEvent[] = [];
        for (const log of this.logs) {
            a.push({
                start: new Date(log.submissionTime),
                title: `Daily rating: ${log.dailyRating}`
            });
        }
        this.events = a;
        this.refresh.next();
        console.log(this.events);
    }


}

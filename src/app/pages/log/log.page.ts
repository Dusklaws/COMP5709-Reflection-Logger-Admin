import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Log } from 'src/app/typings/log';

@Component({
    selector: 'app-log',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss']
})
export class LogPageComponent implements OnInit {
    public log?: Log;
    public title = 'Log';

    constructor(
        private readonly dataService: DataService,
        private readonly route: ActivatedRoute
    ) { }

    ngOnInit() {
        const submissionTime = this.route.snapshot.paramMap.get('submissionTime');
        this.log = this.dataService.getLogBySubmissionTime(submissionTime);
        this.title = `${this.log.studentType} Stage Log`;
        this.title = this.title[0].toUpperCase() + this.title.slice(1);
    }
}



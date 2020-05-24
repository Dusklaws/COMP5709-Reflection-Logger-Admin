import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LogDataService } from 'src/app/services/logData.service';
import { Log } from 'src/app/typings/log';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../components/dialog/dialog.component';
import { BaseChartDirective } from 'ng2-charts';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-log',
    templateUrl: './log.page.html',
    styleUrls: ['./log.page.scss']
})
export class LogPageComponent implements OnInit {

    public log?: Log;
    public title = 'Log';
    public isPageReady = false;
    public userType: string;
    public email: string;

    constructor(
        private readonly dataService: LogDataService,
        private readonly authService: AuthService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        public dialog: MatDialog
    ) { }

    public async ngOnInit() {
        this.email = this.route.snapshot.paramMap.get('email');
        const submissionTime = this.route.snapshot.paramMap.get('submissionTime');
        this.log = await this.dataService.getLogBySubmissionTime(this.email, submissionTime);
        this.title = `${this.log.logType} Log`;
        this.userType = this.authService.user.type;
        this.isPageReady = true;
    }

    public editLog() {
        const ref = this.dialog.open(DialogComponent, {
            data: this.log,
            width: '450px'
        });
        ref.afterClosed().subscribe(async data => {
            if (data) {
                this.isPageReady = false;
                this.log = await this.dataService.updateLog(data);
                this.router.navigate([`/logs/${this.email}`]);
            }
        });
    }
}



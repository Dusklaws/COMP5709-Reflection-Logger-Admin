import { Component, Input, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Log } from 'src/app/typings/log';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
    public deadlineDate: Date;
    public startDate: Date;
    public endDate: Date;
    public log: Log;

    constructor(
        private dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: Log
    ) {
        this.log = JSON.parse(JSON.stringify(data));

        if (this.log.logType === 'initial') {
            if (!this.log.technologyReportingParameters) {
                this.log.technologyReportingParameters = {
                    isTaskTechnical: false,
                    task: '',
                    technology: ''
                };
            }

            if (!this.log.issueReportingParameters) {
                this.log.issueReportingParameters = {
                    generalIssue: '',
                    workPlaceIssue: ''
                };
            }
        }

        this.deadlineDate = this.log.workReportingParameters?.upcomingDeadline ?
            new Date(this.log.workReportingParameters.upcomingDeadline) :
            new Date();
        this.startDate = this.log.internshipReportingParameters?.startDate ?
            new Date(this.log.internshipReportingParameters.startDate) :
            new Date();
        this.endDate = this.log.internshipReportingParameters?.endDate ?
            new Date(this.log.internshipReportingParameters.endDate) :
            new Date();
    }

    public save() {
        if (this.log.workReportingParameters && this.deadlineDate) {
            this.log.workReportingParameters.upcomingDeadline = this.deadlineDate.toISOString();
        }
        if (this.log.internshipReportingParameters && this.startDate && this.endDate) {
            this.log.internshipReportingParameters.startDate = this.startDate.toISOString();
            this.log.internshipReportingParameters.endDate = this.endDate.toISOString();
        }
        this.dialogRef.close(this.log);
    }

    public close() {
        this.dialogRef.close();
    }
}

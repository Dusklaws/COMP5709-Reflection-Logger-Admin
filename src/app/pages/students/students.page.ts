import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';

import { ApiServce } from 'src/app/services/api.service';
import { User } from 'src/app/typings/user';
import { BaseChartDirective } from 'ng2-charts';

@Component({
    selector: 'app-students',
    templateUrl: './students.page.html',
    styleUrls: ['./students.page.scss']
})
export class StudentsPageComponent implements OnInit {

    public isPageReady = false;
    public students: User[];
    public fullStudents: User[];
    public nameFilter = '';
    public minFilter = 0;
    public maxFilter = 10;
    public helpFilter = false;

    constructor(private readonly apiService: ApiServce) { }

    public async ngOnInit(): Promise<void> {
        this.fullStudents = await this.apiService.getListOfStudents();
        this.filterStudents();
        this.isPageReady = true;
    }

    public filterStudents() {
        this.students = this.fullStudents.filter(s => {
            // Filter by name or email
            if (!s.name.toLowerCase().includes(this.nameFilter) &&
                !s.email.toLowerCase().includes(this.nameFilter)) {
                return;
            }
            // Filter by minimum average rating
            if (s.average < this.minFilter) {
                return;
            }
            // Filter by maximum average rating
            if (s.average > this.maxFilter) {
                return;
            }
            // Filter by if help is requested
            if (this.helpFilter && !s.helpRequested) {
                return;
            }
            return s;
        });
    }

    public async removeHelp(studentEmail: any) {
        const student = this.students.find(s => s.email === studentEmail);
        student.helpRequested = false;
        window.open(`mailto:${studentEmail}`);
        await this.apiService.removeHelp(studentEmail);
    }

}

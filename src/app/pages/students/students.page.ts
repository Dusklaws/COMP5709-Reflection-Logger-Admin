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

    public students: User[];

    constructor(private readonly apiService: ApiServce) { }

    public async ngOnInit(): Promise<void> {
        this.students = await this.apiService.getListOfStudents();
    }
    public async removeHelp(studentEmail: any) {
        const student = this.students.find(s => s.email === studentEmail);
        student.helpRequested = false;
        window.open(`mailto:${studentEmail}`);
        await this.apiService.removeHelp(studentEmail);
    }

}

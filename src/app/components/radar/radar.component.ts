import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ChartDataSets, RadialChartOptions } from 'chart.js';
import { Label, BaseChartDirective } from 'ng2-charts';
import { Log } from 'src/app/typings/log';

@Component({
    selector: 'app-radar',
    templateUrl: './radar.component.html',
    styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
    @Input() logParams: Log.CheckUpReportingParameters;
    @ViewChild(BaseChartDirective) chart: BaseChartDirective;


    public radarChartOptions: RadialChartOptions = {
        responsive: true,
        legend: {
            display: false
        },
        scale: {
            pointLabels: {
                fontSize: 15,
            },
            ticks: {
                beginAtZero: true,
                stepSize: 1,
                max: 5,
            }
        },
    };

    public radarChartLabels: Label[] = [
        'Ability',
        'Tools',
        'Support',
        'Experience',
        'Happiness'
    ];

    public radarChartData: ChartDataSets[];

    constructor() { }

    public ngOnInit() {
        this.updateData();
    }

    public updateData() {
        this.radarChartData = [
            {
                data: [
                    this.logParams.ability,
                    this.logParams.tools,
                    this.logParams.support,
                    this.logParams.learning,
                    this.logParams.likeness
                ],
                pointBackgroundColor: 'rgba(0, 0, 255, 0.6)',
                pointBorderColor: 'blue',
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.6)'
            },
        ];
    }
}

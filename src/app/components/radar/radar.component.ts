import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Log } from 'src/app/typings/log';

@Component({
    selector: 'app-radar',
    templateUrl: './radar.component.html',
    styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {
    @Input() logParams: Log.CheckUpReportingParameters;

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

    ngOnInit() {
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
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, BaseChartDirective } from 'ng2-charts';

import { User } from 'src/app/typings/user';

@Component({
    selector: 'app-barchart',
    templateUrl: './barchart.component.html',
    styleUrls: ['./barchart.component.scss']
})
export class BarchartComponent implements OnInit {
    @Input() history: User.History[];
    @ViewChild('historyChart') chart: BaseChartDirective;

    public barChartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{}], yAxes: [{
                ticks: {
                    stepSize: 1,
                    max: 10,
                    min: 0
                }
            }]
        },
        plugins: {
            datalabels: {
                anchor: 'end',
                align: 'end',
            }
        }
    };
    public barChartLabels: Label[] = [];
    public barChartType: ChartType = 'bar';
    public barChartLegend = false;
    public barChartPlugins = [pluginDataLabels];

    public barChartData: ChartDataSets[] = [
    ];

    ngOnInit() {
        if (this.history) {
            const chartData: ChartDataSets = { data: [] };
            for (const h of this.history) {
                chartData.data.push(h.rating);
                const date = (new Date(h.date));
                const label = `${date.getDate()}/${date.getMonth()}`;
                this.barChartLabels.push(label);
            }
            this.barChartData.push(chartData);
        }
    }
}

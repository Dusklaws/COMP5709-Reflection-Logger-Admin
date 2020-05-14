import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label, BaseChartDirective, Color } from 'ng2-charts';

import { User } from 'src/app/typings/user';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
    @Input() history: User.History[];
    @ViewChild('historyChart') chart: BaseChartDirective;

    public chartOptions: ChartOptions = {
        responsive: true,
        scales: {
            xAxes: [{}], yAxes: [{
                ticks: {
                    stepSize: 2,
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
    public chartLabels: Label[] = [];
    public chartType: ChartType = 'line';
    public chartLegend = false;
    public chartPlugins = [pluginDataLabels];
    public chartData: ChartDataSets[] = [];

    ngOnInit() {
        if (this.history) {
            const chartData: ChartDataSets = { data: [], backgroundColor: [], borderColor: [] };
            for (const h of this.history) {
                const date = (new Date(h.date));
                const label = `${date.getDate()}/${date.getMonth() + 1}`;
                chartData.data.push(h.rating);
                this.chartLabels.push(label);
            }
            chartData.pointBackgroundColor = ' rgba(0, 0, 255, 0.6)';
            chartData.pointBorderColor = ' blue';
            chartData.borderColor = 'blue';
            chartData.backgroundColor = `rgba(0, 0, 255, 0.6)`;
            this.chartData.push(chartData);
        }

    }
}

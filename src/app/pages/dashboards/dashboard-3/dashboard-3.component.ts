import { Component, OnDestroy, OnInit } from '@angular/core';

import { AmChartsService } from '@amcharts/amcharts3-angular';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { BasePageComponent } from '../../base-page/base-page.component';
import { AppState } from '../../../interfaces/app-state';
import { User } from '../../../ui/interfaces/user';
import { Message } from '../../../ui/interfaces/message';
import { timelineData } from './timeline-data';
import { messages } from './messages';

@Component({
  selector: 'page-dashboard-3',
  templateUrl: './dashboard-3.component.html',
  styleUrls: ['./dashboard-3.component.scss']
})
export class PageDashboard3Component extends BasePageComponent implements OnInit, OnDestroy {
  timelineData: any[] = timelineData;
  chart: any;
  activeUser: User;
  messages: Message[];

  pieChartData: ChartData<'pie'>;
  pieChartType: ChartType;
  pieChartOptions: ChartConfiguration['options'];

  doughnutChartData: ChartData<'doughnut'>;
  doughnutChartType: ChartType;
  doughnutChartOptions: ChartConfiguration['options'];

  polarAreaChartData: ChartData<'polarArea'>;
  polarAreaChartType: ChartType;
  polarAreaChartOptions: ChartConfiguration['options'];

  constructor(
    store: Store<AppState>,
    private AmCharts: AmChartsService
  ) {
    super(store);

    this.pageData = {
      title: 'Dashboard 3',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Main',
          route: './dashboard'
        },
        {
          title: 'Dashboards',
          route: './dashboard'
        },
        {
          title: 'Dashboard 3'
        }
      ]
    };

    this.activeUser = {
      name: 'Amanda Li',
      lastSeen: 'last seen 10 minutes ago',
      avatar: 'assets/content/avatar-4.jpg'
    };
    this.messages = messages;
    // Pie
    this.pieChartData = {
      labels: ['Angular', 'PHP', 'HTML'],
      datasets: [
        {
          data: [300, 500, 100],
          backgroundColor: ['#778391', '#5dade0', '#3c4e62'],
          hoverBackgroundColor: ['#899aaf', '#4095cb', '#222f3e']
        }
      ]
    };
    this.pieChartType = 'pie';
    this.pieChartOptions = {
      elements: {
        arc : {
          borderWidth: 0
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    };

    // Doughnut
    this.doughnutChartData = {
      labels: ['Angular', 'PHP', 'HTML'],
      datasets: [
        {
          data: [350, 450, 100],
          backgroundColor: ['#778391', '#ff8c00', '#3c4e62'],
          hoverBackgroundColor: ['#8e9daf', '#e0a65f', '#4e6278'],
          borderColor: ['#778391', '#ff8c00', '#3c4e62'],
          hoverBorderColor: ['#8e9daf', '#e0a65f', '#4e6278']
        }
      ]
    };
    this.doughnutChartType = 'doughnut';
    this.doughnutChartOptions = {
      elements: {
        arc : {
          borderWidth: 0
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    };

    // PolarArea
    this.polarAreaChartData = {
      labels: ['Angular', 'PHP', 'HTML'],
      datasets: [
        {
          data: [300, 400, 500],
          backgroundColor: ['#778391', '#dc143c', '#3c4e62'],
          hoverBackgroundColor: ['#5b6571', '#8e1029', '#232f3b']
        }
      ]
    };
    this.polarAreaChartType = 'polarArea';
    this.polarAreaChartOptions = {
      elements: {
        arc : {
          borderWidth: 0
        }
      },
      plugins: {
        tooltip: {
          enabled: false
        }
      }
    };
  }

  ngOnInit() {
    super.ngOnInit();

    setTimeout(() => {
      this.initCharts();
    });
  }

  ngOnDestroy() {
    super.ngOnDestroy();

    this.AmCharts.destroyChart(this.chart);
  }

  initCharts() {
    this.chart = this.AmCharts.makeChart('amchart-1', {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': [
        {
          'country': 'Lithuania',
          'litres': 501.9
        }, {
          'country': 'Czech Republic',
          'litres': 301.9
        }, {
          'country': 'Ireland',
          'litres': 201.1
        }, {
          'country': 'Germany',
          'litres': 165.8
        }, {
          'country': 'Australia',
          'litres': 139.9
        }, {
          'country': 'Austria',
          'litres': 128.3
        }, {
          'country': 'UK',
          'litres': 99
        }, {
          'country': 'Belgium',
          'litres': 60
        }, {
          'country': 'The Netherlands',
          'litres': 50
        }
      ],
      'pullOutRadius': 0,
      'labelRadius': -40,
      'valueField': 'litres',
      'titleField': 'country',
      'labelText': '[[litres]]',
      'balloon': {
        'fixedPosition': true
      }
    });

    this.chart = this.AmCharts.makeChart('amchart-2', {
      'type': 'pie',
      'theme': 'light',
      'dataProvider': [
        {
          'title': 'Chrome',
          'value': 70
        }, {
          'title': 'Firefox',
          'value': 15
        }, {
          'title': 'Opera',
          'value': 10
        }, {
          'title': 'Safari',
          'value': 12
        }, {
          'title': 'Edge',
          'value': 5
        }
      ],
      'titleField': 'title',
      'valueField': 'value',
      'labelRadius': -40,
      'radius': '46%',
      'innerRadius': '60%',
      'labelText': '[[title]]'
    });

    this.chart = this.AmCharts.makeChart('amchart-3', {
      'type': 'radar',
      'theme': 'light',
      'dataProvider': [
        {
          'country': 'Czech Republic',
          'litres': 156.9
        }, {
          'country': 'Ireland',
          'litres': 131.1
        }, {
          'country': 'Germany',
          'litres': 115.8
        }, {
          'country': 'Australia',
          'litres': 109.9
        }, {
          'country': 'Austria',
          'litres': 108.3
        }, {
          'country': 'UK',
          'litres': 99
        }
      ],
      'valueAxes': [ {
        'axisTitleOffset': 20,
        'minimum': 0,
        'axisAlpha': 0.15
      } ],
      'startDuration': 1,
      'graphs': [ {
        'balloonText': '[[value]] litres of beer per year',
        'bullet': 'round',
        'lineThickness': 2,
        'valueField': 'litres'
      } ],
      'categoryField': 'country'
    });
  }
}

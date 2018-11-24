import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    
})
export class AdminComponent implements OnInit {
  public pieChartLabels:string[] = ["BMW", "FERRARI", "HONDA"];
  public pieChartData:number[] = [21, 39, 10];
  public pieChartType:string = 'pie';
  public pieChartOptions:any = {'backgroundColor': [
               "#FF6384",
            "#4BC0C0",
            "#FFCE56"
            ]}

    constructor() { }

    ngOnInit(): void { }

     // events on slice click
    public chartClicked(e:any):void {
        console.log(e);
    }
    
    // event on pie chart slice hover
    public chartHovered(e:any):void {
        console.log(e);
    }
}

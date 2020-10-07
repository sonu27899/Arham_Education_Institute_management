import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Chart } from 'chart.js';
import { transaction_class } from "../classes/transaction_class";
import { animation } from '@angular/animations';

import { timer } from "rxjs";
import { FeesService } from '../services/fees.service';
import { exam_class } from '../classes/exam_class';
import { ExamService } from '../services/exam.service';
import { DashboardService } from '../services/dashboard.service';
;
export class OrderTableDetais
{
  constructor(
    public Order_id:number,
    public Fk_stock_id:number,
    public Fk_customer_id:number,
    public Quantity:number,
    public Status:string,
    public Color_name:string,
    public Size_name:string,
    public Product_name:string,
    public Product_price:number,

  ){}
}

export class StockTableDetais
{
  constructor(
    public Quantity:number,
    public Color_name:string,
    public Size_name:string,
    public Product_name:string,
    public Product_price:number,
    public Supplier_name:string
  ){}
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  pie_data:number[]=[0,0];

month:number=new Date().getMonth()+1 ;
  weekchart: number[] = [];
  i: number;

  pie_tot:number=0;
  exam_table:exam_class[]=[]
  transactiontable:transaction_class[]=[];
  exam_dataSource=new MatTableDataSource();

  exam_pageEvent: PageEvent;
  exam_displayedColumns: string[] = [    "Exam_name",
  "Batch_name",
  "Marks",
  "Time"
];

  trans_table:transaction_class[]=[]
  trans_dataSource=new MatTableDataSource();
  @ViewChild('examPaginator', {read: MatPaginator}) trans_paginator:MatPaginator;
  @ViewChild('examPaginator', {read: MatPaginator}) exam_paginator: MatPaginator;
  @ViewChild(MatSort) exam_sort: MatSort;
  @ViewChild(MatSort) trans_sort:MatSort;
  trans_pageEvent: PageEvent;
  trans_displayedColumns: string[] = ['Transaction_id','Name','Phone_no', 'Batch_name','Paid_amount','Date'];



  pie_name:string[]=['top1','top2','top3','top4','top5'];


  LineChart = [];
  BarChart = [];
  BarChart1 = [];
  PieChart=[];
  myPieChart=[];

  tmpdata_barfees:number[]=[];
  tmpdata_barsalary:number[]=[];
  tmpdata_line:number[]=[];
  totalquestion:number;
  totalstudent:number;
  totalbatch:number;
  totalfaculty:number;

  batch_name:string[]=[];
  percentage:number[]=[];



  postsSubscription:any;
  timespan:any;

  constructor(private _feeser:FeesService,private _examser:ExamService,private _dashser:DashboardService) { }

  ngOnInit() {

    for(this.i=0;this.i<12;this.i++)
    {
      this.tmpdata_barfees[this.i]=0;
      this.tmpdata_barsalary[this.i]=0;
      this.tmpdata_line[this.i]=0;
    }

//    console.log(this.tmpdata_barfees);

    this.refreshDatachart();
    this.refreshData();
    //order pageinatorhhff


}

private subscribeToData(): void {
  this.timespan = timer(100000)
  .subscribe(() => this.refreshData());
}

private refreshData(): void {

  this.subscribeToData();

  this._feeser.getTrans().subscribe((data:any)=>{
    this.trans_dataSource=data;
  this.trans_dataSource.paginator=this.trans_dataSource.paginator;
  this.trans_dataSource.sort=this.trans_dataSource.sort;
  });

  this._dashser.getAllBatch().subscribe((data:any)=>{
    this.totalbatch=data[0].cnt;
  });

  this._dashser.getAllFaculty().subscribe((data:any)=>{
    this.totalfaculty=data[0].cnt;
  });

  this._dashser.getAllStudent().subscribe((data:any)=>{
    this.totalstudent=data[0].cnt;
  });

  this._dashser.getAllperformance().subscribe((data:any)=>{

    console.log(data);
    this.batch_name=[];
    this.percentage=[];

    for(let y=0;y<data.length;y++)
    {
      this.batch_name.push(data[y].batch_name);
      this.percentage.push((data[y].obtained_marks*100)/data[y].total_marks);
    }


    this.BarChart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: this.batch_name,
        datasets: [{
          label: "Batch wise Performance",
          data: this.percentage,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          //backgroundColor:"blue",
          borderWidth: 1
        }],
      },



      options: {
        title: {
          text: "Bar Chart",
          display: true,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],
          xAxes: [{
            ticks: {

              beginAtZero: true
            }
          }]
        },
        animations:
        {
          animationScale:true
        }
      }
      }

  );
    });

  this._dashser.getAllQuestion().subscribe((data:any)=>{
    this.totalquestion=data[0].cnt;
  });


  this.trans_dataSource.paginator=this.trans_dataSource.paginator;
  this.trans_dataSource.sort=this.trans_sort;
  this._examser.examBybatch().subscribe((data:any)=>{
    console.log(data);
    this.exam_table=data;
    this.exam_dataSource.data=this.exam_table;
    this.exam_dataSource.sort = this.exam_sort;

    this.  exam_dataSource.paginator = this.exam_paginator;
    this.  exam_dataSource.sort = this.exam_sort;

  });




  this._dashser.TotalFeesget().subscribe((data:any)=>{
    console.log(data);
    for(this.i=0;this.i<data.length;this.i++)
    {
      this.tmpdata_barfees[data[this.i].MONTH]=data[this.i].total;
    }

  })


  this._dashser.TotalSalaryPay().subscribe((data:any)=>{
    console.log(data);
    for(this.i=0;this.i<data.length;this.i++)
    {
      this.tmpdata_barsalary[data[this.i].MONTH]=data[this.i].total;
    }
    console.log(this.tmpdata_barsalary);
    console.log(this.tmpdata_barfees);


    this.pie_data[0]=(this.tmpdata_barsalary[this.month]*100)/(this.tmpdata_barfees[this.month]+this.tmpdata_barsalary[this.month]);
    this.pie_data[1]=(this.tmpdata_barfees[this.month]*100)/(this.tmpdata_barfees[this.month]+this.tmpdata_barsalary[this.month]);
    this.PieChart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: ["Salary","Fees"],
        datasets: [{
          label: "",
          backgroundColor:["rgb(230,149,13)","rgb(252,2,128)"],

          data: this.pie_data,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Pie Chart",
          display: true,
        },
        legend: {
          display: true,
          fullWidth: true,
          labels: {
            fontSize: 20,
            fontColor: 'black',
          }
        },
        animations:
        {
          animationScale:true
        }
      },

    });




  // this.BarChart = new Chart('barchart', {
  //   type: 'bar',
  //   data: {
  //     labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sept","Oct","Nov","Dec"],
  //     datasets: [{
  //       label: "Salary Pay From This Month",
  //       data: [this.tmpdata_barsalary[1],this.tmpdata_barsalary[2],this.tmpdata_barsalary[3],this.tmpdata_barsalary[4],this.tmpdata_barsalary[5],this.tmpdata_barsalary[6],this.tmpdata_barsalary[7],this.tmpdata_barsalary[8],this.tmpdata_barsalary[9],this.tmpdata_barsalary[10],this.tmpdata_barsalary[11],this.tmpdata_barsalary[12]],
  //       fill: true,
  //       lineTension: 0.2,
  //       borderColor: "white",
  //       //backgroundColor:"blue",
  //       borderWidth: 1
  //     },
  //     {
  //       label: "Fees Get From This Month",
  //       data: [this.tmpdata_barfees[1],this.tmpdata_barfees[2],this.tmpdata_barfees[3],this.tmpdata_barfees[4],this.tmpdata_barfees[5],this.tmpdata_barfees[6],this.tmpdata_barfees[7],this.tmpdata_barfees[8],this.tmpdata_barfees[9],this.tmpdata_barfees[10],this.tmpdata_barfees[11],this.tmpdata_barfees[12]],
  //   //    data: this.offline_customer,
  //       fill: true,
  //       lineTension: 0.2,
  //       borderColor: "white",
  //       borderWidth: 1

  //     }],
  //   },



  //   options: {
  //     title: {
  //       text: "Bar Chart",
  //       display: true,
  //     },
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }],
  //       xAxes: [{
  //         ticks: {

  //           beginAtZero: true
  //         }
  //       }]
  //     },
  //     animations:
  //     {
  //       animationScale:true
  //     }
  //   }
  //   });

  })



}

private subscribeToDataforchart(): void {
  this.timespan = timer(3000000)
  .subscribe(() => this.refreshDatachart());
}


private refreshDatachart(): void {

  this.subscribeToDataforchart();

  this._dashser.TotalExamget().subscribe((data:any)=>{

    console.log(data);
    for(this.i=0;this.i<data.length;this.i++)
    {
      this.tmpdata_line[data[this.i].MONTH]=data[this.i].COUNT;
    }

    console.log(this.tmpdata_line);
    this.LineChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: ["Jan", "Feb", "March", "April", "May", "June","July","Aug","Sept","Oct","Nov","Dec"],
        datasets: [{
          label: "Exam Taken By Per Month",
          data: [this.tmpdata_line[1],this.tmpdata_line[2],this.tmpdata_line[3],this.tmpdata_line[4],this.tmpdata_line[5],this.tmpdata_line[6],this.tmpdata_line[7],this.tmpdata_line[8],this.tmpdata_line[9],this.tmpdata_line[10],this.tmpdata_line[11],0],
          //data:this.tmpdata_line,
          fill: true,
          lineTension: 0.2,
          borderColor: "white",
          //backgroundColor:"blue",
          borderWidth: 1
        }]
      },
      options: {
        title: {
          text: "Line Chart",
          display: true,
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }],




          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        animations:
        {
          animationScale:true
        }
      }
    });


  })

   //weekchartdetails



  //linchart




//barchart






}



}

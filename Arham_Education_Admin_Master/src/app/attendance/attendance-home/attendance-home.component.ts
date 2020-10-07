import { Component, OnInit, ViewChild } from '@angular/core';
import { BatchService } from 'src/app/Services/batch.service';
import { StudentService } from 'src/app/services/student.service';
import { AttendanceService } from 'src/app/services/attendance.service';
import { batch_class } from 'src/app/classes/batch_class';
import { student_class } from 'src/app/classes/student_class';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AttendanceDetailsComponent } from '../attendance-details/attendance-details.component';

class atten_table
{
  constructor(public Student_id:number,public Student_name:string,public Absent_days:number,public Present_days:number,public Total_days:number,public Percentage:number){}
}

@Component({
  selector: 'app-attendance-home',
  templateUrl: './attendance-home.component.html',
  styleUrls: ['./attendance-home.component.css']
})
export class AttendanceHomeComponent implements OnInit {

  Batch_no:number;
  batches:batch_class[];
  students:student_class[];
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=false;
  Attendance_dataSource=new MatTableDataSource();
  no_of_present_days:number=0;
  no_of_absent_days:number=0;
  absent_percenatge:number;
  att_table:atten_table[]=[];

  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();

  displayedColumns: string[] = ['Student_name','Absent_days','Present_days','Total_days','Percentage','action'];

  Attendance_details(arr:atten_table)
  {
    console.log(arr.Student_id);
    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(AttendanceDetailsComponent,{
        data: {id : arr.Student_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }

  onbatchSelect()
  {
    this.att_table=[];
    this.flag=false;
    setTimeout(() => {
      this.flag=true;
    }, 1000);

    console.log(this.Batch_no);
    this.student_ser.getStudentByBatchId(this.Batch_no).subscribe(
      (data:student_class[])=>
      {

        console.log(data);
        this.students=data;
        let i;
        for(i=0;i<data.length;i++)
        {
          this.att_ser.getStudentAttendanceByStudentId(data[i].Student_id).subscribe(
            (data1:any[])=>
            {
              console.log(data1);
              let  j;
              this.no_of_absent_days=0;
              this.no_of_present_days=0;
              for(j=0;j<data1.length;j++)
              {


                if(data1[j].Status)
                {
                  this.no_of_present_days++;
                }
                else
                {
                  this.no_of_absent_days++;
                }
              }
              if(j==data1.length)
              {
                this.absent_percenatge=(this.no_of_absent_days*100)/(this.no_of_absent_days+this.no_of_present_days)
                this.att_table.push(new atten_table(data1[0].Student_id,data1[0].Name+" "+data1[0].Last_name,this.no_of_absent_days,this.no_of_present_days,this.no_of_absent_days+this.no_of_present_days,this.absent_percenatge));
              }
            }
          );


        }
        if(i==data.length)
        {
          this.Attendance_dataSource.data=this.att_table;
          this.Attendance_dataSource.sort=this.sort;
          this.Attendance_dataSource.paginator = this.paginator;
          console.log(this.att_table);
          console.log(this.Attendance_dataSource.data);
        }


      }
    );

  }

  checkedItems(arr)
  {

  }

  Add_attendance()
  {
    this.route.navigate(["/menu/add_attedance"]);
  }


  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private route:Router ,private batch_ser:BatchService,private student_ser:StudentService,private att_ser:AttendanceService) { }

  ngOnInit() {

    this.batch_ser.getAllBatch().subscribe(
      (data:batch_class[])=>
      {
        this.batches=data;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.Attendance_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Attendance_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }

  }



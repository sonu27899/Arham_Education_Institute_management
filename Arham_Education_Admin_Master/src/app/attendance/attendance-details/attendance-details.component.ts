import { Component, OnInit, Input, ViewEncapsulation, Inject } from '@angular/core';
import { attendance_class } from 'src/app/classes/attendance_class';
import { AttendanceService } from 'src/app/services/attendance.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AttendanceHomeComponent } from '../attendance-home/attendance-home.component';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {
  student_id:number;
  someDateArray: Date[] = [];
  public flag:boolean=false;

  constructor(private att_ser:AttendanceService,private _act:ActivatedRoute,public dialogRef: MatDialogRef<AttendanceHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {

    this.student_id=this._act.snapshot.params["id"];
    this.student_id=this.data.id;



    console.log(this.student_id);
    this.att_ser.getStudentAttendanceByStudentId(this.student_id).subscribe(
      (data:attendance_class[])=>
      {
        console.log(data);
        for(let i=0;i<data.length;i++)
        {
          if(data[i].Status==false)
          {
            this.someDateArray.push(new Date(data[i].Date));
          }
          if(i==data.length-1)
          {
            this.flag=true;
          }


        }

      }
    );

  }


}


@Component({
  selector: 'highlighted-dates',
  template: `
<br>

<mat-card class="example-card">
<div class="calendar-wrapper">
  <mat-calendar #calendar [dateClass]="dateClass">
  </mat-calendar>
</div>
</mat-card>

  `,
  styleUrls: ['./attendance-details.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HighlightedDatesComponent {


  public _datesArray: Date[];
  @Input()
  get datesArray(): Date[] { return this._datesArray; }
  set datesArray(d: Date[]) {
    this._datesArray = d;

    this._setupClassFunction();
  }

  dateClass: (d: Date) => any;

  private _setupClassFunction() {

    this.dateClass = (d: any) => {

      let selected = false;
      //console.log(selected);
      if (this._datesArray) {
        //console.log(d);
        selected = this._datesArray.some(
          (item: Date) =>
          item.getFullYear() === d._i.year
          && item.getDate() === d._i.date
          && item.getMonth() === d._i.month);
      }

      return selected ? 'example-custom-date-class' : '.mat-calendar-body-cell-content';

    }
  }
}


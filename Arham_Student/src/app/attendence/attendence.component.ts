import { Component, OnInit,ViewEncapsulation, Input } from '@angular/core';
import { AttendenceService } from '../services/attendence.service';
import { attendencr_class } from '../classes/attendence_class';

@Component({
  selector: 'app-attendence',
  templateUrl: './attendence.component.html',
  styleUrls: ['./attendence.component.css']
})
export class AttendenceComponent implements OnInit {
  student_id:number;
  someDateArray: Date[] = [];
    public flag:boolean=false;


  constructor(private att_ser:AttendenceService) { }

  ngOnInit(): void {
    this.student_id=Number(localStorage.getItem('student_id'));
    this.att_ser.getAttendenceByStudentId(this.student_id).subscribe(
      (data:attendencr_class[])=>
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
<br><br>
<div class="row">
  <div class="col-md-8">
<mat-card class="example-card">
<div class="calendar-wrapper">
  <mat-calendar #calendar [dateClass]="dateClass">
  </mat-calendar>
</div>
</mat-card>
</div>
<div class="col-md-4">
  <mat-card class="info-card">
      <mat-card-content>


      <div class="absent_class"> &nbsp;&nbsp; Total ABSENT DAYS : {{_datesArray.length}} &nbsp;&nbsp; </div>
      </mat-card-content>
  </mat-card>
</div>

</div>

  `,
  styleUrls: ['./attendence.component.css'],
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


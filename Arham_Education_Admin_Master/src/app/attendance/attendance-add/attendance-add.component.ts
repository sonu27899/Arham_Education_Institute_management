import { Component, OnInit } from '@angular/core';
import { BatchService } from 'src/app/Services/batch.service';
import { batch_class } from 'src/app/classes/batch_class';
import { StudentService } from 'src/app/services/student.service';
import { student_class } from 'src/app/classes/student_class';
import { AttendanceService } from 'src/app/services/attendance.service';
import { attendance_class } from 'src/app/classes/attendance_class';
import { Router } from '@angular/router';


class stu_abs
{
  constructor(
  public Student_id:number,
  public Status:boolean){}
}

@Component({
  selector: 'app-attendance-add',
  templateUrl: './attendance-add.component.html',
  styleUrls: ['./attendance-add.component.css']
})
export class AttendanceAddComponent implements OnInit {

  i:number=0;
  flag:number=0;
  flag1:boolean=true;
  batches:batch_class[];
  students:student_class[];
  Batch_no:number;
  student_abs:stu_abs[]=[];

  constructor(private _router:Router,private batch_ser:BatchService,private student_ser:StudentService,private att_ser:AttendanceService) { }


  onbatchSelect()
  {
    console.log(this.Batch_no);

this.att_ser.attendance_status().subscribe(
  (data:any)=>{
    if(data.length==0)
    {
      this.flag=0;
      this.flag1=true;
      console.log('no');
    }
    else
    {
      for(this.i=0;this.i<data.length;this.i++)
      {
        if(this.Batch_no==data[this.i].Batch_no)
        {
          this.flag=1;
          this.flag1=false;
          console.log('yes');
          alert('Attendance is already taken for this batch');
          this._router.navigate['menu/attedance_home'];
          break;
        }

        else
        {
          this.flag=0;
          this.flag1=true;

        }
      }
    }
      console.log(this.flag);
      if(this.flag==0)
      {
        this.student_ser.getStudentByBatchId(this.Batch_no).subscribe(
          (data:student_class[])=>
          {
            console.log(data);
            this.students=data;
            for(let i=0;i<data.length;i++)
            {
              this.student_abs.push(new stu_abs(data[i].Student_id,true));
            }
          }
        );

      }
  }
);


  }

  onChange(index)
  {
    if(this.student_abs[index].Status)
    this.student_abs[index].Status=false;
    else
    this.student_abs[index].Status=true;

    console.log(this.student_abs[index]);
  }

  onclickCancle()
  {
    this._router.navigate(['menu/attedance_home']);
  }

  onclickAdd()
  {
    let x=0;

    for(x=0;x<this.student_abs.length;x++)
    {

        this.att_ser.addAttendance(new attendance_class(this.student_abs[x].Student_id,this.student_abs[x].Status)).subscribe(
          (data:any)=>
          {
            console.log(data);
            if(data.errno== 1062)
            {

              x=this.student_abs.length;




            }
          }

        );


    }
    this._router.navigate(['menu/attedance_home']);
    // if((x==this.student_abs.length) )
    //   {

    //   }


  }



  ngOnInit() {
    this.batch_ser.getAllBatch().subscribe(
      (data:batch_class[])=>
      {
        this.batches=data;
      }
    );
  }

}

import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { StudentService } from '../services/student.service';
import { LoginService } from '../services/login.service';
import { ExamService } from '../services/exam.service';
import { exam_class } from '../classes/exam_class';
import { FeesService } from '../services/fees.service';
import { fees_class } from '../classes/fees_class';
import { AttendenceService } from '../services/attendence.service';
import { result_class } from '../classes/result_class';
import { ResultService } from '../services/result.service';
import { AnnouncementService } from '../services/announcement.service';
import { announcement_class } from '../classes/announcement_class';


class UserData {
  constructor(
  public Exam_name:string,
  public Total_marks:number,
  public obtained_marks:number,
  public percent:number,
  public date:Date){}
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Name:string;
  Batch_no:number;
  Batch_id:number;
  Email_id:string;
  Phone_no:string;
  Last_name:string;
  Middle_name:string;
  Parent_name:string;
  Parent_mobile_no:string;
  Address:string;
  Date_of_birth:Date;
  Status:number;
  Fees:number;
  Joining_date:Date;
  student_id:number;
  pending_exam:number=0;
  due_fees:number=0;
  abs_days:number=0;
  total_percentage:number=0;
  t_marks:number=0;
  t_total:number=0;
  gender:boolean;
  table_res_Data:UserData[]=[];
  latest_announcement:announcement_class;


  displayedColumns: string[] = ['Exam_name','Total_marks','obtained_marks','percent','date'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private ans_ser:AnnouncementService,private log_ser:LoginService,private exam_ser:ExamService,private fees_ser:FeesService,private abs_ser:AttendenceService,private res_ser:ResultService) { }

  ngOnInit(): void {



    this.student_id=Number(localStorage.getItem('student_id'));
    this.Email_id=localStorage.getItem('email_id');
    this.log_ser.getstudentById(this.Email_id).subscribe(
      (data:any[])=>
      {
		  console.log(data[0]);
		  console.log(data[0].Middle_name);
        this.Name=data[0].Name+" "+data[0].Middle_name+" "+data[0].Last_name;
        this.Batch_no=data[0].Batch_name;
        this.Phone_no=data[0].Phone_no;
        this.Parent_name=data[0].Parent_name;
        this.Parent_mobile_no=data[0].Parent_mobile_no;
        this.Address=data[0].Address;
        this.Date_of_birth=data[0].Date_of_birth;
        this.Fees=data[0].Fees;
        this.Joining_date=data[0].Joining_date;
        this.Batch_id=data[0].Batch_no;
        this.gender=data[0].Gender;

        this.exam_ser.getExambyBatchStudentId(this.student_id,this.Batch_id).subscribe(
          (data:exam_class[])=>
          {
            this.pending_exam=data.length;
          }
        );

        this.fees_ser.getFeeByStudentId(this.student_id).subscribe(
          (data:fees_class[])=>
          {
            this.due_fees=this.Fees;
            for(let i=0;i<data.length;i++)
            {
              this.due_fees-=data[i].Paid_amount;
            }
          }
        );

          this.ans_ser.getAnnouncementByBatchId(this.Batch_id).subscribe(
            (data2:announcement_class[])=>
            {
              console.log(data2);
              this.latest_announcement=data2[0];
              console.log(this.latest_announcement);
            }
          );

          this.abs_ser.getAttendenceByStudentId(this.student_id).subscribe(
            (data:any[])=>
            {
              console.log(data);
              for(let i=0;i<data.length;i++)
              {
                if(data[i].Status==false)
                {
                  this.abs_days++;
                }
              }
  
            }
          );
  

        this.res_ser.getAllResultById(this.student_id).subscribe(
          (data1:any[])=>
          {
            console.log(data1);
            let j=0;
            if(data1.length!=0)
            {
              for(j=0;j<data1.length;j++)
              {
                this.t_marks+=data1[j].Obtained_Marks;
                this.t_total+=data1[j].Marks;
                let percent=((data1[j].Obtained_Marks*100)/data1[j].Marks);
                this.table_res_Data.push(new UserData(data1[j].Exam_name,data1[j].Marks,data1[j].Obtained_Marks,percent,data1[j].Date));
                console.log(percent);
              }
              console.log(j);
              if(j==data1.length)
              {
                this.dataSource = new MatTableDataSource(this.table_res_Data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
                this.total_percentage=(this.t_marks*100)/this.t_total;
              console.log(this.dataSource.data);
              }
            }


          }
        );


      }
    );




  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

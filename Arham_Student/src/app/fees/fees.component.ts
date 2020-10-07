import { Component, OnInit } from '@angular/core';
import { fees_class } from '../classes/fees_class';
import { LoginService } from '../services/login.service';
import { student_class } from '../classes/student_class';
import { FeesService } from '../services/fees.service';
import { Router } from '@angular/router';

const ELEMENT_DATA: fees_class[] = [
  {Transaction_id: 1, Date: new Date('12-6-2019'), Paid_amount: 5000 , Student_id:1 },
  {Transaction_id: 2, Date: new Date('1-4-2019'), Paid_amount: 3000, Student_id:1},
  {Transaction_id: 3, Date: new Date('1-6-2019'), Paid_amount: 2000, Student_id:1}
];


@Component({
  selector: 'app-fees',
  templateUrl: './fees.component.html',
  styleUrls: ['./fees.component.css']
})
export class FeesComponent implements OnInit {
  studentName:string;
  studentLastName:string;
  studentId:number;
  studentCourse:string;
  totalFeeAmount: number;
  pendingFeeAmount: number;
  searchStudentFlag: boolean = true;
  feePaymentFlag:boolean = false;
  fees_trans:fees_class[]=[];
  displayedColumns: string[] = [ 'paymentDate', 'paymentAmount'];
  dataSource = null;

  constructor(private log_ser:LoginService,private fee_ser:FeesService,private _router:Router) { }


  ngOnInit(): void {
    this.studentId=Number(localStorage.getItem('student_id'));
    this.log_ser.getstudentById(localStorage.getItem('email_id')).subscribe(
      (data:student_class[])=>
      {
        console.log(data);
        this.studentName=data[0].Name;
        this.studentLastName=data[0].Last_name;
        this.totalFeeAmount=data[0].Fees;
        this.pendingFeeAmount=this.totalFeeAmount;
      }
    );

    this.fee_ser.getFeeByStudentId(this.studentId).subscribe(
      (data:fees_class[])=>
        {
          this.fees_trans=data;
          this.dataSource=data;
          for(let i=0;i<data.length;i++)
          {
            this.pendingFeeAmount-=data[i].Paid_amount;
          }
          console.log(data);
        }
    );




  }

}

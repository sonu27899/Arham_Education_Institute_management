import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../services/announcement.service';
import { LoginService } from '../services/login.service';
import { announcement_class } from '../classes/announcement_class';
import { student_class } from '../classes/student_class';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {

  student_id:number;
  batch_id:number;
  announcements:announcement_class[]=[];
  constructor(private ans_ser:AnnouncementService,private log_ser:LoginService) { }

  ngOnInit(): void {

    this.student_id=Number(localStorage.getItem('student_id'));

    this.log_ser.getstudentById(localStorage.getItem('email_id')).subscribe(
      (data:student_class[])=>
      {
        this.batch_id=data[0].Batch_no;
        this.ans_ser.getAnnouncementByBatchId(this.batch_id).subscribe(
          (data1:announcement_class[])=>
          {
            this.announcements=data1;
            console.log(this.announcements);
          }
        );
      }
    );


  }

}

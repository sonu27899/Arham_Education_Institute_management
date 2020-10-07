import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SubjectService } from '../../services/subject.service';
import {subject_class} from '../../classes/subject_class';
import { Router, ActivatedRoute } from '@angular/router';
import {SubjectHomeComponent } from '../subject-home/subject-home.component';

@Component({
  selector: 'app-subject-update',
  templateUrl: './subject-update.component.html',
  styleUrls: ['./subject-update.component.css']
})
export class SubjectUpdateComponent implements OnInit {
  Subject_arr:subject_class[];
  Name:string;
  flag:boolean=false;
  i:number;
  Subject_id:number;
  tmp_subject_data:subject_class
  constructor(private _act:ActivatedRoute,private _ser:SubjectService,private _router:Router,public dialogRef: MatDialogRef<SubjectHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.flag=true;
    this.Subject_id=this._act.snapshot.params["id"];
    this.Subject_id=this.data.id;
    this._ser.getSubjectById(this.Subject_id).subscribe(
      (data:subject_class[])=>
      {
        this.tmp_subject_data=data[0];
        this.Name=this.tmp_subject_data.Name;
        //console.log(this.Size_name);
      }
    );
  }

  onclickUpdate()
  {
    //console.log("xyz");
    if(this.flag==true)
    {
      this._ser.updateSubject(new subject_class(this.Name),this.Subject_id).subscribe(
        (data:any)=>
        {

          if(data.errno==1062)
          {
            alert('Already in Your List');
          }
          else
          {
            console.log(data);
            alert("Subject updated");
          }

          this.dialogRef.close();
          this._router.navigate(['menu/subject_home']);
        }

      );
    }

  }

  onclickCancle()
  {
    this.flag=false;
    if(this.flag==false)
  {
    this.dialogRef.close();
    this._router.navigate(['menu/subject_home']);
  }
  }


}

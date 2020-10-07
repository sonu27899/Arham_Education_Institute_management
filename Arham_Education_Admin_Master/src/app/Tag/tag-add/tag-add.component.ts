import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TagService} from '../../services/tag.service';
import {tag_class} from '../../classes/tag_class';
import { Router, ActivatedRoute } from '@angular/router';
import {TagHomeComponent} from '../tag-home/tag-home.component';
import {SubjectService } from '../../services/subject.service';
import {subject_class} from '../../classes/subject_class';


@Component({
  selector: 'app-tag-add',
  templateUrl: './tag-add.component.html',
  styleUrls: ['./tag-add.component.css']
})
export class TagAddComponent implements OnInit {
  Tag_arr:tag_class[];
  Name:string="";
  Subject_id:number=0;
  sub_name:subject_class;
  Status:number=1;
  flag:boolean=false;
  i:number;
  subject_list:subject_class[]=[];
  Faculty_type:number;

  constructor(private _sub:SubjectService,private _ser:TagService,private _router:Router,private matDialog:MatDialogRef<TagHomeComponent>,private _act:ActivatedRoute) {
  }
  ngOnInit() {

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this._router.navigate(['menu']);
    }


    this._sub.getAllSubject().subscribe((data:subject_class[])=>{
      this.subject_list=data;
    });
    this.flag=true;
  }

  keyPressText(event: any)
  {
  const pattern = /[A-Z\a-z\&\-\@ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    // console.log(inputChar, e.charCode);
       if (!pattern.test(inputChar) || this.Name.length>=20) {
       // invalid character, prevent input
           event.preventDefault();
      }
  }


  onclickAdd()
  {
    console.log(this.sub_name);

    if(this.flag==true)
    {

   this._ser.addTag(new tag_class(this.Name,this.sub_name.Subject_id)).subscribe(
     (data:any)=>
     {
       if(data.errno==1062)
       {
        alert('Topic already exits');

       }
       else
       {
        console.log(data);
       }

       this._router.navigate(['menu/tag_home']);
       //this.currentdialog.close();
       this.matDialog.close();
     }
   );
  }
  }
 onclickCancle()
 {
  this.flag=false;
  if(this.flag==false)
  {
    console.log(this.flag);
    this.matDialog.close();
    this._router.navigate(['menu/tag_home']);
   //this._router.navigate(['menu/color_home']);

 }

 }


}


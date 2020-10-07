import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { batch_class } from "../../classes/batch_class";
import {BatchService } from '../../Services/batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchHomeComponent } from '../batch-home/batch-home.component';

@Component({
  selector: 'app-batch-add',
  templateUrl: './batch-add.component.html',
  styleUrls: ['./batch-add.component.css']
})
export class BatchAddComponent implements OnInit {
  batch_arr:batch_class[];
  Batch_name:string;
  flag:boolean=false;
  i:number;

  constructor(private _ser:BatchService,private _router:Router,private matDialog:MatDialogRef<BatchHomeComponent>,private _act:ActivatedRoute) { }

  ngOnInit() {
    this.flag=true;
    this._ser.getAllBatch().subscribe(
      (data:batch_class[])=>
      {
        this.batch_arr=data;
      }
    );

  }
  onclickAdd()
  {
    if(this.flag==true)
    {

   this._ser.addBatch(new batch_class(this.Batch_name.toUpperCase())).subscribe(
     (data:any)=>
     {
       if(data.errno==1062)
       {
        alert('Batch already exits');
       }
       else
       {
        console.log(data);
       }

       this._router.navigate(['menu/batch_home']);
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
    this._router.navigate(['menu/batch_home']);
   //this._router.navigate(['menu/color_home']);

 }

 }


}

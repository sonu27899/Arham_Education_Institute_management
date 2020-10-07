import { Component, OnInit ,Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { batch_class } from "../../classes/batch_class";
import {BatchService } from '../../Services/batch.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchHomeComponent } from '../batch-home/batch-home.component';


@Component({
  selector: 'app-batch-update',
  templateUrl: './batch-update.component.html',
  styleUrls: ['./batch-update.component.css']
})
export class BatchUpdateComponent implements OnInit {
  batch_arr:batch_class[];
  Batch_name:string;
  flag:boolean=false;
  i:number;
  Batch_id:number;
  tmp_batch_data:batch_class
  constructor(private _act:ActivatedRoute,private _ser:BatchService,private _router:Router,public dialogRef: MatDialogRef<BatchHomeComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.flag=true;
    this.Batch_id=this._act.snapshot.params["id"];
    this.Batch_id=this.data.id;
    this._ser.getBatchById(this.Batch_id).subscribe(
      (data:batch_class[])=>
      {
        this.tmp_batch_data=data[0];
        this.Batch_name=this.tmp_batch_data.Batch_name;
        //console.log(this.Size_name);
      }
    );
  }

  onclickupdate()
  {
    //console.log("xyz");
    if(this.flag==true)
    {
      this._ser.updateBatch(new batch_class(this.Batch_name),this.Batch_id).subscribe(
        (data:any)=>
        {

          if(data.errno==1062)
          {
            alert('Already in Your List');
          }
          else
          {
            console.log(data);
            alert("batch updated");
          }

          this.dialogRef.close();
          this._router.navigate(['menu/batch_home']);
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
    this._router.navigate(['menu/batch_home']);
  }
  }


}

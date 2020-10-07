import { Component, OnInit, Inject } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AvailableTestComponent } from '../available-test/available-test.component';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  exam_id:number;
  constructor(private _router:Router,private _act:ActivatedRoute,public dialogRef: MatDialogRef<AvailableTestComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  onClickExam()
  {

    this.dialogRef.close();
  this._router.navigate(['./live_exam/'+this.exam_id]);
  }
  onClickBack()
  {
    this.dialogRef.close();
    this._router.navigate(['menu/available-test']);
  }

  ngOnInit(): void {
    this.exam_id=this.data.id;

  }

}

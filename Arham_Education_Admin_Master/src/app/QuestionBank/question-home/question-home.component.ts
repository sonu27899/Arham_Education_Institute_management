import { Component, OnInit,ViewChild } from '@angular/core';
import {AddquestionService } from '../../services/addquestion.service';
import {questions_class} from '../../classes/questions_class';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { QuestionViewComponent } from '../question-view/question-view.component';


@Component({
  selector: 'app-question-home',
  templateUrl: './question-home.component.html',
  styleUrls: ['./question-home.component.css']
})
export class QuestionHomeComponent implements OnInit {
  Question_arr:questions_class[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  Question_list:questions_class[]=[];
  Question_delarr:questions_class[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  Question_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=true;
role:number;
id:number;
  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:AddquestionService,private route:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
    this.id=parseInt(localStorage.getItem('faculty_id'));

  }
  displayedColumns: string[] = ['Action1','Question_id','Difficulty','Topic_Name','View_Question','Action'];
  ngOnInit() {
    this.flag=true;


    if(this.role==1)
    {
      this._ser.getAllQuestion().subscribe(
        (data:any)=>{
          console.log(data);
          this.Question_dataSource.paginator=this.paginator;
          this.Question_dataSource.sort=this.sort;
          this.Question_arr=data;
          this.Question_dataSource.data= data;
          this.Question_dataSource.sort=this.sort;

    }
  );
    }

    else
    {
      this._ser.getQuestionByFaculty(this.id).subscribe(
        (data:any)=>{
          console.log(data);
          this.Question_dataSource.paginator=this.paginator;
          this.Question_dataSource.sort=this.sort;
          this.Question_arr=data;
          this.Question_dataSource.data= data;
          this.Question_dataSource.sort=this.sort;

      }
      );
    }

}
view_question(arr:questions_class  ){

  this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
    if(this.currentdialog)
    {
      this.currentdialog.close();
      this.ngOnInit();
    }
    this.currentdialog=this.matDialog.open(QuestionViewComponent,{
      data: {id : arr.Question_id}
    });
    this.currentdialog.afterClosed().subscribe(result => {
      console.log('the dailog was closed');
      this.ngOnInit();

    })
  });

}

Add_Question(){
  this.route.navigate(['menu/add_question']);
}
Delete_Question(arr){
  this._ser.deleteQuestion(arr.Question_id).subscribe((data: any) => {
    console.log(data);
    this.ngOnInit();
  });


}

isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.Question_dataSource.data.length;
  return numSelected === numRows;
}

masterToggle() {
  this.isAllSelected()
    ? this.selection.clear()
    : this.Question_dataSource.data.forEach(row => this.selection.select(row));
}
applyFilter(filterValue: string) {
  this.Question_dataSource.filter = filterValue.trim().toLowerCase();
  if(this.Question_dataSource.filteredData.length==0)
  {
    //console.log('in1');
    this.flag=false;
  }
  else
  {
    this.flag=true;
  }
}
checkedItems(item:questions_class) {
  if (this.Question_delarr.find(x => x == item)) {
    this.Question_delarr.splice(this.Question_delarr.indexOf(item), 1);
  } else {
    this.Question_delarr.push(item);
  }
  console.log(this.Question_delarr);
}
i: number = 0;

selectedDelete() {
  this._ser.deleteAll(this.Question_delarr).subscribe((data: any) => {
    console.log(data);
    for (this.i = 0; this.i < this.Question_delarr.length; this.i++) {
      if (this.Question_list.find(x => x == this.Question_delarr[this.i])) {
        this.Question_list.splice(this.Question_list.indexOf(this.Question_delarr[this.i]), 1);
      }
    }
    this.Question_dataSource.data = this.Question_list;
    this.ngOnInit();
  });
}
Question_Update(item){
  this.route.navigate(["/menu/update_question", item.Question_id])
}

}

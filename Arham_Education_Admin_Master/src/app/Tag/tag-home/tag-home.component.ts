import { Component, OnInit,ViewChild } from '@angular/core';
import { TagService} from '../../services/tag.service';
import {tag_class} from '../../classes/tag_class';
import {MatTableDataSource} from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent, MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelectionModel } from "@angular/cdk/collections";
import { Subject } from "rxjs";
import { TagAddComponent } from '../tag-add/tag-add.component';
import {TagUpdateComponent } from '../tag-update/tag-update.component';
@Component({
  selector: 'app-tag-home',
  templateUrl: './tag-home.component.html',
  styleUrls: ['./tag-home.component.css']
})
export class TagHomeComponent implements OnInit {
  Tag_arr:tag_class[];
  currentdialog:MatDialogRef<any>=null;
  destroy=new Subject<any>();
  Tag_list:tag_class[]=[];
  Tag_delarr:tag_class[]=[];
  length=100;
  pageSize=10;
  selection = new SelectionModel(true, []);
  Tag_dataSource=new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
flag:boolean=true;
role:number=0;
id:number=0;
  constructor(private matDialog:MatDialog,private _ac:ActivatedRoute,private _ser:TagService,private route:Router) {
    this.role=parseInt(localStorage.getItem('faculty_type'));
    this.id=parseInt(localStorage.getItem('faculty_id'));
  }
  displayedColumns: string[] = ['Action1','Topic','Subject_name','Action'];
  Faculty_type:number;


  ngOnInit() {


    this.flag=true;

    this.Faculty_type=Number(localStorage.getItem('faculty_type'));
    if(this.Faculty_type!=1)
    {
      console.log(true);
     this.route.navigate(['menu']);
    }

      this._ser.getAllTopics().subscribe(
        (data:any)=>{
          console.log(data);
          this.Tag_dataSource.paginator=this.paginator;
          this.Tag_dataSource.sort=this.sort;
          this.Tag_arr=data;
          this.Tag_dataSource.data= data;
          this.Tag_dataSource.sort=this.sort;

    }
  );
  }

  Add_tag()

  {
      //this._router.navigate(['menu/add_category']);
      this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
        if(this.currentdialog)
        {
          this.currentdialog.close();
          this.ngOnInit();
        }
        this.currentdialog=this.matDialog.open(TagAddComponent,{
          data: {id : params.id}
        });
        this.currentdialog.afterClosed().subscribe(result => {
          console.log('the dailog was closed');
          this.ngOnInit();

        })
      });
  }
  Delete_Tag(item) {
    this._ser.deleteTopic(item.Tag_id).subscribe((data: any) => {
      console.log(data);
      this.ngOnInit();
    });
  }
  Tag_Update(item:tag_class)
  {
   // this._router.navigate(['menu/update_category',item.Category_id]);

    this._ac.params.pipe(takeUntil(this.destroy)).subscribe(params => {
      if(this.currentdialog)
      {
        this.currentdialog.close();
        this.ngOnInit();
      }
      this.currentdialog=this.matDialog.open(TagUpdateComponent,{
        data: {id : item.Tag_id}
      });
      this.currentdialog.afterClosed().subscribe(result => {
        console.log('the dailog was closed');
        this.ngOnInit();

      })
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.Tag_dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.Tag_dataSource.data.forEach(row => this.selection.select(row));
  }
  applyFilter(filterValue: string) {
    this.Tag_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.Tag_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }
  }
  checkedItems(item:tag_class) {
    if (this.Tag_delarr.find(x => x == item)) {
      this.Tag_delarr.splice(this.Tag_delarr.indexOf(item), 1);
    } else {
      this.Tag_delarr.push(item);
    }
    console.log(this.Tag_delarr);
  }
  i: number = 0;

  selectedDelete() {
    this._ser.deleteAll(this.Tag_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.Tag_delarr.length; this.i++) {
        if (this.Tag_list.find(x => x == this.Tag_delarr[this.i])) {
          this.Tag_list.splice(this.Tag_list.indexOf(this.Tag_delarr[this.i]), 1);
        }
      }
      this.Tag_dataSource.data = this.Tag_list;
      this.ngOnInit();
    });
  }


}

import { Component, OnInit,ViewChild} from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";
import { announcement_class} from "../../classes/announcement_class";




@Component({
  selector: 'app-annoucement-home',
  templateUrl: './annoucement-home.component.html',
  styleUrls: ['./annoucement-home.component.css']
})
export class AnnoucementHomeComponent implements OnInit {

  announce_tbl_arr: announcement_class[] = [];
  announce_delarr: announcement_class[] = [];
  j: number;
  flag:boolean;
  i: number = 0;
  page_length = 100;
  pageSize = 10;
  announcement_selection = new SelectionModel(true, []);

  announcement_dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator)
  paginator: MatPaginator;
  @ViewChild(MatSort)
  sort: MatSort;
  pageEvent: PageEvent;
  expandedElement;
  arr:number[]=[];
  displayedColumns: string[] = [
    "Action1",
    "Title",
    "Announcement",
    "Date",
    "Batch_id",
    "Faculty_name",
    "Action"
  ];



  constructor(private _ser:AnnouncementService,private _router:Router) { }

  ngOnInit() {

    this.flag=true;
    this._ser.getAllAnnouncement().subscribe((data:any)=>{
      console.log(data);

    this.announcement_dataSource.paginator = this.paginator;
    this.announcement_dataSource.sort = this.sort;
      this.announce_tbl_arr=data;
      this.announcement_dataSource.data=this.announce_tbl_arr;
      this.announcement_dataSource.sort = this.sort;

      console.log("hello");
    });

  }

  Add_Announcement() {
    this._router.navigate(["menu/add_announcement"]);
  }

  onAnnounce_Delete(arr)
  {
    console.log(arr.Announcement_id);
    this._ser.deleteAnnouncement(arr.Announcement_id).subscribe(
      (data:any)=>{
        console.log(data);
        this.ngOnInit();
      }
    );
  }

  onCheakboxchacked(item:announcement_class) {
    if (this.announce_delarr.find(x => x == item)) {
      this.announce_delarr.splice(this.announce_delarr.indexOf(item), 1);
    } else {
      this.announce_delarr.push(item);
    }
    console.log(this.announce_delarr);
  }


  Selected_delete() {
    this._ser.deleteAll(this.announce_delarr).subscribe((data: any) => {
      console.log(data);
      for (this.i = 0; this.i < this.announce_delarr.length; this.i++) {
        if (this.announce_tbl_arr.find(x => x == this.announce_delarr[this.i])) {
          this.announce_tbl_arr.splice(this.announce_tbl_arr.indexOf(this.announce_delarr[this.i]), 1);
        }
      }
      this.announcement_dataSource.data = this.announce_tbl_arr;
    });
  }


  onAnnounce_Update(item){
    this._router.navigate(["/menu/update_announcement", item.Announcement_id]);
  }

  applyFilter(filterValue: string) {
    this.announcement_dataSource.filter = filterValue.trim().toLowerCase();
    if(this.announcement_dataSource.filteredData.length==0)
    {
      //console.log('in1');
      this.flag=false;
    }
    else
    {
      this.flag=true;
    }

  }
}

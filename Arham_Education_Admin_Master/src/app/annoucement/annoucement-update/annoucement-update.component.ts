import { Component, OnInit } from '@angular/core';
import { AnnouncementService } from '../../services/announcement.service';
import { announcement_class } from '../../classes/announcement_class';
import { Router,ActivatedRoute } from "@angular/router";
import { batch_class } from "../../classes/batch_class";

@Component({
  selector: 'app-annoucement-update',
  templateUrl: './annoucement-update.component.html',
  styleUrls: ['./annoucement-update.component.css']
})
export class AnnoucementUpdateComponent implements OnInit {
  Faculty_id:number;
  Title:string;
  Announcemnet:string;
  Date:Date;
 Batch_id:number;
 Batch_list:batch_class[]=[];
 Announcemnet_id:number;
 Announcemnet_arr:announcement_class[]=[];
 constructor(private _ser:AnnouncementService,private _router:Router,private act_router:ActivatedRoute) { }


 ngOnInit() {

  this._ser.getAllAnnouncement().subscribe(
    (data:any)=>{
     // console.log(data);
      this.Announcemnet_arr=data;
    }
  );
  this._ser.getAllBatch().subscribe((data:batch_class[]) => {
    this.Batch_list = data;
  });


  this.Announcemnet_id = this.act_router.snapshot.params["Announcement_id"];
  console.log(this.Announcemnet_id);
  this._ser.getAllAnnouncementById(this.Announcemnet_id).subscribe(
    (data:announcement_class[])=>{
      console.log(data);
      this.Title=data[0].Title;
      this.Announcemnet=data[0].Announcemnet;
      this.Date=data[0].Date;
      this.Batch_id=data[0].Batch_id;
    }
  );
}

onclickCancle(){
  this._router.navigate(['menu/announcement_home']);

}
onclickupdate(){
  this.Faculty_id=Number(localStorage.getItem('faculty_id'));
  this._ser.updateAnnoucement(new announcement_class(this.Title,this.Announcemnet,this.Date,this.Batch_id,this.Faculty_id),this.Announcemnet_id).subscribe(
    (data:any)=>{
        console.log(data);
        this._router.navigate(['menu/announcement_home']);

    }
  )

}

keyPressText(event: any)
{
  const pattern = /[A-Z\a-z\ ]/;
  let inputChar = String.fromCharCode(event.charCode);
  // console.log(inputChar, e.charCode);
     if (!pattern.test(inputChar) || this.Title.length>=20) {
     // invalid character, prevent input
         event.preventDefault();
    }
}


}

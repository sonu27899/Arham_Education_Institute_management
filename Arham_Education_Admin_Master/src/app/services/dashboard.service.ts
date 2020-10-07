import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private student="http://localhost:3000/dashboardstudent_admin/";
  private barchart3="http://localhost:3000/dashboardperformance_admin/";
  private faculty="http://localhost:3000/dashboardfaculty_admin/";
  private batch="http://localhost:3000/dashboardbatch_admin/";
  private question="http://localhost:3000/dashboardquestion_admin/";
  private barchart1="http://localhost:3000/barchart1Router_admin/";
  private barchart2="http://localhost:3000/barchart2Router_admin/";
  private linechart="http://localhost:3000/linechart_admin/";

  constructor(private _http:HttpClient) { }


  TotalSalaryPay()
  {
    return this._http.get(this.barchart2);
  }

  TotalFeesget()
  {
    return this._http.get(this.barchart1);
  }
  TotalExamget()
  {
    return this._http.get(this.linechart);

  }
  getAllStudent()
  {
    return this._http.get(this.student);
  }


  getAllFaculty()
  {
    return this._http.get(this.faculty);
  }

  getAllQuestion()
  {
    return this._http.get(this.question);
  }


  getAllBatch()
  {
    return this._http.get(this.batch);
  }

  getAllperformance()
  {
    return this._http.get(this.barchart3);
  }

}

export class student_class
{
  constructor(
     public Password:string,
     public Name:string,
     public Batch_no:number,
     public Email_id:string,
     public Phone_no:string,
     public Last_name:string,
     public Middle_name:string,
     public Parent_name:string,
     public Parent_mobile_no:string,
     public Address:string,
     public Date_of_birth:Date,
     public Status:number,
     public Fees:number,
     public Joining_date:Date,
     public Gender:string,
     public Student_id?:number,
     public Batch_name?:string
     )
    {}
};

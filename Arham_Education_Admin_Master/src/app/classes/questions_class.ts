export class questions_class
{
  constructor(
     public Tag_id:number,
     public Difficulty:number,
     public Question:string,
     public Option1:string,
     public Option2:string,
     public Option3:string,
     public Option4:string,
     public Answer:string,
    public Count:number,
    public Faculty_id:number,
    public Question_id?:number)
    {}
};

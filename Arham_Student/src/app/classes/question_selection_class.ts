import { tag_class } from './tag_class';
import { difficulty_class } from './difficulty_class';

export class question_selection_class
{
  constructor(public tag:tag_class,public Difficulty:difficulty_class,public qty:number,public Count:number){}
}

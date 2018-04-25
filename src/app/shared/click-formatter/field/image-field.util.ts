import {Field} from './field.util';

export class ImageField implements Field {
  type: string;


  constructor(public fieldDef: any, public result: any, public contentType: string) {
    this.type = this.fieldDef.type;
  }
}

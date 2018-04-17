import {Field} from './field.util';

export class TextField implements Field {
  type: string;

  constructor(public fieldDef: any, public result: any) {
  }

  getHTML(): string {
    return '';
  }
}

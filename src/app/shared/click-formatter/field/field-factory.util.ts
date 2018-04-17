import {TextField} from './text-field.util';
import {Field} from './field.util';

export class FieldFactory {
  public static getField(fieldDef: any, result: any): Field {
    switch (fieldDef.type) {
      case 'text':
        return new TextField(fieldDef, result);
      default:
        return null;
    }
  }

}

import {ClickFormatter} from './click-formatter.util';
import {FieldFactory} from './field/field-factory.util';

export class FieldClickFormatter implements ClickFormatter {

  html = '';

  constructor(public formatterDef: any) {
  }

  format(result) {
    this.html = '<table>';
    this.formatterDef.fields.forEach((fieldDef) => {
      this.html += '<tr>';
      this.html += FieldFactory.getField(fieldDef, result).getHTML();
      this.html += '</tr>';
    });
    return this.html;

  }

}

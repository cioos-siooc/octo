import {ClickFormatter} from './click-formatter.util';
import {FieldFactory} from './field/field-factory.util';

export class FieldClickFormatter implements ClickFormatter {

  html = '';

  constructor(public formatterDef: any) {
  }

  format(result) {
    this.html = '<table class="click-table">';
    this.formatterDef.fields.forEach((fieldDef) => {
      console.log(fieldDef);
      console.log(result);
      const field = FieldFactory.getField(fieldDef, result, this.formatterDef.contentType);
      if (field != null) {
        this.html += '<tr>';
        this.html += field.getHTML();
        this.html += '</tr>';
      }
    });
    this.html += '</table>';
    return this.html;

  }

}

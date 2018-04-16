import {ClickFormatter} from './click-formatter.util';

export class FieldClickFormatter implements ClickFormatter {

  constructor(public formatterDef: any) {
  }

  format(result) {
    console.log(this.formatterDef);
    return 'test';

  }
}

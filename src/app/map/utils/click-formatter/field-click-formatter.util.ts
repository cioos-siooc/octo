import {ClickFormatter} from './click-formatter.util';
import {FieldFactory} from './field/field-factory.util';
import {MapClickInfo} from '@app/shared/models';

export class FieldClickFormatter implements ClickFormatter {

  html = '';

  constructor(public formatterDef: any) {
  }

  getMapClickInfo(result): MapClickInfo {
    const fields = [];
    const mapClickInfo = new MapClickInfo();
    this.formatterDef.fields.forEach((fieldDef) => {
      const field = FieldFactory.getField(fieldDef, result, this.formatterDef.contentType);
      if (field != null) {
        fields.push(field);
      }
    });
    mapClickInfo.fields = fields;
    return mapClickInfo;

  }

}

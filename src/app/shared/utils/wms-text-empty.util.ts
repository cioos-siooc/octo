import {EmptyValidator} from './empty-validator.util';

export class WmsTextEmpty implements EmptyValidator {
  isPayloadEmpty(result) {
    return result === 'no features were found\n';
  }
}

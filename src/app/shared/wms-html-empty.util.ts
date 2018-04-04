import {EmptyValidator} from './empty-validator.util';

export class WmsHtmlEmpty implements EmptyValidator {
  isPayloadEmpty(result) {
    const insideBodyTags = result.substring(result.indexOf('<body>') + 6, result.indexOf('</body>'));
    const trimmed = insideBodyTags.replace(/ /g, '').replace(/\r?\n|\r/g, '');
    return (trimmed.length <= 0);
  }
}

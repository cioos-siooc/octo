import { of } from 'rxjs';

export class TranslateServiceStub {
  public get(key: any): any {
    if (key === 'language') {
      return of('en');
    } else {
      return of(key);
    }
  }
}

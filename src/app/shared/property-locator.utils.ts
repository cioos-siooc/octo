export interface PropertyLocator {
  getValue(obj: any, path: string): any;
}

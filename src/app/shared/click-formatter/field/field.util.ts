export interface Field {
  type: string;
  result: any;
  fieldDef: any;

  getHTML(): string;
}

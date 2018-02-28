export abstract class Layer {
  public id: number;
  public type: string;
  public zIndex : number;
  public opacity: number;
  public title: string;
  public isVisible: boolean;
  public defaultCrs: string;
  public url : string;
  public urlParameters: string;
  public code: string;
  public languageCode: string;
}

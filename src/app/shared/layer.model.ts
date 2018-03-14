import {ClientPresentation} from './client-presentation.model';

export abstract class Layer {
  public id: number;
  public type: string;
  public zIndex: number;
  public opacity: number;
  public title: string;
  public isVisible: boolean;
  public defaultCrs: string;
  public url: string;
  public urlParameters: string;
  public code: string;
  public languageCode: string;
  public uniqueId: string;
  public clientPresentations: ClientPresentation[];
  public currentClientPresentation: ClientPresentation;
}

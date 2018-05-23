import {Layer} from './layer.model';

export class WfsLayer extends Layer {
  public identifier: string;
  public namedStyle: string;
  public crs: string;
  public version: string;
}

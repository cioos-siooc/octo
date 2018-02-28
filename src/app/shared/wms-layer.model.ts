import {Layer} from "./layer.model";

export  class WmsLayer extends Layer{
  public identifier: string;
  public format: string;
  public namedStyle: string;
  public crs: string;
  public version: string;
}

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {Layer} from './layer.model';

export class WmsLayer extends Layer {
  public identifier: string;
  public format: string;
  public namedStyle: string;
  public crs: string;
  public version: string;
}

/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

import {ClientPresentation} from './client-presentation.model';
import {ClickStrategy} from './click-strategy.model';
import {ClickFormatterInfo} from './click-formatter-info.model';
import { LayerDescription } from '@app/shared/models/layer-description.model';

export abstract class Layer {
  public id: number;
  public type: string;
  public zIndex: number;
  public opacity: number;
  public title: string;
  public description?: LayerDescription;
  public isVisible: boolean;
  public defaultCrs: string;
  public url: string;
  public urlParameters: any;
  public code: string;
  public languageCode: string;
  public uniqueId: string;
  public clientPresentations: ClientPresentation[];
  public currentClientPresentation: ClientPresentation;
  public clickStrategy: ClickStrategy;
  public clickFormatterInfo: ClickFormatterInfo;
  public urlBehaviors: any;
  public isCollapsed: boolean;
  public priority: number;
  public layerGroupId?: number;
}

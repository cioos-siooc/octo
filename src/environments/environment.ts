/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  mapapiUrl: 'http://132.215.33.56:8080/mapapi/api',
  backgroundLayerCodes: ['bing.aerial', 'bing.road', 'bing.aerialWithLabels'],
  topicGroupCode: 'ca.ogsl.multi_topics',
  titleKey: 'infosl-title',
  isTopicPickerActive: true,
  defaultTopic: 'ca.ogsl.infosl',
  frenchLanguageIdentifier: 'ogsl',
  englishLanguageIdentifier: 'slgo'
};

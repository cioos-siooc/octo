/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

export class UrlParametersUtil {

  public static addUrlParameter(urlParameters, paramName, paramValue) {
    if (urlParameters == null) {
      urlParameters = [];
    } else {
      urlParameters = urlParameters.filter((urlParam) => {
        return Object.keys(urlParam)[0] !== paramName;
      });
    }
    const urlParameter = {};
    urlParameter[paramName] = paramValue;
    urlParameters.push(urlParameter);
    return urlParameters;
  }

  public static removeUrlParameter(urlParameters, paramName) {
    const paramIndex = urlParameters.findIndex((param) => paramName in param);
    const newUrlParameters = [...urlParameters];
    if (paramIndex >= 0) {
      newUrlParameters.splice(paramIndex, 1);
    }
    return newUrlParameters;
  }
}

import {extend} from 'lodash';

export class StylesFromLiterals {
  private singleStyle: any;
  private defaultVal: string;
  private noStyleVal: string;
  private styles: any;
  private type: any;
  private key: any;

  constructor(properties: any) {
    this.singleStyle = null;

    this.defaultVal = 'defaultVal';
    this.noStyleVal = 'noStyleVal';


    this.styles = {
      point: {},
      line: {},
      polygon: {}
    };
    this.initDefaultStyles();

    this.type = properties.type;

    this.initialize_(properties);
  }

  public initialize_(properties: any) {
    let styleSpec;
    if (this.type === 'unique' || this.type === 'range') {
      this.key = properties.property;
    }

    if (this.type === 'single') {
      this.singleStyle = {
        olStyle: this.getOlStyleFromLiterals(properties),
        labelProperty: this.getLabelProperty(properties.vectorOptions.label)
      };
    } else if (this.type === 'unique') {
      const values = properties.values;
      for (let i = 0; i < values.length; i++) {
        const value = values[i];
        styleSpec = {
          olStyle: this.getOlStyleFromLiterals(value),
          minResolution: this.getMinResolution(value),
          maxResolution: this.getMaxResolution(value),
          labelProperty: this.getLabelProperty(value.vectorOptions.label)
        };
        this.pushOrInitialize_(value.geomType, value.value, styleSpec);
      }
    } else if (this.type === 'range') {
      const ranges = properties.ranges;
      for (let i = 0; i < ranges.length; i++) {
        const range = ranges[i];
        styleSpec = {
          olStyle: this.getOlStyleFromLiterals(range),
          minResolution: this.getMinResolution(range),
          maxResolution: this.getMaxResolution(range),
          labelProperty: this.getLabelProperty(range.vectorOptions.label)
        };
        const key = range.range.toLocaleString();
        this.pushOrInitialize_(range.geomType, key, styleSpec);
      }
    }
  }

  public pushOrInitialize_(geomType: any, key: any, styleSpec: any) {
    // Happens when styling is only resolution dependent (unique type only)
    if (key === undefined) {
      key = this.defaultVal;
    }
    if (!this.styles[geomType][key]) {
      this.styles[geomType][key] = [styleSpec];
    } else {
      this.styles[geomType][key].push(styleSpec);
    }
  }

  public findOlStyleInRange_(value: any, geomType: any) {
    let olStyle, range;
    // noinspection TsLint
    for (range in this.styles[geomType]) {
      range = range.split(',');
      if (value >= parseFloat(range[0]) &&
        value < parseFloat(range[1])) {
        olStyle = this.styles[geomType][range];
        break;
      }
    }
    if (olStyle == null) {
      return this.styles[geomType][this.noStyleVal];
    }
    return olStyle;
  }

  public getOlStyleForResolution_(olStyles, resolution) {
    let i, ii, olStyle;
    for (i = 0, ii = olStyles.length; i < ii; i++) {
      olStyle = olStyles[i];
      if (olStyle.minResolution <= resolution &&
        olStyle.maxResolution > resolution) {
        break;
      }
    }
    return olStyle;
  }

  public getFeatureStyle(feature, resolution) {
    if (this.type === 'single') {
      const labelProperty = this.singleStyle.labelProperty;
      if (labelProperty) {
        const properties = feature.getProperties();
        const text = properties[labelProperty];
        const olText = this.singleStyle.olStyle.getText();
        this.singleStyle.olStyle.getText().setText(text);
      }
      return this.singleStyle.olStyle;
    } else if (this.type === 'unique') {
      const properties = feature.getProperties();
      // A value can be 0
      // var value = properties[this.key];
      let value = this.getObjectValue(properties, this.key);
      value = value != null ? value : this.defaultVal;
      const geomType = this.getGeomTypeFromGeometry(feature.getGeometry());
      let olStyles = this.styles[geomType][value];
      if (olStyles == null) {
        olStyles = this.styles[geomType][this.noStyleVal];
      }
      const res = this.getOlStyleForResolution_(olStyles, resolution);
      const labelProperty = res.labelProperty;
      if (labelProperty) {
        const text = properties[labelProperty];
        res.olStyle.getText().setText(text);
      }
      return res.olStyle;
    } else if (this.type === 'range') {
      const properties = feature.getProperties();
      const value = this.getObjectValue(properties, this.key);
      const geomType = this.getGeomTypeFromGeometry(feature.getGeometry());
      let olStyles;
      if (value == null) {
        olStyles = this.styles[geomType][this.defaultVal];
      } else {
        olStyles = this.findOlStyleInRange_(value, geomType);
      }
      const res = this.getOlStyleForResolution_(olStyles, resolution);
      const labelProperty = res.labelProperty;
      if (labelProperty) {
        const text = properties[labelProperty];
        res.olStyle.getText().setText(text);
      }
      return res.olStyle;
    }
  }

  public getOlStyleForPoint(options, shape): any {
    if (shape === 'circle') {
      return new ol.style.Circle(options);
    } else if (shape === 'icon') {
      return new ol.style.Icon(options);
    } else {
      const shapes = {
        square: {
          points: 4,
          angle: Math.PI / 4
        },
        triangle: {
          points: 3,
          rotation: Math.PI / 4,
          angle: 0
        },
        star: {
          points: 5,
          angle: 0
        },
        cross: {
          points: 4,
          angle: 0
        }
      };
      // {} to perserve the original object
      const style = extend({}, shapes[shape], options);
      return new ol.style.RegularShape(style);
    }
  }

  public getOlBasicStyles(options): any {
    const olStyles = {};
    Object.keys(options).forEach(function (key) {
      const type = key;
      const style = options[key];
      if (type === 'stroke') {
        olStyles[type] = new ol.style.Stroke(style);
      } else if (type === 'fill') {
        olStyles[type] = new ol.style.Fill(style);
      } else if (type === 'text') {
        style.stroke = new ol.style.Stroke(style.stroke);
        style.fill = new ol.style.Fill(style.fill);
        olStyles[type] = new ol.style.Text(style);
      }
    });
    return olStyles;
  }

  public getOlStyleFromLiterals(value) {
    const olStyles: any = {};
    const style = value.vectorOptions;
    const geomType = value.geomType;

    if (geomType === 'point') {
      let olText;
      if (style.label) {
        olText = this.getOlBasicStyles(style.label).text;
      }
      const basicStyles = this.getOlBasicStyles(style);
      let olImage = extend({}, style, basicStyles);
      // Necessary for Cesium
      // Semble causer problème pour openlayers 4...
      // olImage.crossOrigin = 'anonymous';

      delete olImage.label;
      olImage = this.getOlStyleForPoint(olImage, style.type);
      olStyles.image = olImage;
      olStyles.text = olText;
    } else {
      Object.keys(style).forEach((key) => {
        if (key === 'label') {
          olStyles['text'] = this.getOlBasicStyles(style[key])['text'];
        } else if (['stroke', 'fill', 'image'].indexOf(key) !== -1) {
          olStyles[key] = this.getOlBasicStyles(style)[key];
        }
      });
    }
    return new ol.style.Style(olStyles);
  }

  public getGeomTypeFromGeometry(olGeometry) {
    if (olGeometry instanceof ol.geom.Point ||
      olGeometry instanceof ol.geom.MultiPoint) {
      return 'point';
    } else if (olGeometry instanceof ol.geom.LineString ||
      olGeometry instanceof ol.geom.MultiLineString) {
      return 'line';
    } else if (olGeometry instanceof ol.geom.Polygon ||
      olGeometry instanceof ol.geom.MultiPolygon) {
      return 'polygon';
    }
  }

  public getLabelProperty(value) {
    if (value) {
      return value.property;
    }
  }

  private initDefaultStyles() {
    this.initNoValuePointStyle();
    this.initNoStyleDefinitionPointStyle();
    // TODO: Add methods to init NoValue and NoStyle styles for line and polygon
  }

  /**
   * Initialise le style à utiliser pour les points lorsque la valeur est nulle
   */
  private initNoValuePointStyle() {
    const olStyleDefaultPoint = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#FFFFFF'
        }),
        stroke: new ol.style.Stroke({
          color: '#000000',
          width: 1
        })
      })
    });
    const styleSpecPointDefault = {
      labelProperty: undefined,
      maxResolution: Infinity,
      minResolution: 0,
      olStyle: olStyleDefaultPoint
    };
    this.styles['point'][this.defaultVal] = [styleSpecPointDefault];
  }

  /**
   * Initialise le style à utiliser pour les points lorsqu'aucun style n'est défini pour la valeur
   */
  private initNoStyleDefinitionPointStyle() {
    const olStyleDefaultPoint = new ol.style.Style({
      image: new ol.style.Circle({
        radius: 7,
        fill: new ol.style.Fill({
          color: '#000000'
        }),
        stroke: new ol.style.Stroke({
          color: '#FFFFFF',
          width: 2
        })
      })
    });
    const styleSpecPointDefault = {
      labelProperty: undefined,
      maxResolution: Infinity,
      minResolution: 0,
      olStyle: olStyleDefaultPoint
    };
    this.styles['point'][this.noStyleVal] = [styleSpecPointDefault];
  }

  private getMinResolution(value) {
    return value.minResolution || 0;
  }

  private getMaxResolution(value) {
    return value.maxResolution || Infinity;
  }

  /**
   * Fait un deep lookup pour aller chercher la valeur d'une propriété dans un objet, récursivement
   * @param obj L'objet à inspecter
   * @param path La propriété à chercher
   * @param separator Le separateur pour les propriété sur plusieurs niveaux
   * @returns {any} La valeur de la propriété
   */
  private getObjectValue(obj, path, separator?: string): any {
    if (!path) {
      return null;
    }
    if (!separator) {
      separator = '/';
    }
    let i, len;

    for (i = 0, path = path.split(separator), len = path.length; i < len; i++) {
      if (!obj || typeof obj !== 'object') {
        return null;
      }
      obj = obj[path[i]];
    }

    if (obj === undefined) {
      return null;
    }
    return obj;
  }
}

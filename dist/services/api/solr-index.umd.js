(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('axios'), require('lodash'), require('vue'), require('lodash/isNumber'), require('lodash/isDate')) : typeof define === 'function' && define.amd ? define(['axios', 'lodash', 'vue', 'lodash/isNumber', 'lodash/isDate'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonServicesApiSolr = factory(global.axios, global.lodash, global.Vue));
})(this, function (axios, lodash, Vue) {
  'use strict';

  var _window, _window2, _window3, _Vue__namespace$proto;
  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
      Object.keys(e).forEach(function (k) {
        if (k !== 'default') {
          var d = Object.getOwnPropertyDescriptor(e, k);
          Object.defineProperty(n, k, d.get ? d : {
            enumerable: true,
            get: function () {
              return e[k];
            }
          });
        }
      });
    }
    n["default"] = e;
    return Object.freeze(n);
  }
  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);
  let sitePrefixUrl = 'https://api.cbd.int';
  if (/\.cbd\.int$/i.test(((_window = window) === null || _window === void 0 || (_window = _window.location) === null || _window === void 0 ? void 0 : _window.hostname) || '')) sitePrefixUrl = 'https://api.cbd.int';
  if (/\.cbddev\.xyz$/i.test(((_window2 = window) === null || _window2 === void 0 || (_window2 = _window2.location) === null || _window2 === void 0 ? void 0 : _window2.hostname) || '')) sitePrefixUrl = 'https://api.cbddev.xyz';
  if (/\localhost$/i.test(((_window3 = window) === null || _window3 === void 0 || (_window3 = _window3.location) === null || _window3 === void 0 ? void 0 : _window3.hostname) || '')) sitePrefixUrl = '/';
  const defaultOptions = {
    prefixUrl: sitePrefixUrl,
    timeout: 30 * 1000,
    token: Vue__namespace === null || Vue__namespace === void 0 || (_Vue__namespace$proto = Vue__namespace.prototype) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.$auth) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.strategy) === null || _Vue__namespace$proto === void 0 || (_Vue__namespace$proto = _Vue__namespace$proto.token) === null || _Vue__namespace$proto === void 0 ? void 0 : _Vue__namespace$proto.get()
  };
  class ApiBase {
    constructor(options) {
      var _this = this;
      options = options || {};
      if (lodash.isFunction(options)) options = {
        token: options
      };
      const {
        token,
        prefixUrl,
        timeout,
        tokenType
      } = {
        ...defaultOptions,
        ...options
      };
      this.config = {
        baseURL: prefixUrl,
        timeout,
        tokenType,
        token
      };
      const http = async function () {
        return (await loadAsyncHeaders(this.config))(...arguments);
      };
      http.get = async function () {
        return (await loadAsyncHeaders(_this.config)).get(...arguments);
      };
      http.head = async function () {
        return (await loadAsyncHeaders(_this.config)).head(...arguments);
      };
      http.post = async function () {
        return (await loadAsyncHeaders(_this.config)).post(...arguments);
      };
      http.put = async function () {
        return (await loadAsyncHeaders(_this.config)).put(...arguments);
      };
      http.patch = async function () {
        return (await loadAsyncHeaders(_this.config)).patch(...arguments);
      };
      http.delete = async function () {
        return (await loadAsyncHeaders(_this.config)).delete(...arguments);
      };
      http.options = async function () {
        return (await loadAsyncHeaders(_this.config)).options(...arguments);
      };
      http.request = async function () {
        return (await loadAsyncHeaders(_this.config)).request(...arguments);
      };
      this.http = http;
    }
  }
  async function loadAsyncHeaders(baseConfig) {
    const {
      token,
      tokenType,
      ...config
    } = baseConfig || {};
    const headers = {
      ...(config.headers || {})
    };
    if (token) {
      headers.Authorization = "".concat(tokenType || 'Bearer', " ").concat(token);
    }
    return axios__default["default"].create({
      ...config,
      headers
    });
  }

  //////////////////////////
  // Helpers
  ////////////////////////

  function tryCastToApiError(error) {
    if (error && error.response && error.response.data && error.response.data.code) {
      error.response.data;
      throw error.response.data;
    }
    throw error;
  }
  function stringifyUrlParam(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    if (value instanceof Object) {
      return JSON.stringify(value);
    }
    return value;
  }
  function stringifyUrlParams(valueObj) {
    const returnObj = {};
    for (const [key, value] of Object.entries(valueObj)) {
      if (isValid(value)) {
        returnObj[key] = stringifyUrlParam(value);
      }
    }
    return returnObj;
  }
  function isValid(params) {
    return ![undefined, null].includes(params);
  }
  class SolrIndexAPI extends ApiBase {
    constructor(options) {
      super(options);
    }
    async query() {
      let {
        searchField,
        fieldQueries,
        query,
        sort,
        fields,
        start,
        rowsPerPage
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const params = stringifyUrlParams({
        df: searchField ? searchField : 'text_EN_txt',
        fq: fieldQueries,
        q: query,
        sort: this.localizeFields(sort),
        fl: this.localizeFields(fields),
        wt: 'json',
        start: start ? start : 0,
        rows: rowsPerPage ? rowsPerPage : 25
      });
      return this.http.get("/api/v2013/index/select", {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    localizeFields(fields, locale) {
      if (!fields) return;
      if (locale && locale != 'en') {
        return fields.replace(/_EN/ig, '_' + (locale || 'en').toUpperCase());
      }
      return fields;
    }
    solrEscape(value) {
      if (value === undefined) throw "Value is undefined";
      if (value === null) throw "Value is null";
      if (value === "") throw "Value is null";
      if (_.isNumber(value)) value = value.toString();
      if (_.isDate(value)) value = value.toISOString();

      //TODO: add more types

      value = value.toString();
      value = value.replace(/\\/g, '\\\\');
      value = value.replace(/\+/g, '\\+');
      value = value.replace(/\-/g, '\\-');
      value = value.replace(/\&\&/g, '\\&&');
      value = value.replace(/\|\|/g, '\\||');
      value = value.replace(/\!/g, '\\!');
      value = value.replace(/\(/g, '\\(');
      value = value.replace(/\)/g, '\\)');
      value = value.replace(/\{/g, '\\{');
      value = value.replace(/\}/g, '\\}');
      value = value.replace(/\[/g, '\\[');
      value = value.replace(/\]/g, '\\]');
      value = value.replace(/\^/g, '\\^');
      value = value.replace(/\"/g, '\\"');
      value = value.replace(/\~/g, '\\~');
      value = value.replace(/\*/g, '\\*');
      value = value.replace(/\?/g, '\\?');
      value = value.replace(/\:/g, '\\:');
      return value;
    }
  }
  return SolrIndexAPI;
});
//# sourceMappingURL=solr-index.umd.js.map

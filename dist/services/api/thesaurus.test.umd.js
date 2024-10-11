(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('vitest'), require('axios'), require('lodash'), require('vue')) : typeof define === 'function' && define.amd ? define(['vitest', 'axios', 'lodash', 'vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.vitest, global.axios, global.lodash, global.Vue));
})(this, function (vitest, axios, lodash, Vue) {
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
  function isValid(params) {
    return ![undefined, null].includes(params);
  }
  class ThesaurusApi extends ApiBase {
    constructor(options) {
      super(options);
    }
    async getDomains() {
      return this.http.get("/api/v2013/thesaurus/domains").then(res => res.data).catch(tryCastToApiError);
    }
    async getDomain(identifier) {
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      return this.http.get("/api/v2013/thesaurus/domains/".concat(encodeURIComponent(identifier))).then(res => res.data).catch(tryCastToApiError);
    }
    async getDomainTerms(identifier) {
      let {
        relations
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const params = {};
      if (relations) params.relations = stringifyUrlParam(relations);
      return this.http.get("/api/v2013/thesaurus/domains/".concat(encodeURIComponent(identifier), "/terms"), {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getTerm(identifier) {
      let {
        relations
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const params = {};
      if (relations) params.relations = stringifyUrlParam(relations);
      return this.http.get("/api/v2013/thesaurus/terms/".concat(encodeURIComponent(identifier)), {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  const myAPI = new ThesaurusApi({});
  vitest.test('getDomains func: get all domains', () => {
    return myAPI.getDomains().then(data => {
      vitest.expect.soft(data).toEqual(vitest.expect.arrayContaining([vitest.expect.objectContaining({
        "domainId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String)
      })]));
    });
  });
  vitest.test('getDomain func: throw error on wrong params ', async () => {
    await vitest.expect(() => myAPI.getDomain()).rejects.toThrowError(/invalid value for domainIdentifier/);
  });
  vitest.test('getDomain func: get domans of countries', () => {
    return myAPI.getDomain("countries").then(data => {
      vitest.expect.objectContaining({
        "domainId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String)
      });
    });
  });
  vitest.test('getDomain func: get domain of countries, relation = "domain"', () => {
    return myAPI.getDomain("countries", {
      relations: "domain"
    }).then(data => {
      vitest.expect.objectContaining({
        "domainId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String)
      });
    });
  });
  vitest.test('getDomain func: get domain of countries, relation = "all"', () => {
    return myAPI.getDomain("countries", {
      relations: "all"
    }).then(data => {
      vitest.expect.objectContaining({
        "domainId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String)
      });
    });
  });
  vitest.test('getTerms func: throw error on wrong params ', async () => {
    await vitest.expect(() => myAPI.getTerms()).rejects.toThrowError(/invalid value for termIdentifier/);
  });
  vitest.test('getTerms func: get terms of countries', () => {
    return myAPI.getTerms("countries").then(data => {
      vitest.expect.soft(data).toEqual(vitest.expect.arrayContaining([vitest.expect.objectContaining({
        "termId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String),
        "title": vitest.expect.any(Object),
        "shortTitle": vitest.expect.any(Object),
        "description": vitest.expect.any(String),
        "longDescription": vitest.expect.any(Object),
        "source": vitest.expect.any(String),
        "broaderTerms": vitest.expect.any(Array),
        "narrowerTerms": vitest.expect.any(Array),
        "relatedTerms": vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array)
      })]));
    });
  });
  vitest.test('getTerm func: throw error on wrong params ', async () => {
    await vitest.expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);
  });
  vitest.test('getTerm func: terms of ad', () => {
    return myAPI.getTerm("ad").then(data => {
      vitest.expect.objectContaining({
        "termId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String),
        "title": vitest.expect.any(Object),
        "shortTitle": vitest.expect.any(Object),
        "description": vitest.expect.any(String),
        "longDescription": vitest.expect.any(Object),
        "source": vitest.expect.any(String),
        "broaderTerms": vitest.expect.any(Array),
        "narrowerTerms": vitest.expect.any(Array),
        "relatedTerms": vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array)
      });
    });
  });
  vitest.test('getTerm func: throw error on wrong params ', async () => {
    await vitest.expect(() => myAPI.getTerm()).rejects.toThrowError(/invalid value for termIdentifier/);
    //await expect(() => myAPI.getTermRelation("ad")).rejects.toThrowError(/invalid value for relations/)
  });
  vitest.test('getTerm func:  term of ad, relations=all', () => {
    return myAPI.getTerm("ad", {
      relations: "all"
    }).then(data => {
      vitest.expect.objectContaining({
        "termId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String),
        "title": vitest.expect.any(Object),
        "shortTitle": vitest.expect.any(Object),
        "description": vitest.expect.any(String),
        "longDescription": vitest.expect.any(Object),
        "source": vitest.expect.any(String),
        "broaderTerms": vitest.expect.any(Array),
        "narrowerTerms": vitest.expect.any(Array),
        "relatedTerms": vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array)
      });
    });
  });
  vitest.test('getTerm func:  term of ad', () => {
    return myAPI.getTerm("ad").then(data => {
      vitest.expect.objectContaining({
        "termId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String),
        "title": vitest.expect.any(Object),
        "shortTitle": vitest.expect.any(Object),
        "description": vitest.expect.any(String),
        "longDescription": vitest.expect.any(Object),
        "source": vitest.expect.any(String),
        "broaderTerms": vitest.expect.any(Array),
        "narrowerTerms": vitest.expect.any(Array),
        "relatedTerms": vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array)
      });
    });
  });
  vitest.test('getTerm func:  term of ad, relations=domain', () => {
    return myAPI.getTerm("ad", {
      relations: "domain"
    }).then(data => {
      vitest.expect.objectContaining({
        "termId": vitest.expect.any(Number),
        "identifier": vitest.expect.any(String),
        "name": vitest.expect.any(String),
        "title": vitest.expect.any(Object),
        "shortTitle": vitest.expect.any(Object),
        "description": vitest.expect.any(String),
        "longDescription": vitest.expect.any(Object),
        "source": vitest.expect.any(String),
        "broaderTerms": vitest.expect.any(Array),
        "narrowerTerms": vitest.expect.any(Array),
        "relatedTerms": vitest.expect.any(Array),
        "nonPreferedTerms": vitest.expect.any(Array)
      });
    });
  });
});
//# sourceMappingURL=thesaurus.test.umd.js.map

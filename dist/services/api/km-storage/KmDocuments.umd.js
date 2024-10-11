function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('axios'), require('lodash'), require('vue')) : typeof define === 'function' && define.amd ? define(['exports', 'axios', 'lodash', 'vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonServicesApiKmStorageKmDocuments = {}, global.axios, global.lodash, global.Vue));
})(this, function (exports, axios, lodash, Vue) {
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
  const serviceUrls = {
    documentQueryUrl() {
      return "/api/v2013/documents";
    },
    documentUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier));
    },
    documentInfoUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/info");
    },
    validateUrl() {
      return "/api/v2013/documents/x/validate";
    },
    attachmentUrl(identifier, filename) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/attachments/").concat(encodeURIComponent(filename));
    },
    temporaryAttachmentUrl() {
      return "/api/v2015/temporary-files";
    },
    persistAttachmentUrl(identifier, guid) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/attachments/persist-temporary/").concat(encodeURIComponent(guid));
    },
    securityUrl(identifier, operation) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/securities/").concat(encodeURIComponent(operation));
    },
    documentVersionListUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions");
    },
    documentVersionUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/:revision");
    },
    documentVersionInfoUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/:revision/info");
    }
  };
  var _realm = /*#__PURE__*/new WeakMap();
  class KmDocumentsApi extends ApiBase {
    constructor(options) {
      super(options);
      _classPrivateFieldInitSpec(this, _realm, void 0);
      this.self = this;
      _classPrivateFieldSet(_realm, this, options.realm);
    }
    async query() {
      let {
        realm,
        q,
        s,
        l,
        sk
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const params = stringifyUrlParams({
        $filter: q,
        $orderby: s,
        $skip: sk,
        $top: l,
        collection: "my"
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.documentQueryUrl(), {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async get(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.documentUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getInfo(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.documentInfoUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async exists(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.head(serviceUrls.documentUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async put(identifier, body, _ref) {
      let {
        realm
      } = _ref;
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(body)) throw Error("invalid value for body");
      const Realm = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      const ContentType = {
        'Content-Type': 'application/json'
      };
      const headers = {
        ...Realm,
        ...ContentType
      };
      return this.http.put(serviceUrls.documentUrl(identifier), body, {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async delete(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.delete(serviceUrls.documentUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async validate(body) {
      let {
        realm,
        schema,
        metadata
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(body)) throw Error("invalid value for body");
      const params = stringifyUrlParams({
        schema,
        metadata
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.put(serviceUrls.validateUrl(), body, {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async canCreate(identifier) {
      let {
        realm,
        schema,
        metadata
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(schema)) throw Error("invalid value for schema");
      const params = stringifyUrlParams({
        schema,
        metadata
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.securityUrl(identifier, 'create'), {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async canUpdate(identifier) {
      let {
        realm,
        metadata
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const params = stringifyUrlParams({
        metadata
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.securityUrl(identifier, 'update'), {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async canDelete(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm, this) || undefined
      };
      return this.http.get(serviceUrls.securityUrl(identifier, 'delete'), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  var _realm2 = /*#__PURE__*/new WeakMap();
  class KmDocumentsVersionApi extends ApiBase {
    constructor(options) {
      super(options);
      _classPrivateFieldInitSpec(this, _realm2, void 0);
      this.self = this;
      _classPrivateFieldSet(_realm2, this, options.realm);
    }
    async query(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm2, this) || undefined
      };
      return this.http.get(serviceUrls.documentVersionListUrl(identifier), {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async get(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm2, this) || undefined
      };
      return this.http.get(serviceUrls.documentVersionUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getInfo(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm2, this) || undefined
      };
      return this.http.get(serviceUrls.documentVersionInfoUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async exists(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm2, this) || undefined
      };
      return this.http.head(serviceUrls.documentVersionUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  var _realm3 = /*#__PURE__*/new WeakMap();
  class KmAttachmentsApi extends ApiBase {
    constructor(options) {
      super(options);
      _classPrivateFieldInitSpec(this, _realm3, void 0);
      this.self = this;
      _classPrivateFieldSet(_realm3, this, options.realm);
    }
    async uploadTempFile(identifier, file, fileName, options) {
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(file)) throw Error("invalid value for file");
      if (!isValid(fileName)) throw Error("invalid value for fileName");
      if (!isValid(options)) throw Error("invalid value for options");
      const {
        timeout,
        onUploadProgress,
        onDownloadProgress
      } = {
        ...(options || {})
      };
      const apiConfig = {
        headers: {},
        timeout: timeout || 60 * 60 * 1000,
        onUploadProgress,
        onDownloadProgress
      };
      const tempSlotBody = {
        filename: fileName
      };

      //find the content type and validate with whitelist
      if (file instanceof FormData) {
        const tempFile = formData.get('file');
        if (tempFile) {
          tempSlotBody.contentType = this.getMimeType(file);
        }
      } else if (file instanceof File) {
        tempSlotBody.contentType = this.getMimeType(file);
      } else {
        throw new Error('Unable to read file information.');
      }
      if (this.mimeTypeWhitelist().indexOf(tempSlotBody.contentType) < 0) {
        throw new Error("File type not supported: " + mimeType + "(" + file.name + ")");
      }

      //const key = S4();
      // get a temporary slot from S3 to upload the file
      const temporarySlot = this.http.put(serviceUrls.temporaryAttachmentUrl(), tempSlotBody).then(res => res.data).catch(tryCastToApiError);

      // upload the file to the temporary slot on S3    
      apiConfig.headers['Content-Type'] = temporarySlot.contentType;
      //apiConfig.headers['Authorization'] = undefined;
      this.http.put(temporarySlot.url, file, {
        ...apiConfig
      }).then(res => res.data).catch(tryCastToApiError);

      //persists the file using the KM persists attachments endpoint
      const persistedAttachment = this.http.post(serviceUrls.persistAttachmentUrl(identifier, temporarySlot.uid), fileName, {
        params
      }).then(res => res.data).catch(tryCastToApiError);
      const config = useRuntimeConfig();
      return {
        ...persistedAttachment,
        url: config.public.API_URL + persistedAttachment.url
      };
    }
    upload(identifier, file) {
      try {
        var _this2 = this;
        let {
          contentType,
          headers
        } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return async function (contentType) {
          if (!isValid(identifier)) throw Error("invalid value for identifier");
          if (!isValid(file)) throw Error("invalid value for file");
          params = {
            contentType,
            identifier,
            filename
          } || {};
          params.identifier = identifier;
          params.filename = file.name;
          var contentType = params.contentType || _this2.getMimeType(file);

          // params.contentType = undefined;
          params.headers = params.header || {};
          params.headers["Content-Type"] = contentType;

          ////TEMP////////////////
          //upload to temp url
          const data = _this2.http.put(serviceUrls.attachmentUrl(identifier, file.name), body = file, {
            params
          }).then(res => res.data).catch(tryCastToApiError);
          const config = useRuntimeConfig();
          data.url = config.public.API_URL + data.url;
          data.urls = {
            //required by ckeditor
            "default": data.url
          };
          return data;
          ///////TEMP////////////////

          //TODO : use s3
          //1 request for temp file from s3
          //upload file 
          //return s3 location
          //persist temp file location in api
        }(contentType);
      } catch (e) {
        return Promise.reject(e);
      }
    }
    getMimeType(file) {
      if (!isValid(file)) throw Error("invalid value for file");
      const filename = file.name;
      let sMimeType = file.type || "application/octet-stream";
      if (filename && sMimeType == "application/octet-stream") {
        var sExt = "";
        var iIndex = filename.lastIndexOf(".");
        if (iIndex >= 0) sExt = filename.substring(iIndex).toLowerCase();
        if (sExt == ".json") sMimeType = "application/json";
        if (sExt == ".geojson") sMimeType = "application/json";
        if (sExt == ".xml") sMimeType = "application/xml";
      }
      return sMimeType;
    }
  }
  const mimeTypeWhitelist = ["application/json", "application/ogg", "application/pdf", "application/xml", "application/zip", "application/x-zip", "application/x-zip-compressed", "audio/mpeg", "audio/x-ms-wma", "audio/x-wav", "image/gif", "image/jpeg", "image/png", "image/bmp", "image/tiff", "text/csv", "text/html", "text/plain", "text/xml", "video/mpeg", "video/mp4", "video/quicktime", "video/x-ms-wmv", "video/x-msvideo", "video/x-flv", "application/vnd.oasis.opendocument.text", "application/vnd.oasis.opendocument.spreadsheet", "application/vnd.oasis.opendocument.presentation", "application/vnd.oasis.opendocument.graphics", "application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-powerpoint", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
  exports.KmAttachmentsApi = KmAttachmentsApi;
  exports.KmDocumentsApi = KmDocumentsApi;
  exports.KmDocumentsVersionApi = KmDocumentsVersionApi;
  exports.mimeTypeWhitelist = mimeTypeWhitelist;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=KmDocuments.umd.js.map

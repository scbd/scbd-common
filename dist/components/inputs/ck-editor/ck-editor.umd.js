function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('@ckeditor/ckeditor5-vue/dist/ckeditor.js'), require('@ckeditor/ckeditor5-vue'), require('@scbd/ckeditor5-build-inline-full/build/ckeditor.js'), require('@scbd/ckeditor5-build-inline-full/build/ckeditor.css'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring'), require('axios')) : typeof define === 'function' && define.amd ? define(['vue', '@ckeditor/ckeditor5-vue/dist/ckeditor.js', '@ckeditor/ckeditor5-vue', '@scbd/ckeditor5-build-inline-full/build/ckeditor.js', '@scbd/ckeditor5-build-inline-full/build/ckeditor.css', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring', 'axios'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsInputsCkEditorCkEditor = factory(global.Vue, null, global.CKEditor, global.ClassicEditor, null, global._, null, null, global.axios));
})(this, function (Vue, ckeditor_js, CKEditor, ClassicEditor, ckeditor_css, _, i18n, lstring, axios) {
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
  var Vue__namespace = /*#__PURE__*/_interopNamespace(Vue);
  var CKEditor__default = /*#__PURE__*/_interopDefaultLegacy(CKEditor);
  var ClassicEditor__default = /*#__PURE__*/_interopDefaultLegacy(ClassicEditor);
  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  const useI18n = () => {
    return {
      t: key => key,
      locale: 'en'
    };
  };
  const useLogger = () => {
    return {
      error
    };
  };
  function error(appError, userMessage) {
    if (![404, 401, 403].includes(appError === null || appError === void 0 ? void 0 : appError.status)) {
      try {
        console.error(appError);
        const {
          ACCOUNTS_HOST_URL,
          TAG,
          COMMIT
        } = useRuntimeConfig().public;
        const realmConfStore = useRealmConfStore();
        const realmConf = realmConfStore.realmConf;
        //TODO: send error to server
        const errorLog = {
          stack: JSON.stringify(appError, Object.getOwnPropertyNames(appError)),
          message: JSON.stringify(userMessage || (appError === null || appError === void 0 ? void 0 : appError.message) || 'unknown'),
          url: window.location.href,
          userAgent: window.navigator.userAgent,
          ver: TAG || COMMIT,
          timestamp: new Date(),
          realm: realmConf.realm
        };
        useAPIFetch('/error-logs', {
          method: 'POST',
          body: errorLog
        });
      } catch (err) {
        console.error(err, 'error sending error log to server.');
      }
    }
    if (userMessage) {
      const $toast = useToast();
      $toast.error(userMessage, {
        position: 'top-right'
      });
    }
  }
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
      if (_.isFunction(options)) options = {
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
  const serviceUrls$1 = {
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
      return this.http.get(serviceUrls$1.documentQueryUrl(), {
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
      return this.http.get(serviceUrls$1.documentUrl(identifier), {
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
      return this.http.get(serviceUrls$1.documentInfoUrl(identifier), {
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
      return this.http.head(serviceUrls$1.documentUrl(identifier), {
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
      return this.http.put(serviceUrls$1.documentUrl(identifier), body, {
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
      return this.http.delete(serviceUrls$1.documentUrl(identifier), {
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
      return this.http.put(serviceUrls$1.validateUrl(), body, {
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
      return this.http.get(serviceUrls$1.securityUrl(identifier, 'create'), {
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
      return this.http.get(serviceUrls$1.securityUrl(identifier, 'update'), {
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
      return this.http.get(serviceUrls$1.securityUrl(identifier, 'delete'), {
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
      return this.http.get(serviceUrls$1.documentVersionListUrl(identifier), {
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
      return this.http.get(serviceUrls$1.documentVersionUrl(identifier), {
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
      return this.http.get(serviceUrls$1.documentVersionInfoUrl(identifier), {
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
      return this.http.head(serviceUrls$1.documentVersionUrl(identifier), {
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
      const temporarySlot = this.http.put(serviceUrls$1.temporaryAttachmentUrl(), tempSlotBody).then(res => res.data).catch(tryCastToApiError);

      // upload the file to the temporary slot on S3    
      apiConfig.headers['Content-Type'] = temporarySlot.contentType;
      //apiConfig.headers['Authorization'] = undefined;
      this.http.put(temporarySlot.url, file, {
        ...apiConfig
      }).then(res => res.data).catch(tryCastToApiError);

      //persists the file using the KM persists attachments endpoint
      const persistedAttachment = this.http.post(serviceUrls$1.persistAttachmentUrl(identifier, temporarySlot.uid), fileName, {
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
          const data = _this2.http.put(serviceUrls$1.attachmentUrl(identifier, file.name), body = file, {
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
  const serviceUrls = {
    documentQueryUrl() {
      return "/api/v2013/documents";
    },
    draftUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/draft");
    },
    draftSecurityUrl(identifier, operation) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/draft/securities/").concat(encodeURIComponent(operation));
    },
    draftLockUrl(identifier, lockID) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/draft/locks/").concat(encodeURIComponent(lockID));
    },
    draftLockListUrl(identifier) {
      return "/api/v2013/documents/".concat(encodeURIComponent(identifier), "/versions/draft/locks");
    }
  };
  var _realm4 = /*#__PURE__*/new WeakMap();
  class KmDraftsApi extends ApiBase {
    constructor(options) {
      super(options);
      _classPrivateFieldInitSpec(this, _realm4, void 0);
      this.self = this;
      _classPrivateFieldSet(_realm4, this, options.realm);
    }
    async query() {
      var _data$Items;
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
        $top: l,
        $skip: sk,
        collection: "mydraft"
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      const data = this.http.get(serviceUrls.documentQueryUrl(), {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
      if (data !== null && data !== void 0 && (_data$Items = data.Items) !== null && _data$Items !== void 0 && _data$Items.length) {
        data.Items = data.Items.map(e => {
          if (e.workingDocumentBody) {
            e.body = e.workingDocumentBody;
          }
          return e;
        });
      }
      return data;
    }
    async get(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      const data = this.http.get(serviceUrls.draftUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
      if (data.workingDocumentBody) {
        data.body = data.workingDocumentBody;
      }
      return data;
    }
    async exists(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      return this.http.head(serviceUrls.draftUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async put(identifier, body) {
      let {
        realm,
        schema
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(body)) throw Error("invalid value for body");
      const params = stringifyUrlParams({
        schema
      });
      const Realm = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      const ContentType = {
        'Content-Type': 'application/json'
      };
      const headers = {
        ...Realm,
        ...ContentType
      };
      return this.http.put(serviceUrls.draftUrl(identifier), body, {
        headers,
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async delete(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      return this.http.delete(serviceUrls.draftUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async canCreate(identifier) {
      let {
        realm,
        schema,
        metadata
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const params = stringifyUrlParams({
        schema,
        metadata
      });
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'create'), {
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
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      const params = stringifyUrlParams({
        metadata
      });
      return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'update'), {
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
        Realm: realm || _classPrivateFieldGet(_realm4, this) || undefined
      };
      return this.http.get(serviceUrls.draftSecurityUrl(identifier, 'delete'), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  var _realm5 = /*#__PURE__*/new WeakMap();
  class KmLocksApi extends ApiBase {
    constructor(options) {
      super(options);
      _classPrivateFieldInitSpec(this, _realm5, void 0);
      this.self = this;
      _classPrivateFieldSet(_realm5, this, options.realm);
    }
    async query(identifier) {
      let {
        realm
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm5, this) || undefined
      };
      return this.http.get(serviceUrls.draftLockListUrl(identifier), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async get(identifier, lockID) {
      let {
        realm
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(lockID)) throw Error("invalid value for lockID");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm5, this) || undefined
      };
      return this.http.get(serviceUrls.draftLockUrl(identifier, lockID), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async exists(identifier, lockID) {
      let {
        realm
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(lockID)) throw Error("invalid value for lockID");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm5, this) || undefined
      };
      return this.http.head(serviceUrls.draftLockUrl(identifier, lockID), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async put(identifier, lockID, body) {
      let {
        realm
      } = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(lockID)) throw Error("invalid value for lockID");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm5, this) || undefined
      };
      return this.http.put(serviceUrls.draftLockUrl(identifier, lockID), body, {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async delete(identifier, lockID) {
      let {
        realm
      } = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      if (!isValid(identifier)) throw Error("invalid value for identifier");
      if (!isValid(lockID)) throw Error("invalid value for lockID");
      const headers = {
        Realm: realm || _classPrivateFieldGet(_realm5, this) || undefined
      };
      return this.http.delete(serviceUrls.draftLockUrl(identifier, lockID), {
        headers
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  class KmStorageApi extends ApiBase {
    constructor(options) {
      super(options);
      this.documents = new KmDocumentsApi(options);
      this.documentsVersion = new KmDocumentsVersionApi(options);
      this.drafts = new KmDraftsApi(options);
      this.locks = new KmLocksApi(options);
      this.attachments = new KmAttachmentsApi(options);
    }
  }
  const _hoisted_1 = {
    key: 0,
    style: {
      "border": "1px solid #eee"
    },
    class: "vld-parent"
  };
  const _hoisted_2 = {
    style: {
      "border": "1px solid #eee",
      "border-top": "none"
    }
  };
  const _hoisted_3 = {
    class: "float-end",
    id: "wordCountSec",
    style: {
      "padding-right": "5px"
    }
  };
  const _hoisted_4 = {
    key: 1,
    style: {
      "border": "1px solid #eee",
      "border-top": "none"
    }
  };
  const _hoisted_5 = {
    class: "alert alert-danger",
    role: "alert"
  };

  //   import OverlayLoading from 'vue3-loading-overlay';
  //   import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';
  //   import KmSpinner from '../KmSpinner.vue';

  var script = {
    __name: 'ck-editor',
    props: /*#__PURE__*/Vue.mergeModels({
      tagName: {
        type: String,
        required: false,
        default: 'div'
      },
      uploadUrl: {
        type: String,
        required: false
      },
      config: {
        type: Object,
        required: true
      },
      identifier: {
        type: String,
        required: true
      }
    }, {
      "modelValue": {
        type: String,
        required: true,
        default: ''
      },
      "modelModifiers": {}
    }),
    emits: /*#__PURE__*/Vue.mergeModels(['update:modelValue', 'onFileUpload', 'onEditorDestroy'], ["update:modelValue"]),
    setup(__props, _ref2) {
      let {
        emit: __emit
      } = _ref2;
      const model = Vue.useModel(__props, "modelValue");
      const props = __props;
      const emit = __emit;
      const api = new KmStorageApi({});
      const ckeditor = CKEditor__default["default"].component;
      const editor = ClassicEditor__default["default"];
      const uploadErrors = [];
      const {
        t,
        locale
      } = useI18n();
      const wordCount = Vue.ref(0);
      const isUploadingFile = Vue.ref(false);
      const binding = Vue.computed({
        get() {
          return model.value;
        },
        set(value) {
          emit('update:modelValue', value);
        }
      });
      const onEditorReady = ed => {
        class UploadAdapter {
          constructor(loader) {
            this.loader = loader;
          }
          upload() {
            const loader = this.loader;
            return this.loader.file.then(function (file) {
              isUploadingFile.value = true;
              return api.attachments.uploadTempFile(props.identifier, file, file.name).then(function (success) {
                success.urls = {
                  "default": success.url
                };
                loader.uploaded = success;
                return success;
              }).catch(function (error) {
                uploadErrors.push({
                  file: file.name
                });
                useLogger().error(error);
                throw error;
              }).finally(() => {
                isUploadingFile.value = false;
              });
            });
          }
          abort() {}
        }
        ed.plugins.get('FileRepository').createUploadAdapter = function (loader) {
          const uploadAdapter = new UploadAdapter(loader);
          uploadAdapter.loader.on('change:uploaded', onEditorImageUploaded);
          return uploadAdapter;
        };
        ed.editing.view.document.on('paste', function (eventInfo, data) {
          // console.debug('paste', eventInfo, data)
        });
        ed.editing.view.document.on('drop', async function (eventInfo, data) {
          if (data.dataTransfer) {
            isUploadingFile.value = true;
            const fileUploads = data.dataTransfer.files.map(function (file, i) {
              const formData = new FormData();
              const fileType = file.type.substring(0, 5);
              const mimeType = api.attachments.getMimeType(file);
              if (fileType == "image") return;
              if (api.attachments.mimeTypeWhitelist().indexOf(mimeType) < 0) {
                alert("File type not supported: " + mimeType + "(" + file.name + ")");
                return;
              }
              formData.append('file', file);
              return api.attachments.uploadTempFile(props.identifier, file, file.name).then(function (success) {
                const viewFragment = ed.data.processor.toView('<span class="me-2">&nbsp;<a rel="noopener noreferrer" target="_blank" href="' + success.url + '">' + success.filename + '</a>&nbsp;</span>');
                const modelFragment = ed.data.toModel(viewFragment);
                ed.model.insertContent(modelFragment);
                onFileUpload({
                  file: success
                });
              }).catch(e => {
                uploadErrors.push({
                  file: file.name
                });
                useLogger().error(e);
              });
            });
            try {
              await Promise.all(fileUploads);
            } catch (e) {
              useLogger().error(e);
            } finally {
              isUploadingFile.value = false;
            }
          }
        });
        ed.model.document.on('change:data', function (eventInfo, data) {
          // console.debug('change', eventInfo, data)
        });
        function onEditorImageUploaded(eventInfo, name, value, oldValue) {
          // console.log((eventInfo, name, value, oldValue))
          //TODO: check why url is not in event args
          if (value.url) {
            onFileUpload({
              file: value
            });
          }
        }
        emit('onEditorReady', ed);
      };
      const onEditorFocus = (event, editor) => {
        // console.debug( 'Editor focused.', { event, editor } );
        emit('onEditorFocus', event, editor);
      };
      const onEditorBlur = (event, editor) => {
        // console.debug( 'Editor blurred.', { event, editor } );
        emit('onEditorBlur', event, editor);
      };
      const onEditorInput = (data, event, editor) => {
        emit('onEditorInput', event, editor);
      };
      const onEditorDestroy = editor => {
        // console.debug( 'Editor destroyed.', { editor } );
        emit('onEditorDestroy', editor);
      };
      const onFileUpload = params => {
        emit('onFileUpload', params);
      };
      const editorConfig = Vue.computed(() => {
        return {
          ...props.config,
          language: {
            ui: locale,
            content: locale
          },
          wordCount: {
            onUpdate: function (stats) {
              wordCount.value = stats.words;
            }
          }
        };
      });
      return (_ctx, _cache) => {
        return Vue.openBlock(), Vue.createElementBlock("div", null, [editorConfig.value ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [Vue.createCommentVNode(" <overlay-loading :active=\"isUploadingFile\" \r\n          :can-cancel=\"false\" background-color=\"rgb(9 9 9)\"\r\n          :is-full-page=\"false\">\r\n          <km-spinner size=\"lg\" \r\n              :message=\"t('uploadingFile')\"></km-spinner>\r\n      </overlay-loading>\r\n   "), Vue.createVNode(Vue.unref(ckeditor), {
          modelValue: binding.value,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => binding.value = $event),
          editor: Vue.unref(editor),
          config: editorConfig.value,
          tagName: __props.tagName,
          disabled: _ctx.$attrs.disabled,
          onReady: onEditorReady,
          onFocus: onEditorFocus,
          onBlur: onEditorBlur,
          onInput: onEditorInput,
          onDestroy: onEditorDestroy
        }, null, 8 /* PROPS */, ["modelValue", "editor", "config", "tagName", "disabled"])])) : Vue.createCommentVNode("v-if", true), Vue.createElementVNode("p", _hoisted_2, [Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('attachmentMessage')) + " ", 1 /* TEXT */), Vue.createElementVNode("span", _hoisted_3, [Vue.createElementVNode("strong", null, Vue.toDisplayString(Vue.unref(t)('wordCount')) + ": " + Vue.toDisplayString(wordCount.value), 1 /* TEXT */)])]), uploadErrors.length ? (Vue.openBlock(), Vue.createElementBlock("p", _hoisted_4, [Vue.createElementVNode("div", _hoisted_5, [Vue.createTextVNode(Vue.toDisplayString(Vue.unref(t)('uploadError')) + " ", 1 /* TEXT */), Vue.createElementVNode("ul", null, [(Vue.openBlock(), Vue.createElementBlock(Vue.Fragment, null, Vue.renderList(uploadErrors, error => {
          return Vue.createElementVNode("li", {
            key: error
          }, Vue.toDisplayString(error.file), 1 /* TEXT */);
        }), 64 /* STABLE_FRAGMENT */))])])])) : Vue.createCommentVNode("v-if", true)]);
      };
    }
  };
  script.__file = "src/components/inputs/ck-editor/ck-editor.vue";
  return script;
});
//# sourceMappingURL=ck-editor.umd.js.map

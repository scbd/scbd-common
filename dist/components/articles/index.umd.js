(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('axios'), require('lodash')) : typeof define === 'function' && define.amd ? define(['exports', 'vue', 'axios', 'lodash'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ScbdCommonComponentsArticles = {}, global.Vue, global.axios, global.lodash));
})(this, function (exports, Vue, axios, lodash) {
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
  var axios__default = /*#__PURE__*/_interopDefaultLegacy(axios);
  function render$2(_ctx, _cache) {
    return Vue.openBlock(), Vue.createElementBlock("div", null, " this component is done in other branch ");
  }
  const script$3 = {};
  script$3.render = render$2;
  script$3.__file = "src/components/articles/articles-accordion.vue";
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
  function mapObjectId(id) {
    return isObjectId(id) ? {
      $oid: id
    } : id;
  }
  function isObjectId(id) {
    return /^[a-f0-9]{24}/i.test(id);
  }
  function isValid(params) {
    return ![undefined, null].includes(params);
  }
  class ArticlesApi extends ApiBase {
    constructor(options) {
      super(options);
    }
    async getArticleGroup(groupKey) {
      let {
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(groupKey)) throw Error("invalid value for groupKey");
      const params = stringifyUrlParams({
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      });
      return this.http.get("api/v2017/articles/grouping/".concat(encodeURIComponent(groupKey)), {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getArticles() {
      let {
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const params = stringifyUrlParams({
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      });
      return this.http.get("api/v2017/articles", {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getArticleById(id) {
      if (!isValid(id)) throw Error("invalid value for id");
      return this.http.get("api/v2017/articles/".concat(id)).then(res => res.data).catch(tryCastToApiError);
    }
    async getArticlesByTag(tag) {
      let {
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      } = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      if (!isValid(tag)) throw Error("invalid value for tag");
      const params = stringifyUrlParams({
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      });
      const query = q;
      if (tag) {
        params.q = stringifyUrlParam({
          ...query,
          ...{
            tags: mapObjectId(tag)
          }
        });
      }
      return this.http.get("api/v2017/articles", {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
    async getArticleAdminTags() {
      let {
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      const params = stringifyUrlParams({
        q,
        f,
        s,
        sk,
        l,
        c,
        fo,
        ag
      });
      return this.http.get("api/v2021/article-admin-tags", {
        params
      }).then(res => res.data).catch(tryCastToApiError);
    }
  }
  function lstring(ltext, locale) {
    if (Number.isInteger(ltext))
      //is number to handle generic implementation of NR
      return ltext;
    if (!ltext) return "";
    if (typeof ltext == 'string') return ltext;
    let sText = "";
    if (!sText && locale) sText = ltext[locale];
    if (!sText) sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if (normalized[locale]) return normalized[locale];
      for (var key in ltext) {
        sText = ltext[key];
        if (sText) break;
      }
    }
    return sText || "";
  }
  function normalizeText(text) {
    if (!text) return null;
    var entry = {
      ar: text.ar,
      en: text.en,
      es: text.es,
      fr: text.fr,
      ru: text.ru,
      zh: text.zh
    };
    if (!entry.en) entry.en = entry.fr;
    if (!entry.en) entry.en = entry.es;
    if (!entry.en) entry.en = entry.ru;
    if (!entry.en) entry.en = entry.ar;
    if (!entry.en) entry.en = entry.zh;
    if (!entry.fr) entry.fr = entry.en;
    if (!entry.es) entry.es = entry.en;
    if (!entry.ru) entry.ru = entry.en;
    if (!entry.ar) entry.ar = entry.en;
    if (!entry.zh) entry.zh = entry.en;
    return entry;
  }
  var script$2 = {
    name: 'cbdAddNewArticle',
    props: {
      tags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of tag id's
      customTags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of customTag id's
      adminTags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of adminTag text
      target: {
        type: String,
        required: false,
        default: '_blank'
      },
      id: {
        type: String,
        required: false,
        default: undefined
      }
    },
    computed: {
      newArticleUrl: function () {
        const domain = window.location.hostname.replace(/[^\.]+\./, '');
        let baseUrl = 'https://www.cbd.int/management';
        if (domain == 'localhost' || domain == 'cbddev.xyz') baseUrl = 'https://oasis.cbddev.xyz';
        const queryString = [];
        if (!this.id) {
          var _this$tags, _this$customTags, _this$adminTags;
          if ((_this$tags = this.tags) !== null && _this$tags !== void 0 && _this$tags.length) queryString.push('tags=' + this.tags.map(encodeURIComponent).join(','));
          if ((_this$customTags = this.customTags) !== null && _this$customTags !== void 0 && _this$customTags.length) queryString.push('customTags=' + this.customTags.map(encodeURIComponent).join(','));
          if ((_this$adminTags = this.adminTags) !== null && _this$adminTags !== void 0 && _this$adminTags.length) queryString.push('adminTags=' + this.adminTags.map(encodeURIComponent).join(','));
        }
        queryString.push('returnUrl=' + encodeURI(window.location.href));
        if (!this.id) return "".concat(baseUrl, "/articles/new?").concat(queryString.join('&'));
        return "".concat(baseUrl, "/articles/").concat(encodeURIComponent(this.id), "/edit?").concat(queryString.join('&'));
      }
    }
  };
  const _hoisted_1$2 = ["href", "target"];
  const _hoisted_2$2 = {
    key: 0
  };
  const _hoisted_3$1 = /*#__PURE__*/Vue.createElementVNode("i", {
    class: "fa fa-plus"
  }, null, -1 /* HOISTED */);
  const _hoisted_4$1 = {
    key: 1
  };
  const _hoisted_5$1 = /*#__PURE__*/Vue.createElementVNode("i", {
    class: "fa fa-edit"
  }, null, -1 /* HOISTED */);
  function render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return Vue.openBlock(), Vue.createElementBlock("a", {
      href: $options.newArticleUrl,
      target: $props.target
    }, [Vue.renderSlot(_ctx.$slots, "default", {}, () => [!$props.id ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_2$2, [_hoisted_3$1, Vue.createTextVNode(" Add Content")])) : Vue.createCommentVNode("v-if", true), $props.id ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_4$1, [_hoisted_5$1, Vue.createTextVNode(" Edit Content")])) : Vue.createCommentVNode("v-if", true)])], 8 /* PROPS */, _hoisted_1$2);
  }
  script$2.render = render$1;
  script$2.__file = "src/components/articles/cbd-add-new-article.vue";

  // https://raw.githubusercontent.com/mathiasbynens/CSS.escape/master/css.escape.js

  const cssEscape = function (value) {
    if (arguments.length == 0) {
      throw new TypeError('`CSS.escape` requires an argument.');
    }
    var string = String(value);
    var length = string.length;
    var index = -1;
    var codeUnit;
    var result = '';
    var firstCodeUnit = string.charCodeAt(0);
    if (
    // If the character is the first character and is a `-` (U+002D), and
    // there is no second character, […]
    length == 1 && firstCodeUnit == 0x002D) {
      return '\\' + string;
    }
    while (++index < length) {
      codeUnit = string.charCodeAt(index);
      // Note: there’s no need to special-case astral symbols, surrogate
      // pairs, or lone surrogates.

      // If the character is NULL (U+0000), then the REPLACEMENT CHARACTER
      // (U+FFFD).
      if (codeUnit == 0x0000) {
        result += '\uFFFD';
        continue;
      }
      if (
      // If the character is in the range [\1-\1F] (U+0001 to U+001F) or is
      // U+007F, […]
      codeUnit >= 0x0001 && codeUnit <= 0x001F || codeUnit == 0x007F ||
      // If the character is the first character and is in the range [0-9]
      // (U+0030 to U+0039), […]
      index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
      // If the character is the second character and is in the range [0-9]
      // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]

      index == 1 && codeUnit >= 0x0030 && codeUnit <= 0x0039 && firstCodeUnit == 0x002D) {
        // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
        result += '\\' + codeUnit.toString(16) + ' ';
        continue;
      }

      // If the character is not handled by one of the above rules and is
      // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
      // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
      // U+005A), or [a-z] (U+0061 to U+007A), […]
      if (codeUnit >= 0x0080 || codeUnit == 0x002D || codeUnit == 0x005F || codeUnit >= 0x0030 && codeUnit <= 0x0039 || codeUnit >= 0x0041 && codeUnit <= 0x005A || codeUnit >= 0x0061 && codeUnit <= 0x007A) {
        // the character itself
        result += string.charAt(index);
        continue;
      }

      // Otherwise, the escaped character.
      // https://drafts.csswg.org/cssom/#escape-a-character
      result += '\\' + string.charAt(index);
    }
    return result;
  };
  const _hoisted_1$1 = {
    key: 0,
    class: "image-credit-wrapper"
  };
  const _hoisted_2$1 = {
    key: 1,
    class: "image-credit"
  };
  var script$1 = {
    __name: 'cbd-article-cover-image',
    props: {
      coverImage: {
        type: Object,
        required: true
      }
    },
    setup(__props) {
      const cssEscapeUrl = function (url) {
        return cssEscape(url);
      };
      //  const cssEscapeUrl = (url) => cssEscape(url);

      return (_ctx, _cache) => {
        return __props.coverImage.url ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1$1, [__props.coverImage.url_1200 || __props.coverImage.url ? (Vue.openBlock(), Vue.createElementBlock("div", {
          key: 0,
          class: Vue.normalizeClass('img cover-image cover-image-position-' + (__props.coverImage.position || 'center') + ' cover-image-size-' + (__props.coverImage.size || 'cover')),
          style: Vue.normalizeStyle('background-image: url(' + cssEscapeUrl(__props.coverImage.url_1200 || __props.coverImage.url) + ');')
        }, null, 6 /* CLASS, STYLE */)) : Vue.createCommentVNode("v-if", true), __props.coverImage.credits ? (Vue.openBlock(), Vue.createElementBlock("span", _hoisted_2$1, Vue.toDisplayString(__props.coverImage.credits), 1 /* TEXT */)) : Vue.createCommentVNode("v-if", true), Vue.renderSlot(_ctx.$slots, "default")])) : Vue.createCommentVNode("v-if", true);
      };
    }
  };
  script$1.__scopeId = "data-v-4581e3c4";
  script$1.__file = "src/components/articles/cbd-article-cover-image.vue";
  var script = {
    name: 'cbdArticle',
    components: {
      cbdAddNewArticle: script$2,
      cbdArticleCoverImage: script$1
    },
    props: {
      hideCoverImage: {
        type: Boolean,
        required: false,
        default: false
      },
      showEdit: {
        type: Boolean,
        required: false,
        default: true
      },
      showEditTarget: {
        type: String,
        required: false,
        default: '_self'
      },
      showEditRoles: {
        type: Array,
        required: false,
        default: []
      },
      // [] of scope roles
      article: {
        type: Object,
        required: false,
        default: undefined
      },
      query: {
        type: Object,
        required: false
      },
      tags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of tag id's
      customTags: {
        type: Array,
        required: false,
        default: []
      },
      // [] of customTag id's
      adminTags: {
        type: Array,
        required: false,
        default: []
      } // [] of adminTag text
    },
    data() {
      return {
        returnUrl: window.location.href,
        hasEditRights: false,
        loading: false
      };
    },
    created() {
      this.ArticlesApi = new ArticlesApi();
    },
    mounted() {
      if (!this.article && this.query) this.loadArticle();
    },
    methods: {
      async loadArticle() {
        try {
          this.loading = true;
          const query = this.query;
          const articleResult = await this.ArticlesApi.queryArticles(query);
          if (articleResult.length) {
            var _lArticle$coverImage;
            let lArticle = articleResult[0];
            this.preProcessOEmbed();
            if ((_lArticle$coverImage = lArticle.coverImage) !== null && _lArticle$coverImage !== void 0 && _lArticle$coverImage.url) {
              //sometime the file name has space/special chars, use new URL's href prop which encodes the special chars
              const url = new URL(lArticle.coverImage.url);
              lArticle.coverImage.url = url.href;
              lArticle.coverImage.url_1200 = lArticle.coverImage.url.replace(/attachments\.cbd\.int\//, '$&1200x600/');
            }
            this.article = lArticle;
            this.$emit('load', {
              ...this.article
            });
          } else {
            this.$emit('load');
          }
          this.$auth.fetchUser().then(() => {
            if (this.showEdit || this.showEdit == 'true' || this.hasOwnProperty(this.showEdit)) {
              let roles = [...this.showEditRoles, 'oasisArticleEditor', 'Administrator'];
              this.hasEditRights = this.$auth.hasScope(roles);
            }
          });
        } catch (e) {
          console.error(e);
        } finally {
          this.loading = false;
        }
      },
      preProcessOEmbed() {
        setTimeout(function () {
          document.querySelectorAll('oembed[url]').forEach(async function (element) {
            var url = element.attributes.url.value;
            var params = {
              url: encodeURI(url)
            };
            const response = await axios__default["default"].get('/api/v2020/oembed', {
              params: params
            });
            var embedHtml = '<div class="ck-media__wrapper" style="width:100%">' + response.data.html + '</div>';
            element.insertAdjacentHTML("afterend", embedHtml);
          });
        }, 500);
      }
    },
    filters: {
      lstring
    }
  };
  const _hoisted_1 = {
    style: {
      "border": "none",
      "margin-top": "10px"
    }
  };
  const _hoisted_2 = {
    key: 0
  };
  const _hoisted_3 = {
    key: 0
  };
  const _hoisted_4 = {
    key: 0,
    class: "pull-right"
  };
  const _hoisted_5 = ["innerHTML"];
  const _hoisted_6 = {
    key: 0,
    class: "ck-content"
  };
  const _hoisted_7 = {
    key: 0
  };
  const _hoisted_8 = /*#__PURE__*/Vue.createElementVNode("i", {
    class: "fa fa-spinner fa-spin"
  }, null, -1 /* HOISTED */);
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_cbd_article_cover_image = Vue.resolveComponent("cbd-article-cover-image");
    const _component_cbd_add_new_article = Vue.resolveComponent("cbd-add-new-article");
    return Vue.openBlock(), Vue.createElementBlock("div", _hoisted_1, [!$data.loading ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_2, [Vue.renderSlot(_ctx.$slots, "article-cover-image", {}, () => [!$props.hideCoverImage && $props.article && $props.article.coverImage && $props.article.coverImage.url ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_3, [Vue.createVNode(_component_cbd_article_cover_image, {
      "cover-image": $props.article.coverImage
    }, null, 8 /* PROPS */, ["cover-image"])])) : Vue.createCommentVNode("v-if", true)]), Vue.renderSlot(_ctx.$slots, "article-add-new", {}, () => [$data.hasEditRights ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_4, [Vue.createVNode(_component_cbd_add_new_article, {
      tags: $props.tags,
      "admin-tags": $props.adminTags,
      "custom-tags": $props.customTags,
      id: ($props.article || {})._id,
      target: $props.showEditTarget,
      class: "btn btn-default"
    }, null, 8 /* PROPS */, ["tags", "admin-tags", "custom-tags", "id", "target"])])) : Vue.createCommentVNode("v-if", true)]), Vue.renderSlot(_ctx.$slots, "article", {}, () => [$props.article ? (Vue.openBlock(), Vue.createElementBlock("div", {
      key: 0,
      innerHTML: _ctx.$options.filters.lstring($props.article.content, _ctx.$locale),
      class: "ck-content"
    }, null, 8 /* PROPS */, _hoisted_5)) : Vue.createCommentVNode("v-if", true)]), Vue.renderSlot(_ctx.$slots, "article-empty", {}, () => [!$props.article ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_6, "No information is available for this section at the moment.")) : Vue.createCommentVNode("v-if", true)])])) : Vue.createCommentVNode("v-if", true), Vue.renderSlot(_ctx.$slots, "article-loading", {}, () => [$data.loading ? (Vue.openBlock(), Vue.createElementBlock("div", _hoisted_7, [Vue.createTextVNode("Loading content... "), _hoisted_8])) : Vue.createCommentVNode("v-if", true)])]);
  }
  script.render = render;
  script.__file = "src/components/articles/cbd-article.vue";
  exports.articlesAccordion = script$3;
  exports.cbdAddNewArticle = script$2;
  exports.cbdArticle = script;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
//# sourceMappingURL=index.umd.js.map

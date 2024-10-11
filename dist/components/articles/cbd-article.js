import axios from 'axios';
import { isFunction } from 'lodash';
import * as Vue from 'vue';
import { openBlock, createElementBlock, renderSlot, createTextVNode, createCommentVNode, createElementVNode, normalizeClass, normalizeStyle, toDisplayString, resolveComponent, createVNode } from 'vue';

let sitePrefixUrl = 'https://api.cbd.int';

if(/\.cbd\.int$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbd.int';
if(/\.cbddev\.xyz$/i.test(window?.location?.hostname || '')) sitePrefixUrl= 'https://api.cbddev.xyz';
if(/\localhost$/i   .test(window?.location?.hostname || '')) sitePrefixUrl= '/';

const defaultOptions = { 
   prefixUrl:  sitePrefixUrl, 
   timeout  : 30 * 1000,
   token: Vue?.prototype?.$auth?.strategy?.token?.get()  
};

class ApiBase
{
  constructor(options) {
    options = options || {};

    if(isFunction(options)) options = { token : options };

    const { token, prefixUrl, timeout, tokenType } = { ...defaultOptions, ...options };

    this.config = {
      baseURL : prefixUrl,
      timeout,
      tokenType,
      token,
    };

    const http = async function (...args) {   
      return (await loadAsyncHeaders(this.config))(...args);
    };

    http.get     = async (...args)=> (await loadAsyncHeaders(this.config)).get    (...args);
    http.head    = async (...args)=> (await loadAsyncHeaders(this.config)).head   (...args);
    http.post    = async (...args)=> (await loadAsyncHeaders(this.config)).post   (...args);
    http.put     = async (...args)=> (await loadAsyncHeaders(this.config)).put    (...args);
    http.patch   = async (...args)=> (await loadAsyncHeaders(this.config)).patch  (...args);
    http.delete  = async (...args)=> (await loadAsyncHeaders(this.config)).delete (...args);
    http.options = async (...args)=> (await loadAsyncHeaders(this.config)).options(...args);
    http.request = async (...args)=> (await loadAsyncHeaders(this.config)).request(...args);

    this.http = http;
  }
}

async function loadAsyncHeaders(baseConfig) {

  const { token, tokenType, ...config } = baseConfig || {};

  const headers = { ...(config.headers || {}) };

  if(token) {
      headers.Authorization = `${tokenType||'Bearer'} ${token}`;
  }

  return axios.create({ ...config, headers } );

}

//////////////////////////
// Helpers
////////////////////////

function tryCastToApiError(error) {

  if(error && error.response && error.response.data && error.response.data.code) {
      error.response.data;
      throw error.response.data;
  }

  throw error
}

function stringifyUrlParam(value) {
  if (value instanceof(Date))   {return value.toISOString()}    
  if (value instanceof(Object)) {return JSON.stringify(value)}  
  return value; 
}

function stringifyUrlParams(valueObj) {
  const returnObj = {};

  for (const [key, value] of Object.entries(valueObj)) {
    if (isValid(value)){
      returnObj[key] = stringifyUrlParam(value);
    }
  }
  
  return returnObj;
}

function mapObjectId(id){  
  return isObjectId(id)? { $oid: id } : id
}

function isObjectId(id){
  return /^[a-f0-9]{24}/i.test(id);
}

function isValid(params){
  return ![undefined, null].includes(params);
}

class ArticlesApi extends ApiBase
{
  constructor(options) {
    super(options);
  }
  
  async getArticleGroup(groupKey, {q, f, s, sk, l , c, fo, ag }={})  {    
    if(!isValid(groupKey)) throw Error(`invalid value for groupKey`); 
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles/grouping/${encodeURIComponent(groupKey)}`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
   }

  async getArticles({q, f, s, sk, l , c, fo, ag }={})  {
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2017/articles`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);
  }

  async getArticleById(id )  {
    if(!isValid(id)) throw Error(`invalid value for id`);

    return this.http.get(`api/v2017/articles/${id}`)
                      .then(res => res.data)
                      .catch(tryCastToApiError);  
  }


  async getArticlesByTag(tag, {q, f, s, sk, l , c, fo, ag }={})  {    
    if(!isValid(tag)) throw Error(`invalid value for tag`);

   const params=  stringifyUrlParams({q, f, s, sk, l , c, fo, ag });
   const query = q;   
   
   if (tag){
    params.q = stringifyUrlParam({...query, ...{tags: mapObjectId(tag)}});    
   } 

    return this.http.get(`api/v2017/articles`,  { params })
                    .then(res => res.data)
                    .catch(tryCastToApiError);  
 }

   

  async getArticleAdminTags({q, f, s, sk, l , c, fo, ag }={}){    
    const params = stringifyUrlParams( {q, f, s, sk, l , c, fo, ag });

    return this.http.get(`api/v2021/article-admin-tags`,  { params } )
                    .then(res => res.data)
                    .catch(tryCastToApiError);

  }
 }

function lstring(ltext, locale) {
  
    if(Number.isInteger(ltext)) //is number to handle generic implementation of NR
      return ltext;
  
    if (!ltext)
      return "";
    if (typeof(ltext) == 'string')
      return ltext;
    let sText="";
    if (!sText && locale)
      sText = ltext[locale];
    if (!sText)
      sText = ltext.en;
    if (!sText) {
      var normalized = normalizeText(ltext);
      if(normalized[locale])
        return normalized[locale];

      for (var key in ltext) {
        sText = ltext[key];
        if (sText)
          break;
      }
    }
    return sText || "";
}


function normalizeText(text) {
  if(!text) return null;

  var entry = { ar: text.ar, en: text.en, es: text.es, fr: text.fr, ru: text.ru, zh: text.zh };

  if(!entry.en) entry.en = entry.fr;
  if(!entry.en) entry.en = entry.es;
  if(!entry.en) entry.en = entry.ru;
  if(!entry.en) entry.en = entry.ar;
  if(!entry.en) entry.en = entry.zh;

  if(!entry.fr) entry.fr = entry.en;
  if(!entry.es) entry.es = entry.en;
  if(!entry.ru) entry.ru = entry.en;
  if(!entry.ar) entry.ar = entry.en;
  if(!entry.zh) entry.zh = entry.en;
  return entry;
}

var script$2 = {
        name:'cbdAddNewArticle',
        props: {
            tags 		: { type: Array  , required: false, default:[]           }, // [] of tag id's
            customTags 	: { type: Array  , required: false, default:[]           }, // [] of customTag id's
            adminTags 	: { type: Array  , required: false, default:[]           }, // [] of adminTag text
            target      : { type: String , required: false, default: '_blank'    },
            id          : { type: String , required: false, default: undefined   },
        },
        computed: {
            newArticleUrl : function(){

                const domain = window.location.hostname.replace(/[^\.]+\./, '');
				let baseUrl = 'https://www.cbd.int/management';

				if(domain=='localhost' || domain == 'cbddev.xyz')
            		baseUrl = 'https://oasis.cbddev.xyz';

				const queryString = [];
                if(!this.id){
                    if(this.tags?.length)
                        queryString.push('tags='		+ this.tags.map(encodeURIComponent).join(','));
                    if(this.customTags?.length)
                        queryString.push('customTags='	+ this.customTags.map(encodeURIComponent).join(','));
                    if(this.adminTags?.length)
                        queryString.push('adminTags='	+ this.adminTags.map(encodeURIComponent).join(','));
                }

                queryString.push('returnUrl=' + encodeURI(window.location.href));

                if(!this.id)
                    return `${baseUrl}/articles/new?${queryString.join('&')}`
                
                return  `${baseUrl}/articles/${encodeURIComponent(this.id)}/edit?${queryString.join('&')}`;
            }
        }
    };

const _hoisted_1$2 = ["href", "target"];
const _hoisted_2$2 = { key: 0 };
const _hoisted_3$1 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-plus" }, null, -1 /* HOISTED */);
const _hoisted_4$1 = { key: 1 };
const _hoisted_5$1 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-edit" }, null, -1 /* HOISTED */);

function render$1(_ctx, _cache, $props, $setup, $data, $options) {
  return (openBlock(), createElementBlock("a", {
    href: $options.newArticleUrl,
    target: $props.target
  }, [
    renderSlot(_ctx.$slots, "default", {}, () => [
      (!$props.id)
        ? (openBlock(), createElementBlock("span", _hoisted_2$2, [
            _hoisted_3$1,
            createTextVNode(" Add Content")
          ]))
        : createCommentVNode("v-if", true),
      ($props.id)
        ? (openBlock(), createElementBlock("span", _hoisted_4$1, [
            _hoisted_5$1,
            createTextVNode(" Edit Content")
          ]))
        : createCommentVNode("v-if", true)
    ])
  ], 8 /* PROPS */, _hoisted_1$2))
}

script$2.render = render$1;
script$2.__file = "src/components/articles/cbd-add-new-article.vue";

// https://raw.githubusercontent.com/mathiasbynens/CSS.escape/master/css.escape.js
	
const cssEscape = function(value) {
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
        length == 1 &&
        firstCodeUnit == 0x002D
    ) {
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
            (codeUnit >= 0x0001 && codeUnit <= 0x001F) || codeUnit == 0x007F ||
            // If the character is the first character and is in the range [0-9]
            // (U+0030 to U+0039), […]
            (index == 0 && codeUnit >= 0x0030 && codeUnit <= 0x0039) ||
            // If the character is the second character and is in the range [0-9]
            // (U+0030 to U+0039) and the first character is a `-` (U+002D), […]
            (
                index == 1 &&
                codeUnit >= 0x0030 && codeUnit <= 0x0039 &&
                firstCodeUnit == 0x002D
            )
        ) {
            // https://drafts.csswg.org/cssom/#escape-a-character-as-code-point
            result += '\\' + codeUnit.toString(16) + ' ';
            continue;
        }

        // If the character is not handled by one of the above rules and is
        // greater than or equal to U+0080, is `-` (U+002D) or `_` (U+005F), or
        // is in one of the ranges [0-9] (U+0030 to U+0039), [A-Z] (U+0041 to
        // U+005A), or [a-z] (U+0061 to U+007A), […]
        if (
            codeUnit >= 0x0080 ||
            codeUnit == 0x002D ||
            codeUnit == 0x005F ||
            codeUnit >= 0x0030 && codeUnit <= 0x0039 ||
            codeUnit >= 0x0041 && codeUnit <= 0x005A ||
            codeUnit >= 0x0061 && codeUnit <= 0x007A
        ) {
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
    
    const cssEscapeUrl = function(url) {
        return cssEscape(url);
    };
    //  const cssEscapeUrl = (url) => cssEscape(url);


return (_ctx, _cache) => {
  return (__props.coverImage.url)
    ? (openBlock(), createElementBlock("div", _hoisted_1$1, [
        (__props.coverImage.url_1200||__props.coverImage.url)
          ? (openBlock(), createElementBlock("div", {
              key: 0,
              class: normalizeClass('img cover-image cover-image-position-' + (__props.coverImage.position||'center') + ' cover-image-size-' + (__props.coverImage.size||'cover')),
              style: normalizeStyle('background-image: url(' + cssEscapeUrl(__props.coverImage.url_1200||__props.coverImage.url) + ');')
            }, null, 6 /* CLASS, STYLE */))
          : createCommentVNode("v-if", true),
        (__props.coverImage.credits)
          ? (openBlock(), createElementBlock("span", _hoisted_2$1, toDisplayString(__props.coverImage.credits), 1 /* TEXT */))
          : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ]))
    : createCommentVNode("v-if", true)
}
}

};

script$1.__scopeId = "data-v-4581e3c4";
script$1.__file = "src/components/articles/cbd-article-cover-image.vue";

var script = {
    name: 'cbdArticle',
    components : { 
        cbdAddNewArticle: script$2, 
        cbdArticleCoverImage: script$1 
    },
    props: {
        hideCoverImage  : { type: Boolean, required: false, default:false        },
        showEdit        : { type: Boolean, required: false, default:true         },
        showEditTarget  : { type: String , required: false, default: '_self'     },
        showEditRoles   : { type: Array  , required: false, default:[]           }, // [] of scope roles
        article         : { type: Object,  required: false, default:undefined    },
        query           : { type: Object,  required: false                       },
        tags 		    : { type: Array  , required: false, default:[]           }, // [] of tag id's
        customTags 	    : { type: Array  , required: false, default:[]           }, // [] of customTag id's
        adminTags 	    : { type: Array  , required: false, default:[]           }, // [] of adminTag text
    },
    data() {
        return {
            returnUrl       : window.location.href,
            hasEditRights   : false,
            loading         : false
        }
    },
    created() {
       this.ArticlesApi = new ArticlesApi();
    },
    mounted() {
        if(!this.article && this.query)
            this.loadArticle();
    },
    methods: {
        async loadArticle() {
            try{
                this.loading = true;
                const query = this.query;
                const articleResult = await this.ArticlesApi.queryArticles(query);
     
                if(articleResult.length){
                    let lArticle = articleResult[0];

                    this.preProcessOEmbed();

                    if(lArticle.coverImage?.url){
                        //sometime the file name has space/special chars, use new URL's href prop which encodes the special chars
                        const url = new URL(lArticle.coverImage.url);
                        lArticle.coverImage.url = url.href;

                        lArticle.coverImage.url_1200  = lArticle.coverImage.url.replace(/attachments\.cbd\.int\//, '$&1200x600/');
                    }
                    this.article = lArticle;
                    this.$emit('load', { ...this.article });   
                }
                else {
                    this.$emit('load');
                }

                this.$auth.fetchUser().then(()=>{
                    if(this.showEdit || this.showEdit == 'true' || this.hasOwnProperty(this.showEdit)){

                        let roles = [...this.showEditRoles, 'oasisArticleEditor', 'Administrator'];
                        this.hasEditRights = this.$auth.hasScope(roles);
                    }
                });
            }
            catch(e){
                console.error(e);
            }
            finally{
                this.loading = false;
            }
        },
        preProcessOEmbed() {

            setTimeout(function(){

                document.querySelectorAll( 'oembed[url]' ).forEach(async function(element) {
                    var url = element.attributes.url.value;
                    var params = {
                        url : encodeURI(url),
                    };

                    const response = await axios.get('/api/v2020/oembed', {params:params});                    
                    var embedHtml = '<div class="ck-media__wrapper" style="width:100%">' + response.data.html +'</div>';
                    element.insertAdjacentHTML("afterend", embedHtml);
                    
                });

            }, 500);
        }
    },
    filters:{
        lstring
    }
};

const _hoisted_1 = { style: {"border":"none","margin-top":"10px"} };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = {
  key: 0,
  class: "pull-right"
};
const _hoisted_5 = ["innerHTML"];
const _hoisted_6 = {
  key: 0,
  class: "ck-content"
};
const _hoisted_7 = { key: 0 };
const _hoisted_8 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-spinner fa-spin" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_cbd_article_cover_image = resolveComponent("cbd-article-cover-image");
  const _component_cbd_add_new_article = resolveComponent("cbd-add-new-article");

  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (!$data.loading)
      ? (openBlock(), createElementBlock("div", _hoisted_2, [
          renderSlot(_ctx.$slots, "article-cover-image", {}, () => [
            (!$props.hideCoverImage && $props.article && $props.article.coverImage && $props.article.coverImage.url)
              ? (openBlock(), createElementBlock("div", _hoisted_3, [
                  createVNode(_component_cbd_article_cover_image, {
                    "cover-image": $props.article.coverImage
                  }, null, 8 /* PROPS */, ["cover-image"])
                ]))
              : createCommentVNode("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "article-add-new", {}, () => [
            ($data.hasEditRights)
              ? (openBlock(), createElementBlock("div", _hoisted_4, [
                  createVNode(_component_cbd_add_new_article, {
                    tags: $props.tags,
                    "admin-tags": $props.adminTags,
                    "custom-tags": $props.customTags,
                    id: ($props.article||{})._id,
                    target: $props.showEditTarget,
                    class: "btn btn-default"
                  }, null, 8 /* PROPS */, ["tags", "admin-tags", "custom-tags", "id", "target"])
                ]))
              : createCommentVNode("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "article", {}, () => [
            ($props.article)
              ? (openBlock(), createElementBlock("div", {
                  key: 0,
                  innerHTML: _ctx.$options.filters.lstring($props.article.content, _ctx.$locale),
                  class: "ck-content"
                }, null, 8 /* PROPS */, _hoisted_5))
              : createCommentVNode("v-if", true)
          ]),
          renderSlot(_ctx.$slots, "article-empty", {}, () => [
            (!$props.article)
              ? (openBlock(), createElementBlock("div", _hoisted_6, "No information is available for this section at the moment."))
              : createCommentVNode("v-if", true)
          ])
        ]))
      : createCommentVNode("v-if", true),
    renderSlot(_ctx.$slots, "article-loading", {}, () => [
      ($data.loading)
        ? (openBlock(), createElementBlock("div", _hoisted_7, [
            createTextVNode("Loading content... "),
            _hoisted_8
          ]))
        : createCommentVNode("v-if", true)
    ])
  ]))
}

script.render = render;
script.__file = "src/components/articles/cbd-article.vue";

export { script as default };
//# sourceMappingURL=cbd-article.js.map

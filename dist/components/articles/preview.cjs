'use strict';

var vue = require('vue');

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
    ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [
        (__props.coverImage.url_1200||__props.coverImage.url)
          ? (vue.openBlock(), vue.createElementBlock("div", {
              key: 0,
              class: vue.normalizeClass('img cover-image cover-image-position-' + (__props.coverImage.position||'center') + ' cover-image-size-' + (__props.coverImage.size||'cover')),
              style: vue.normalizeStyle('background-image: url(' + cssEscapeUrl(__props.coverImage.url_1200||__props.coverImage.url) + ');')
            }, null, 6 /* CLASS, STYLE */))
          : vue.createCommentVNode("v-if", true),
        (__props.coverImage.credits)
          ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2$1, vue.toDisplayString(__props.coverImage.credits), 1 /* TEXT */))
          : vue.createCommentVNode("v-if", true),
        vue.renderSlot(_ctx.$slots, "default")
      ]))
    : vue.createCommentVNode("v-if", true)
}
}

};

script$1.__scopeId = "data-v-4581e3c4";
script$1.__file = "src/components/articles/cbd-article-cover-image.vue";

const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("h3", null, "CBD Articles", -1 /* HOISTED */);
const _hoisted_2 = { class: "row" };
const _hoisted_3 = { class: "col-12" };
const _hoisted_4 = { class: "card" };
const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("div", { class: "card-header" }, " CBD Article Cover Image ", -1 /* HOISTED */);
const _hoisted_6 = { class: "card-body" };
const _hoisted_7 = { class: "row" };
const _hoisted_8 = { class: "col-6" };
const _hoisted_9 = /*#__PURE__*/vue.createElementVNode("div", { class: "col-4" }, [
  /*#__PURE__*/vue.createElementVNode("strong")
], -1 /* HOISTED */);

var script = {
  __name: 'preview',
  setup(__props) {

const coverImage = {
    url: "https://attachments.cbd.int/6d60d013f7f2ed996312f5caf90d1d7d/Manila Risk Assessment workshop-1 (1).png",
    credits: "The credit goes to you.",
};

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [
    vue.createElementVNode("div", null, [
      _hoisted_1,
      vue.createElementVNode("div", _hoisted_2, [
        vue.createElementVNode("div", _hoisted_3, [
          vue.createElementVNode("div", _hoisted_4, [
            _hoisted_5,
            vue.createElementVNode("div", _hoisted_6, [
              vue.createElementVNode("div", _hoisted_7, [
                vue.createElementVNode("div", _hoisted_8, [
                  vue.createVNode(script$1, { "cover-image": coverImage })
                ]),
                _hoisted_9
              ])
            ])
          ])
        ])
      ])
    ]),
    vue.createCommentVNode(" <div class=\"row\">\r\n    <div class=\"col-4\">\r\n      \r\n    </div>\r\n    <div class=\"col-4\">\r\n      <h3>Code</h3>\r\n      <textarea rows=\"10\" cols=\"80\" class=\"bg-black text-white\">\r\n                <template>\r\n                    <div class=\"image-credit-wrapper\" v-if=\"coverImage.url\"><div :class=\"'img cover-image cover-image-position-' + (coverImage.position||'center') + ' cover-image-size-' + (coverImage.size||'cover')\"\r\n\r\n                    v-if=\"coverImage.url_1200||coverImage.url\" :style=\"'background-image: url(' + cssEscapeUrl(coverImage.url_1200||coverImage.url) + ');'\"></div><span class=\"image-credit\" v-if=\"coverImage.credits\"> {\r\n                            {\r\n                            coverImage.credits\r\n                        }\r\n                    }\r\n\r\n                    </span><slot></slot></div></template><script setup>import {\r\n                        cssEscape\r\n                    }\r\n\r\n                    from '../../services/util/css.escape';\r\n\r\n                    const {\r\n                        coverImage\r\n                    }\r\n\r\n                    =defineProps({\r\n                        coverImage: {\r\n                            type: Object,\r\n                            required: true\r\n                        }\r\n                    });\r\n\r\n                    const cssEscapeUrl=function(url) {\r\n                        return cssEscape(url);\r\n                    }\r\n\r\n                    </script><style scoped>.image-credit-wrapper img {\r\n                        width: 100% !important;\r\n                    }\r\n\r\n                    .image-credit-wrapper {\r\n                        overflow: hidden;\r\n                        position: relative;\r\n                        /* margin-left: -15px;\r\n                                        margin-right: -15px; */\r\n                        max-height: 375px;\r\n                        width: 100%\r\n                    }\r\n\r\n                    .image-credit-wrapper .image-credit {\r\n                        position: absolute;\r\n                        right: 0px;\r\n                        bottom: 4px;\r\n                    }\r\n\r\n                    .image-credit {\r\n                        background: rgba(0, 0, 0, .7);\r\n                        color: #ccc;\r\n                        display: inline-block;\r\n                        font-size: 11px;\r\n                        font-family: helvetica;\r\n                        font-weight: 300;\r\n                        padding: 5px 8px;\r\n                        position: absolute;\r\n                        bottom: 0;\r\n                        right: 0;\r\n                    }\r\n\r\n                    .cover-image {\r\n                        width: 100%;\r\n                        background-repeat: no-repeat;\r\n                        position: absolute;\r\n                        top: 0px;\r\n                        right: 0px;\r\n                        bottom: 0px;\r\n                        left: 0px;\r\n\r\n                    }\r\n\r\n                    .cover-image-position-left {\r\n                        background-position: left;\r\n                    }\r\n\r\n                    .cover-image-position-right {\r\n                        background-position: right;\r\n                    }\r\n\r\n                    .cover-image-position-top {\r\n                        background-position: top;\r\n                    }\r\n\r\n                    .cover-image-position-center {\r\n                        background-position: center;\r\n                    }\r\n\r\n                    .cover-image-position-bottom {\r\n                        background-position: bottom;\r\n                    }\r\n\r\n                    .cover-image-size-cover {\r\n                        background-size: cover;\r\n                    }\r\n\r\n                    .cover-image-size-contain {\r\n                        background-size: contain;\r\n                    }\r\n\r\n                    @media (max-width: 767px) {\r\n\r\n                        /*For all phone sizes*/\r\n                        .image-credit-wrapper {\r\n                            height: 120px;\r\n                        }\r\n                    }\r\n\r\n                    @media (min-width: 768px) and (max-width: 991px) {\r\n\r\n                        /* For IPads*/\r\n                        .image-credit-wrapper {\r\n                            height: 250px;\r\n                        }\r\n                    }\r\n\r\n                    @media (min-width: 992px) and (max-width: 1199px) {\r\n\r\n                        /* For IPad pro*/\r\n                        .image-credit-wrapper {\r\n                            height: 300px;\r\n                        }\r\n                    }\r\n\r\n                    @media (min-width: 1200px) {\r\n\r\n                        /* For big screens*/\r\n                        .image-credit-wrapper {\r\n                            height: 350px;\r\n                        }\r\n                    }\r\n\r\n                    </style>\r\n     </textarea\r\n      >\r\n    </div>\r\n  </div> ")
  ], 2112 /* STABLE_FRAGMENT, DEV_ROOT_FRAGMENT */))
}
}

};

script.__file = "src/components/articles/preview.vue";

module.exports = script;
//# sourceMappingURL=preview.cjs.map

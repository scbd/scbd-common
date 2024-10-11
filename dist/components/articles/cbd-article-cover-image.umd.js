(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsArticlesCbdArticleCoverImage = factory(global.vue));
})(this, function (vue) {
  'use strict';

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
  const _hoisted_1 = {
    key: 0,
    class: "image-credit-wrapper"
  };
  const _hoisted_2 = {
    key: 1,
    class: "image-credit"
  };
  var script = {
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
        return __props.coverImage.url ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [__props.coverImage.url_1200 || __props.coverImage.url ? (vue.openBlock(), vue.createElementBlock("div", {
          key: 0,
          class: vue.normalizeClass('img cover-image cover-image-position-' + (__props.coverImage.position || 'center') + ' cover-image-size-' + (__props.coverImage.size || 'cover')),
          style: vue.normalizeStyle('background-image: url(' + cssEscapeUrl(__props.coverImage.url_1200 || __props.coverImage.url) + ');')
        }, null, 6 /* CLASS, STYLE */)) : vue.createCommentVNode("v-if", true), __props.coverImage.credits ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, vue.toDisplayString(__props.coverImage.credits), 1 /* TEXT */)) : vue.createCommentVNode("v-if", true), vue.renderSlot(_ctx.$slots, "default")])) : vue.createCommentVNode("v-if", true);
      };
    }
  };
  script.__scopeId = "data-v-4581e3c4";
  script.__file = "src/components/articles/cbd-article-cover-image.vue";
  return script;
});
//# sourceMappingURL=cbd-article-cover-image.umd.js.map

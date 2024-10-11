'use strict';

var vue = require('vue');

var script = {
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

const _hoisted_1 = ["href", "target"];
const _hoisted_2 = { key: 0 };
const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("i", { class: "fa fa-plus" }, null, -1 /* HOISTED */);
const _hoisted_4 = { key: 1 };
const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("i", { class: "fa fa-edit" }, null, -1 /* HOISTED */);

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (vue.openBlock(), vue.createElementBlock("a", {
    href: $options.newArticleUrl,
    target: $props.target
  }, [
    vue.renderSlot(_ctx.$slots, "default", {}, () => [
      (!$props.id)
        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_2, [
            _hoisted_3,
            vue.createTextVNode(" Add Content")
          ]))
        : vue.createCommentVNode("v-if", true),
      ($props.id)
        ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_4, [
            _hoisted_5,
            vue.createTextVNode(" Edit Content")
          ]))
        : vue.createCommentVNode("v-if", true)
    ])
  ], 8 /* PROPS */, _hoisted_1))
}

script.render = render;
script.__file = "src/components/articles/cbd-add-new-article.vue";

module.exports = script;
//# sourceMappingURL=cbd-add-new-article.cjs.map

import { mergeModels, useModel, computed, openBlock, createElementBlock, unref, createElementVNode, Fragment, renderList, toDisplayString, createCommentVNode } from 'vue';

const languages = {
    "ar" : "العربية",
    "zh" : "中文",
    "en" : "English",
    "es" : "Español",
    "fr" : "Français",
    "ru" : "Русский"
};

const _hoisted_1 = { class: "scbd-common km-view-links" };
const _hoisted_2 = {
  key: 0,
  class: "table table-striped"
};
const _hoisted_3 = { class: "align-middle" };
const _hoisted_4 = { class: "align-middle" };
const _hoisted_5 = ["href"];
const _hoisted_6 = { class: "align-middle" };
const _hoisted_7 = { key: 0 };
const _hoisted_8 = { class: "text-nowrap text-right align-middle" };
const _hoisted_9 = ["onClick"];
const _hoisted_10 = /*#__PURE__*/createElementVNode("i", { class: "bi bi-pencil-square" }, null, -1 /* HOISTED */);
const _hoisted_11 = [
  _hoisted_10
];
const _hoisted_12 = ["onClick"];
const _hoisted_13 = /*#__PURE__*/createElementVNode("i", { class: "bi bi-trash3" }, null, -1 /* HOISTED */);
const _hoisted_14 = [
  _hoisted_13
];

  
var script = {
  __name: 'km-view-links',
  props: {
    "modelValue": {type:Array, required:true},
    "modelModifiers": {},
  },
  emits: /*#__PURE__*/mergeModels(['onDelete','onEdit'], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {

  const model = useModel(__props, "modelValue");
  const emit = __emit;
   
    let links = computed(()=>{
        if(model.value)
            return  model.value;
        return [];
    });   
 
    const remove = (index) =>{    
        emit("onDelete", index);        
    };

    const edit = (index) =>{    
        emit("onEdit", index);        
    };

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    (unref(links)?.length)
      ? (openBlock(), createElementBlock("table", _hoisted_2, [
          createElementVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(links), (item, index) => {
              return (openBlock(), createElementBlock("tr", { key: index }, [
                createElementVNode("td", _hoisted_3, [
                  createElementVNode("span", null, toDisplayString(unref(languages)[item.language]), 1 /* TEXT */)
                ]),
                createElementVNode("td", _hoisted_4, [
                  createElementVNode("a", {
                    href: item.url
                  }, toDisplayString(item.name), 9 /* TEXT, PROPS */, _hoisted_5)
                ]),
                createElementVNode("td", _hoisted_6, [
                  (item.tag)
                    ? (openBlock(), createElementBlock("span", _hoisted_7, " (" + toDisplayString(item.tag) + ") ", 1 /* TEXT */))
                    : createCommentVNode("v-if", true)
                ]),
                createElementVNode("td", _hoisted_8, [
                  createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (edit(index))
                  }, [..._hoisted_11], 8 /* PROPS */, _hoisted_9),
                  createElementVNode("button", {
                    class: "btn btn-outline-secondary",
                    onClick: $event => (remove(index))
                  }, [..._hoisted_14], 8 /* PROPS */, _hoisted_12)
                ])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]))
      : createCommentVNode("v-if", true)
  ]))
}
}

};

script.__file = "src/components/controls/link/km-view-links.vue";

export { script as default };
//# sourceMappingURL=km-view-links.js.map

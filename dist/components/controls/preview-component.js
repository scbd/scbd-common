import { openBlock, createElementBlock, createElementVNode, toDisplayString, renderSlot } from 'vue';

const _hoisted_1 = { class: "row" };
const _hoisted_2 = { class: "col-12" };
const _hoisted_3 = { class: "card" };
const _hoisted_4 = { class: "card-header" };
const _hoisted_5 = { class: "card-body" };
const _hoisted_6 = { class: "row" };
const _hoisted_7 = {
  class: "col-6",
  ref: "wrap"
};
const _hoisted_8 = { class: "col-6" };
const _hoisted_9 = { class: "callout callout-warning" };

function render(_ctx, _cache) {
  return (openBlock(), createElementBlock("div", _hoisted_1, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("div", _hoisted_3, [
        createElementVNode("div", _hoisted_4, toDisplayString(_ctx.$attrs["card-header"]), 1 /* TEXT */),
        createElementVNode("div", _hoisted_5, [
          createElementVNode("div", _hoisted_6, [
            createElementVNode("div", _hoisted_7, [
              renderSlot(_ctx.$slots, "left")
            ], 512 /* NEED_PATCH */),
            createElementVNode("div", _hoisted_8, [
              createElementVNode("div", _hoisted_9, [
                createElementVNode("code", null, [
                  renderSlot(_ctx.$slots, "right")
                ])
              ])
            ])
          ])
        ])
      ])
    ])
  ]))
}

const script = {};


script.render = render;
script.__file = "src/components/controls/preview-component.vue";

export { script as default };
//# sourceMappingURL=preview-component.js.map

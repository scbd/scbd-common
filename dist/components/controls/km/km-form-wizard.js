import { ref, computed, onBeforeMount, provide, openBlock, createElementBlock, createElementVNode, Fragment, renderList, withModifiers, normalizeClass, toDisplayString, renderSlot } from 'vue';

const _hoisted_1 = ["id"];
const _hoisted_2 = { class: "nav-header mb-2" };
const _hoisted_3 = { class: "nav nav-pills nav-fill" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = {
  class: "nav-link",
  href: "#"
};
const _hoisted_6 = { class: "tabStatus" };
const _hoisted_7 = { class: "tabLabel" };
const _hoisted_8 = { class: "nav-body" };
const _hoisted_9 = { class: "nav-footer mt-2" };
const _hoisted_10 = { class: "nav nav-pills nav-fill" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = {
  class: "nav-link",
  href: "#"
};
const _hoisted_13 = { class: "tabStatus" };
const _hoisted_14 = { class: "tabLabel" };


var script = {
  __name: 'km-form-wizard',
  emits: ["onTabChange"],
  setup(__props, { emit: __emit }) {

const tabs = ref([]);
const emits = __emit;

const selectTab = (index) => {
  switchTab(index);
};
const switchTab = (index) => {
  tabs.value.forEach((tab) => {
    tab.isActive = false;
  });
  tabs.value[index].isActive = true;
  emits("onTabChange", index);
};
computed(() => this.tabs.length);
computed(() => this.tabs.find((e) => e.isActive));

onBeforeMount(() => {
   provide("addFormWizardTabKey", (tab) => {
    tabs.value.push(tab);
  });
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: "sbcd-controls km-form-wizard"
  }, [
    createElementVNode("div", _hoisted_2, [
      createElementVNode("ul", _hoisted_3, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab, index) => {
          return (openBlock(), createElementBlock("li", {
            onClick: withModifiers($event => (selectTab(index)), ["prevent","stop"]),
            class: normalizeClass(["nav-item", { active: tab.isActive }]),
            key: `tab-${index}`
          }, [
            createElementVNode("a", _hoisted_5, [
              createElementVNode("span", _hoisted_6, toDisplayString(index + 1), 1 /* TEXT */),
              createElementVNode("span", _hoisted_7, toDisplayString(tab.title), 1 /* TEXT */)
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_4))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ]),
    createElementVNode("div", _hoisted_8, [
      createElementVNode("form", null, [
        renderSlot(_ctx.$slots, "default")
      ])
    ]),
    createElementVNode("div", _hoisted_9, [
      createElementVNode("ul", _hoisted_10, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(tabs.value, (tab, index) => {
          return (openBlock(), createElementBlock("li", {
            onClick: withModifiers($event => (selectTab(index)), ["prevent","stop"]),
            class: normalizeClass(["nav-item", { active: tab.isActive }]),
            key: `tab-${index}`
          }, [
            createElementVNode("a", _hoisted_12, [
              createElementVNode("span", _hoisted_13, toDisplayString(index + 1), 1 /* TEXT */),
              createElementVNode("span", _hoisted_14, toDisplayString(tab.title), 1 /* TEXT */)
            ])
          ], 10 /* CLASS, PROPS */, _hoisted_11))
        }), 128 /* KEYED_FRAGMENT */))
      ])
    ])
  ], 8 /* PROPS */, _hoisted_1))
}
}

};

script.__scopeId = "data-v-10e44f6d";
script.__file = "src/components/controls/km/km-form-wizard.vue";

export { script as default };
//# sourceMappingURL=km-form-wizard.js.map

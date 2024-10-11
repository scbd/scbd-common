(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsKmKmFormWizard = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = ["id"];
  const _hoisted_2 = {
    class: "nav-header mb-2"
  };
  const _hoisted_3 = {
    class: "nav nav-pills nav-fill"
  };
  const _hoisted_4 = ["onClick"];
  const _hoisted_5 = {
    class: "nav-link",
    href: "#"
  };
  const _hoisted_6 = {
    class: "tabStatus"
  };
  const _hoisted_7 = {
    class: "tabLabel"
  };
  const _hoisted_8 = {
    class: "nav-body"
  };
  const _hoisted_9 = {
    class: "nav-footer mt-2"
  };
  const _hoisted_10 = {
    class: "nav nav-pills nav-fill"
  };
  const _hoisted_11 = ["onClick"];
  const _hoisted_12 = {
    class: "nav-link",
    href: "#"
  };
  const _hoisted_13 = {
    class: "tabStatus"
  };
  const _hoisted_14 = {
    class: "tabLabel"
  };
  var script = {
    __name: 'km-form-wizard',
    emits: ["onTabChange"],
    setup(__props, _ref) {
      let {
        emit: __emit
      } = _ref;
      const tabs = vue.ref([]);
      const emits = __emit;
      const selectTab = index => {
        switchTab(index);
      };
      const switchTab = index => {
        tabs.value.forEach(tab => {
          tab.isActive = false;
        });
        tabs.value[index].isActive = true;
        emits("onTabChange", index);
      };
      vue.computed(() => this.tabs.length);
      vue.computed(() => this.tabs.find(e => e.isActive));
      vue.onBeforeMount(() => {
        vue.provide("addFormWizardTabKey", tab => {
          tabs.value.push(tab);
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.$attrs.id,
          class: "sbcd-controls km-form-wizard"
        }, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("ul", _hoisted_3, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabs.value, (tab, index) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            onClick: vue.withModifiers($event => selectTab(index), ["prevent", "stop"]),
            class: vue.normalizeClass(["nav-item", {
              active: tab.isActive
            }]),
            key: "tab-".concat(index)
          }, [vue.createElementVNode("a", _hoisted_5, [vue.createElementVNode("span", _hoisted_6, vue.toDisplayString(index + 1), 1 /* TEXT */), vue.createElementVNode("span", _hoisted_7, vue.toDisplayString(tab.title), 1 /* TEXT */)])], 10 /* CLASS, PROPS */, _hoisted_4);
        }), 128 /* KEYED_FRAGMENT */))])]), vue.createElementVNode("div", _hoisted_8, [vue.createElementVNode("form", null, [vue.renderSlot(_ctx.$slots, "default")])]), vue.createElementVNode("div", _hoisted_9, [vue.createElementVNode("ul", _hoisted_10, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(tabs.value, (tab, index) => {
          return vue.openBlock(), vue.createElementBlock("li", {
            onClick: vue.withModifiers($event => selectTab(index), ["prevent", "stop"]),
            class: vue.normalizeClass(["nav-item", {
              active: tab.isActive
            }]),
            key: "tab-".concat(index)
          }, [vue.createElementVNode("a", _hoisted_12, [vue.createElementVNode("span", _hoisted_13, vue.toDisplayString(index + 1), 1 /* TEXT */), vue.createElementVNode("span", _hoisted_14, vue.toDisplayString(tab.title), 1 /* TEXT */)])], 10 /* CLASS, PROPS */, _hoisted_11);
        }), 128 /* KEYED_FRAGMENT */))])])], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__scopeId = "data-v-10e44f6d";
  script.__file = "src/components/controls/km/km-form-wizard.vue";
  return script;
});
//# sourceMappingURL=km-form-wizard.umd.js.map

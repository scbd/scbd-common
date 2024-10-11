(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('lodash')) : typeof define === 'function' && define.amd ? define(['vue', 'lodash'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsControlsKmInputLstringMl = factory(global.vue, global._));
})(this, function (vue, _) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  const _hoisted_1$1 = {
    class: "scbd-controls km-input-lstring"
  };
  const _hoisted_2$1 = ["placeholder", "onUpdate:modelValue", "dir"];
  const _hoisted_3$1 = ["rows", "placeholder", "onUpdate:modelValue", "dir"];
  const _hoisted_4$1 = {
    class: "input-group-append"
  };
  const _hoisted_5$1 = ["title"];
  var script$1 = {
    __name: 'km-input-lstring',
    props: /*#__PURE__*/vue.mergeModels({
      locales: {
        type: Array,
        required: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      rows: {
        type: Number,
        required: false,
        default: 1
      },
      placeholder: {
        type: String,
        required: false
      }
    }, {
      "modelValue": {
        type: Object,
        required: true,
        default: {}
      },
      "modelModifiers": {}
    }),
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      const props = __props;
      const loadLanguages = () => {
        var _props$locales;
        (_props$locales = props.locales) === null || _props$locales === void 0 || _props$locales.forEach(e => {
          //TODO: call thesaurus service API
        });
      };
      const getTerm = term => {
        //TODO: call thesaurus service API
        return {
          title: term
        };
      };
      vue.watch(() => props.locales, (newVal, oldVal) => {
        const deleted = _.without(Object.keys(model.value), ...newVal);
        if (deleted !== null && deleted !== void 0 && deleted.length) {
          deleted.forEach(e => {
            model.value[e] = undefined;
          });
        }
        loadLanguages();
      }, {
        deep: true
      });
      vue.onMounted(() => {
        loadLanguages();
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [vue.renderSlot(_ctx.$slots, "default"), (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(__props.locales, locale => {
          return vue.openBlock(), vue.createElementBlock("div", {
            class: vue.normalizeClass(["input-group mb-1", "km-input-lstring-".concat(locale)]),
            key: locale
          }, [__props.rows == 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("input", {
            key: 0,
            type: "text",
            class: "form-control",
            placeholder: __props.placeholder,
            "aria-describedby": "lstring-text",
            "onUpdate:modelValue": $event => model.value[locale] = $event,
            dir: locale == 'ar' ? 'rtl' : 'ltr',
            onInput: _cache[0] || (_cache[0] = $event => _ctx.$emit('update:modelValue', model.value))
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2$1)), [[vue.vModelText, model.value[locale]]]) : vue.createCommentVNode("v-if", true), __props.rows > 1 ? vue.withDirectives((vue.openBlock(), vue.createElementBlock("textarea", {
            key: 1,
            rows: __props.rows,
            class: "form-control",
            placeholder: __props.placeholder,
            "aria-describedby": "lstring-textarea",
            "onUpdate:modelValue": $event => model.value[locale] = $event,
            dir: locale == 'ar' ? 'rtl' : 'ltr',
            onInput: _cache[1] || (_cache[1] = $event => _ctx.$emit('update:modelValue', model.value))
          }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3$1)), [[vue.vModelText, model.value[locale]]]) : vue.createCommentVNode("v-if", true), vue.createElementVNode("div", _hoisted_4$1, [vue.createElementVNode("button", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "basic-addon2",
            "data-bs-toggle": 'tooltip',
            "data-bs-placement": 'top',
            title: getTerm(locale).title
          }, vue.toDisplayString(locale.toUpperCase()), 9 /* TEXT, PROPS */, _hoisted_5$1)])], 2 /* CLASS */);
        }), 128 /* KEYED_FRAGMENT */))]);
      };
    }
  };
  script$1.__file = "src/components/controls/km-input-lstring.vue";
  const removeEmpty = obj => {
    return function remove(current) {
      ___default["default"].forOwn(current, function (value, key) {
        if (___default["default"].isUndefined(value) || ___default["default"].isNull(value) || ___default["default"].isNaN(value) || ___default["default"].isString(value) && ___default["default"].isEmpty(value) || ___default["default"].isObject(value) && ___default["default"].isEmpty(remove(value))) {
          delete current[key];
        }
      });
      if (___default["default"].isArray(current)) ___default["default"].pull(current, undefined);
      return current;
    }(___default["default"].cloneDeep(obj));
  };
  const _hoisted_1 = ["id"];
  const _hoisted_2 = {
    class: "row"
  };
  const _hoisted_3 = {
    class: "col-md-11"
  };
  const _hoisted_4 = {
    class: "col-md-1"
  };
  const _hoisted_5 = ["disabled", "onClick"];
  const _hoisted_6 = /*#__PURE__*/vue.createElementVNode("i", {
    class: "bi bi-trash"
  }, null, -1 /* HOISTED */);
  var script = {
    __name: 'km-input-lstring-ml',
    props: {
      locales: {
        type: Array,
        required: true,
        validator: value => {
          return value.every(locale => locale.length <= 3); // we use ISO-2 but need support for ISO-3
        }
      },
      modelValue: {
        type: Array,
        required: false,
        default: () => [{}]
      },
      disabled: {
        type: Boolean,
        required: false
      }
    },
    emits: ["update:modelValue"],
    setup(__props, _ref) {
      let {
        emit: __emit
      } = _ref;
      function t(str) {
        return str;
      }
      const props = __props;
      const emit = __emit;
      const binding = vue.ref([{
        value: {}
      }]);
      function addItem() {
        binding.value.push({
          value: {}
        });
      }
      function removeItem(item, index) {
        var _binding$value;
        (_binding$value = binding.value) === null || _binding$value === void 0 || _binding$value.splice(index, 1);
      }
      function emitChange(value) {
        var _binding$value2;
        const clean = removeEmpty(binding.value);
        emit("update:modelValue", clean === null || clean === void 0 ? void 0 : clean.map(e => e.value));
        if ((_binding$value2 = binding.value) !== null && _binding$value2 !== void 0 && _binding$value2.length) {
          if (!binding.value.some(e => _.isEmpty(e.value))) {
            addItem();
          }
        }
      }
      vue.onMounted(() => {
        if (props.modelValue) {
          binding.value = props.modelValue.map(e => {
            return {
              value: e
            };
          });
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.$attrs.id,
          class: vue.normalizeClass(["scbd-controls km-input-lstring-ml", _ctx.$attrs.class])
        }, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(binding.value, (item, index) => {
          return vue.openBlock(), vue.createElementBlock("div", {
            key: item
          }, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("div", _hoisted_3, [vue.createVNode(script$1, {
            modelValue: item.value,
            "onUpdate:modelValue": [$event => item.value = $event, emitChange],
            locales: props.locales
          }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "locales"])]), vue.createElementVNode("div", _hoisted_4, [vue.createElementVNode("button", {
            disabled: index == binding.value.length - 1,
            class: "btn btn-danger btn-sm",
            type: "button",
            onClick: $event => removeItem(item, index)
          }, [_hoisted_6, vue.createTextVNode(" " + vue.toDisplayString(t("remove")), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_5)])])]);
        }), 128 /* KEYED_FRAGMENT */))], 10 /* CLASS, PROPS */, _hoisted_1);
      };
    }
  };
  script.__file = "src/components/controls/km-input-lstring-ml.vue";
  return script;
});
//# sourceMappingURL=km-input-lstring-ml.umd.js.map

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('vue-multiselect'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring'), require('@/services/composables/countries')) : typeof define === 'function' && define.amd ? define(['vue', 'vue-multiselect', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring', '@/services/composables/countries'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsSelectorsKmGovernment = factory(global.vue, global.VueMultiselect, global._, null, null, global.countries));
})(this, function (vue, VueMultiselect, _, i18n, lstring, countries) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var VueMultiselect__default = /*#__PURE__*/_interopDefaultLegacy(VueMultiselect);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  function asArray(data) {
    return ___default["default"]([data]).flatten().compact().value();
  }
  const _hoisted_1$1 = {
    slot: "clear"
  };
  var script$1 = {
    __name: 'multi-selector',
    props: {
      modelValue: {
        type: [String, Array, Object],
        required: true,
        default: () => []
      },
      options: {
        type: Array,
        required: true
      },
      label: {
        type: String
      },
      trackBy: {
        type: String
      },
      placeholder: {
        type: String,
        default: 'Select option'
      },
      openDirection: {
        type: String,
        default: 'below'
      },
      groupValues: {
        type: String
      },
      groupLabel: {
        type: String
      },
      groupSelect: {
        type: Boolean,
        default: false
      },
      multiple: {
        type: Boolean,
        default: false
      },
      clearOnSelect: {
        type: Boolean,
        default: true
      },
      closeOnSelect: {
        type: Boolean,
        default: true
      },
      searchable: {
        type: Boolean,
        default: true
      },
      disabled: {
        type: Boolean,
        default: false
      },
      customLabel: {
        type: Function,
        default(option, label) {
          // if (isEmpty(option)) return ''
          return label ? option[label] : option;
        }
      },
      allowEmpty: {
        type: Boolean,
        default: true
      },
      valueKey: {
        type: String,
        required: true
      },
      customSelectedItem: {
        type: Function,
        default(item) {
          return item;
        }
      },
      isValid: {
        type: [Boolean, Function],
        default: null
      }
    },
    emits: ['update:model-value', "on-select", "on-remove", "on-search-change", "on-open", "on-close", "on-add-tag", "on-value-change"],
    setup(__props, _ref) {
      var _this = this;
      let {
        emit: __emit
      } = _ref;
      const emit = __emit;
      const props = __props;
      const onEventTextChange = function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        _this.$emit('on-search-change', ...args);
      };
      let selectItems = vue.computed({
        get() {
          const selected = asArray(props.modelValue).map(value => {
            var _props$options;
            return (_props$options = props.options) === null || _props$options === void 0 ? void 0 : _props$options.find(option => {
              const customSelectedItem = props.customSelectedItem(option[props.valueKey], option);
              return _.isEqual(customSelectedItem, value);
            });
          });
          return _.compact(selected);
        },
        set(events) {
          let ids = asArray(events).map(event => props.customSelectedItem(event[props.valueKey], event));
          emit('update:model-value', props.multiple ? ids : ids[0]);
        }
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createBlock(vue.unref(VueMultiselect__default["default"]), {
          modelValue: vue.unref(selectItems),
          "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => vue.isRef(selectItems) ? selectItems.value = $event : selectItems = $event),
          label: __props.label,
          "track-by": __props.trackBy,
          placeholder: __props.placeholder,
          "open-direction": __props.openDirection,
          options: __props.options,
          "group-values": __props.groupValues,
          "group-label": __props.groupLabel,
          "group-select": __props.groupSelect,
          multiple: __props.multiple,
          "clear-on-select": __props.clearOnSelect,
          "close-on-select": __props.closeOnSelect,
          searchable: __props.searchable,
          disabled: __props.disabled,
          onSearchChange: onEventTextChange,
          "custom-label": __props.customLabel,
          "allow-empty": __props.allowEmpty,
          "deselect-label": "Can't remove this value"
        }, {
          default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "clear", {}, () => [vue.createElementVNode("template", _hoisted_1$1, [vue.unref(selectItems).length && !__props.disabled ? (vue.openBlock(), vue.createElementBlock("div", {
            key: 0,
            class: "multiselect__clear",
            onMousedown: _cache[0] || (_cache[0] = vue.withModifiers($event => {
              vue.isRef(selectItems) ? selectItems.value = null : selectItems = null;
              _ctx.$emit('change', null);
            }, ["prevent", "stop"]))
          }, null, 32 /* NEED_HYDRATION */)) : vue.createCommentVNode("v-if", true)])])]),
          _: 3 /* FORWARDED */
        }, 8 /* PROPS */, ["modelValue", "label", "track-by", "placeholder", "open-direction", "options", "group-values", "group-label", "group-select", "multiple", "clear-on-select", "close-on-select", "searchable", "disabled", "custom-label", "allow-empty"]);
      };
    }
  };
  script$1.__file = "src/components/controls/multi-selector.vue";
  const useI18n = () => {
    return {
      t: key => key,
      locale: 'en'
    };
  };
  const _hoisted_1 = {
    class: "scbd-common km-government"
  };
  var script = {
    __name: 'km-government',
    props: {
      "modelValue": {
        type: Array,
        required: true,
        default: {
          identifier: undefined
        }
      },
      "modelModifiers": {}
    },
    emits: ["update:modelValue"],
    setup(__props) {
      const model = vue.useModel(__props, "modelValue");
      const countries$1 = countries.useCountries();
      const {
        t,
        locale
      } = useI18n();
      const countryList = vue.computed(() => {
        return (countries$1 || []).map(e => {
          var _e$code;
          return {
            name: e.name[locale],
            code: (_e$code = e.code) === null || _e$code === void 0 ? void 0 : _e$code.toLowerCase()
          };
        });
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [vue.createVNode(script$1, {
          modelValue: model.value.identifier,
          "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => model.value.identifier = $event),
          class: "validationClass",
          label: "name",
          "track-by": "code",
          "value-key": "code",
          placeholder: _ctx.$attrs.placeholder || vue.unref(t)('government'),
          options: countryList.value,
          disabled: !countryList.value || _ctx.$attrs.disabled
        }, null, 8 /* PROPS */, ["modelValue", "placeholder", "options", "disabled"])]);
      };
    }
  };
  script.__file = "src/components/selectors/km-government.vue";
  return script;
});
//# sourceMappingURL=km-government.umd.js.map

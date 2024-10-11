(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue'), require('vue-multiselect'), require('lodash'), require('@/services/composables/i18n'), require('@/services/filters/lstring'), require('@/services/composables/countries'), require('webui-popover'), require('webui-popover/dist/jquery.webui-popover.css'), require('jquery'), require('@/services/composables/thesaurus')) : typeof define === 'function' && define.amd ? define(['vue', 'vue-multiselect', 'lodash', '@/services/composables/i18n', '@/services/filters/lstring', '@/services/composables/countries', 'webui-popover', 'webui-popover/dist/jquery.webui-popover.css', 'jquery', '@/services/composables/thesaurus'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsSelectorsPreview = factory(global.vue, global.VueMultiselect, global._, global.i18n, global.lstring, global.countries, null, null, global.$, global.thesaurus));
})(this, function (vue, VueMultiselect, _, i18n, lstring, countries, webuiPopover, jquery_webuiPopover_css, $, thesaurus) {
  'use strict';

  function _interopDefaultLegacy(e) {
    return e && typeof e === 'object' && 'default' in e ? e : {
      'default': e
    };
  }
  var VueMultiselect__default = /*#__PURE__*/_interopDefaultLegacy(VueMultiselect);
  var ___default = /*#__PURE__*/_interopDefaultLegacy(_);
  var $__default = /*#__PURE__*/_interopDefaultLegacy($);
  const _hoisted_1$6 = {
    class: "row"
  };
  const _hoisted_2$3 = {
    class: "col-12"
  };
  const _hoisted_3$2 = {
    class: "card"
  };
  const _hoisted_4$1 = {
    class: "card-header"
  };
  const _hoisted_5$1 = {
    class: "card-body"
  };
  const _hoisted_6 = {
    class: "row"
  };
  const _hoisted_7 = {
    class: "col-6",
    ref: "wrap"
  };
  const _hoisted_8 = {
    class: "col-6"
  };
  const _hoisted_9 = {
    class: "callout callout-warning"
  };
  function render(_ctx, _cache) {
    return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$6, [vue.createElementVNode("div", _hoisted_2$3, [vue.createElementVNode("div", _hoisted_3$2, [vue.createElementVNode("div", _hoisted_4$1, vue.toDisplayString(_ctx.$attrs["card-header"]), 1 /* TEXT */), vue.createElementVNode("div", _hoisted_5$1, [vue.createElementVNode("div", _hoisted_6, [vue.createElementVNode("div", _hoisted_7, [vue.renderSlot(_ctx.$slots, "left")], 512 /* NEED_PATCH */), vue.createElementVNode("div", _hoisted_8, [vue.createElementVNode("div", _hoisted_9, [vue.createElementVNode("code", null, [vue.renderSlot(_ctx.$slots, "right")])])])])])])])]);
  }
  const script$6 = {};
  script$6.render = render;
  script$6.__file = "src/components/controls/preview-component.vue";
  function asArray(data) {
    return ___default["default"]([data]).flatten().compact().value();
  }
  function sortBy(list, property) {
    //const { locale } = useNuxtApp().$i18n;
    const {
      t,
      locale
    } = i18n.useI18n();
    return list.sort((a, b) => {
      let valueA = a[property];
      let valueB = b[property];
      if (isLString(valueA)) {
        valueA = lstring.lstring(valueA, locale.value);
        valueB = lstring.lstring(valueB, locale.value);
      }
      return valueA.localeCompare(valueB);
    });
  }
  const _hoisted_1$5 = {
    slot: "clear"
  };
  var script$5 = {
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
          default: vue.withCtx(() => [vue.renderSlot(_ctx.$slots, "clear", {}, () => [vue.createElementVNode("template", _hoisted_1$5, [vue.unref(selectItems).length && !__props.disabled ? (vue.openBlock(), vue.createElementBlock("div", {
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
  script$5.__file = "src/components/controls/multi-selector.vue";
  const useI18n = () => {
    return {
      t: key => key,
      locale: 'en'
    };
  };
  const _hoisted_1$4 = {
    class: "scbd-common km-government"
  };
  var script$4 = {
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
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$4, [vue.createVNode(script$5, {
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
  script$4.__file = "src/components/selectors/km-government.vue";
  const _hoisted_1$3 = {
    key: 0,
    class: "bi bi-question-circle-fill"
  };
  const _hoisted_2$2 = {
    class: "webui-popover-content"
  };
  const _hoisted_3$1 = ["innerHTML"];
  var script$3 = {
    __name: 'km-help',
    props: {
      title: {
        type: String
      },
      content: {
        type: String,
        required: true
      }
    },
    setup(__props) {
      const helpAnchor = vue.ref(null);
      const props = __props;
      const slots = vue.useSlots();
      vue.onMounted(() => {
        const settings = {
          trigger: 'hover',
          title: props.title || "Help",
          closeable: true,
          dismissible: true,
          padding: true,
          backdrop: false,
          style: 'inverse',
          delay: {
            show: null,
            hide: 200
          }
        };
        $__default["default"](helpAnchor.value).webuiPopover('destroy').webuiPopover(settings);
      });
      vue.onBeforeUnmount(() => {
        $__default["default"](helpAnchor.value).webuiPopover('destroy');
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock(vue.Fragment, null, [vue.createElementVNode("span", {
          ref_key: "helpAnchor",
          ref: helpAnchor,
          class: "show-pop",
          "data-animation": "pop"
        }, [vue.renderSlot(_ctx.$slots, "default"), vue.renderSlot(_ctx.$slots, "icon", {}, () => [vue.createTextVNode(vue.toDisplayString(" ")), !vue.unref(slots).icon && !vue.unref(slots).default ? (vue.openBlock(), vue.createElementBlock("i", _hoisted_1$3)) : vue.createCommentVNode("v-if", true)])], 512 /* NEED_PATCH */), vue.createElementVNode("div", _hoisted_2$2, [vue.renderSlot(_ctx.$slots, "content", {}, () => [vue.createElementVNode("div", {
          innerHTML: __props.content
        }, null, 8 /* PROPS */, _hoisted_3$1)])])], 64 /* STABLE_FRAGMENT */);
      };
    }
  };
  script$3.__file = "src/components/controls/view/km-help.vue";
  const _hoisted_1$2 = ["id"];
  const _hoisted_2$1 = ["for", "name", "required"];
  var script$2 = {
    __name: 'km-form-group',
    props: {
      name: {
        type: String,
        default: ""
      },
      caption: {
        type: String,
        required: true
      },
      required: {
        type: Boolean,
        default: false
      },
      isValid: {
        type: Function
      },
      helpContent: {
        type: String,
        required: true
      },
      helpTitle: {
        type: String
      }
    },
    setup(__props) {
      const props = __props;
      let reviewError = vue.inject('validationReview');
      const hasError = () => {
        return props.name && props.required && (reviewError === null || reviewError === void 0 ? void 0 : reviewError.isValid(props.name));
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", {
          id: _ctx.$attrs.id,
          class: vue.normalizeClass(["scbd-controls km-form-group form-group mb-3", {
            'has-error': hasError(),
            'has-help': __props.helpContent,
            'mandatory': __props.required
          }])
        }, [__props.caption ? (vue.openBlock(), vue.createElementBlock("label", {
          key: 0,
          class: "mb-1 km-form-group-label",
          for: __props.name,
          name: __props.name,
          required: __props.required ? true : null
        }, vue.toDisplayString(__props.caption), 9 /* TEXT, PROPS */, _hoisted_2$1)) : vue.createCommentVNode("v-if", true), __props.helpContent ? (vue.openBlock(), vue.createBlock(script$3, {
          key: 1,
          title: __props.helpTitle,
          content: __props.helpContent,
          class: "ms-1 me-1"
        }, null, 8 /* PROPS */, ["title", "content"])) : vue.createCommentVNode("v-if", true), vue.createElementVNode("div", null, [vue.renderSlot(_ctx.$slots, "default")])], 10 /* CLASS, PROPS */, _hoisted_1$2);
      };
    }
  };
  script$2.__scopeId = "data-v-2d33fbf8";
  script$2.__file = "src/components/controls/km-form-group.vue";
  const THESAURUS = {
    OTHER_LANGUAGES: 'ISO639-2'
  };
  const languages = {
    "ar": "العربية",
    "zh": "中文",
    "en": "English",
    "es": "Español",
    "fr": "Français",
    "ru": "Русский"
  };
  const _hoisted_1$1 = {
    class: "scbd-common km-language"
  };
  const _hoisted_2 = {
    class: "form-check"
  };
  const _hoisted_3 = /*#__PURE__*/vue.createElementVNode("label", {
    class: "form-check-label",
    for: "yes"
  }, "Yes", -1 /* HOISTED */);
  const _hoisted_4 = {
    class: "form-check"
  };
  const _hoisted_5 = /*#__PURE__*/vue.createElementVNode("label", {
    class: "form-check-label",
    for: "no"
  }, "No", -1 /* HOISTED */);

  //TODO:add i18m support 

  var script$1 = {
    __name: 'km-language',
    props: {
      "modelValue": {
        type: Array,
        required: true,
        default: []
      },
      "modelModifiers": {}
    },
    emits: /*#__PURE__*/vue.mergeModels(['update:modelValue'], ["update:modelValue"]),
    setup(__props, _ref2) {
      let {
        emit: __emit
      } = _ref2;
      vue.useModel(__props, "modelValue");
      const emit = __emit;
      const {
        t,
        locale
      } = useI18n();
      const otherLanguageOption = vue.ref(false);
      const thesaurusService = thesaurus.useThesaurus();
      const selectedLanguages = vue.ref([]);
      const otherSelectedLanguages = vue.ref([]);
      const formattedLanguages = vue.computed(() => Object.entries(languages).map(_ref3 => {
        let [code, title] = _ref3;
        return {
          code,
          title
        };
      }));
      const formattedOtherLanguages = vue.computed(() => {
        let otherLanguages = thesaurusService.getDomainTerms(THESAURUS.OTHER_LANGUAGES) || [];
        otherLanguages = otherLanguages.filter(e => !isUNLanguage(e.identifier.replace('lang-', ''))).map(e => {
          return {
            code: e.identifier.replace('lang-', ''),
            title: lstring.lstring(e.title)
          };
        });
        return sortBy(otherLanguages, 'title');
      });
      function onChange(code) {
        const languages = [...(selectedLanguages.value || []), ...(otherSelectedLanguages.value || [])];
        emit('update:modelValue', languages);
      }
      function isUNLanguage(code) {
        return formattedLanguages.value.find(un => un.code == code);
      }
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", _hoisted_1$1, [vue.createVNode(script$5, {
          modelValue: selectedLanguages.value,
          "onUpdate:modelValue": [_cache[0] || (_cache[0] = $event => selectedLanguages.value = $event), onChange],
          label: "title",
          "track-by": "code",
          "value-key": "code",
          options: formattedLanguages.value,
          multiple: true,
          "allow-empty": false,
          placeholder: vue.unref(t)('languageOfRecord')
        }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"]), vue.createVNode(script$2, {
          name: "otherLanguageOption",
          class: "mt-2",
          caption: "Would like to submit this information in any other language(s)?"
        }, {
          default: vue.withCtx(() => [vue.createElementVNode("div", _hoisted_2, [vue.withDirectives(vue.createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "yes",
            value: true,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => otherLanguageOption.value = $event)
          }, null, 512 /* NEED_PATCH */), [[vue.vModelRadio, otherLanguageOption.value]]), _hoisted_3]), vue.createElementVNode("div", _hoisted_4, [vue.withDirectives(vue.createElementVNode("input", {
            class: "form-check-input",
            type: "radio",
            id: "no",
            value: false,
            "onUpdate:modelValue": _cache[2] || (_cache[2] = $event => otherLanguageOption.value = $event)
          }, null, 512 /* NEED_PATCH */), [[vue.vModelRadio, otherLanguageOption.value]]), _hoisted_5])]),
          _: 1 /* STABLE */
        }), otherLanguageOption.value ? (vue.openBlock(), vue.createBlock(script$2, {
          key: 0,
          name: "otherLanguages",
          class: "mt-2",
          caption: vue.unref(t)('otherLanguage')
        }, {
          default: vue.withCtx(() => [vue.createVNode(script$5, {
            modelValue: otherSelectedLanguages.value,
            "onUpdate:modelValue": [_cache[3] || (_cache[3] = $event => otherSelectedLanguages.value = $event), onChange],
            label: "title",
            "track-by": "code",
            "value-key": "code",
            options: formattedOtherLanguages.value,
            multiple: true,
            "close-on-select": false,
            placeholder: vue.unref(t)('otherLanguageOfRecord')
          }, null, 8 /* PROPS */, ["modelValue", "options", "placeholder"])]),
          _: 1 /* STABLE */
        }, 8 /* PROPS */, ["caption"])) : vue.createCommentVNode("v-if", true)]);
      };
    }
  };
  script$1.__file = "src/components/selectors/km-language.vue";
  const _hoisted_1 = /*#__PURE__*/vue.createElementVNode("h3", null, "CBD selectors components", -1 /* HOISTED */);
  var script = {
    __name: 'preview',
    setup(__props) {
      const selectedItems = vue.ref({
        "identifier": "ag"
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [_hoisted_1, vue.createVNode(script$6, {
          "card-header": "Language selector"
        }, {
          left: vue.withCtx(() => [vue.createVNode(script$1, {
            modelValue: selectedItems.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => selectedItems.value = $event)
          }, null, 8 /* PROPS */, ["modelValue"]), vue.createTextVNode(" selected languages: " + vue.toDisplayString(selectedItems.value), 1 /* TEXT */)]),
          right: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString(" <km-language v-model=\"selectedItems/>  "))]),
          _: 1 /* STABLE */
        }), vue.createVNode(script$6, {
          "card-header": "Government selector"
        }, {
          left: vue.withCtx(() => [vue.createVNode(script$4, {
            modelValue: selectedItems.value,
            "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => selectedItems.value = $event)
          }, null, 8 /* PROPS */, ["modelValue"]), vue.createTextVNode(" selected government: " + vue.toDisplayString(selectedItems.value), 1 /* TEXT */)]),
          right: vue.withCtx(() => [vue.createTextVNode(vue.toDisplayString("<km-government v-model=\"selectedItems\"/>  "))]),
          _: 1 /* STABLE */
        })]);
      };
    }
  };
  script.__file = "src/components/selectors/preview.vue";
  return script;
});
//# sourceMappingURL=preview.umd.js.map

import { mergeModels, useModel, watch, onMounted, openBlock, createElementBlock, renderSlot, Fragment, renderList, normalizeClass, withDirectives, vModelText, createCommentVNode, createElementVNode, toDisplayString, ref, createVNode, createTextVNode } from 'vue';
import _, { without, isEmpty } from 'lodash';

const _hoisted_1$1 = { class: "scbd-controls km-input-lstring" };
const _hoisted_2$1 = ["placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_3$1 = ["rows", "placeholder", "onUpdate:modelValue", "dir"];
const _hoisted_4$1 = { class: "input-group-append" };
const _hoisted_5$1 = ["title"];

    
var script$1 = {
  __name: 'km-input-lstring',
  props: /*#__PURE__*/mergeModels({
      locales:  { type: Array, required: true },
      disabled: { type: Boolean, default: false },
      rows:     { type: Number, required: false, default: 1 },
      placeholder: {type: String, required: false }
    }, {
    "modelValue": {type:Object, required: true, default:{}},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const model = useModel(__props, "modelValue");
    const props = __props;

    const loadLanguages = () => {
      props.locales?.forEach((e) => {
        //TODO: call thesaurus service API
      });
    };

    const getTerm = (term) => {
      //TODO: call thesaurus service API
      return { title: term };
    };

    watch(()=>props.locales,
      (newVal, oldVal) => {
        const deleted = without(Object.keys(model.value), ...newVal);
        if (deleted?.length) {
          deleted.forEach((e) => {
            model.value[e] = undefined;
          });
        }
        loadLanguages();
      }, {deep:true}
    );

    onMounted(() => {
      loadLanguages();
    });

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", _hoisted_1$1, [
    renderSlot(_ctx.$slots, "default"),
    (openBlock(true), createElementBlock(Fragment, null, renderList(__props.locales, (locale) => {
      return (openBlock(), createElementBlock("div", {
        class: normalizeClass(["input-group mb-1", `km-input-lstring-${locale}`]),
        key: locale
      }, [
        (__props.rows==1)
          ? withDirectives((openBlock(), createElementBlock("input", {
              key: 0,
              type: "text",
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-text",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[0] || (_cache[0] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_2$1)), [
              [vModelText, model.value[locale]]
            ])
          : createCommentVNode("v-if", true),
        (__props.rows>1)
          ? withDirectives((openBlock(), createElementBlock("textarea", {
              key: 1,
              rows: __props.rows,
              class: "form-control",
              placeholder: __props.placeholder,
              "aria-describedby": "lstring-textarea",
              "onUpdate:modelValue": $event => ((model.value[locale]) = $event),
              dir: locale == 'ar' ? 'rtl' : 'ltr',
              onInput: _cache[1] || (_cache[1] = $event => (_ctx.$emit('update:modelValue', model.value)))
            }, null, 40 /* PROPS, NEED_HYDRATION */, _hoisted_3$1)), [
              [vModelText, model.value[locale]]
            ])
          : createCommentVNode("v-if", true),
        createElementVNode("div", _hoisted_4$1, [
          createElementVNode("button", {
            class: "btn btn-outline-primary",
            type: "button",
            id: "basic-addon2",
            "data-bs-toggle": 'tooltip',
            "data-bs-placement": 'top',
            title: getTerm(locale).title
          }, toDisplayString(locale.toUpperCase()), 9 /* TEXT, PROPS */, _hoisted_5$1)
        ])
      ], 2 /* CLASS */))
    }), 128 /* KEYED_FRAGMENT */))
  ]))
}
}

};

script$1.__file = "src/components/controls/km-input-lstring.vue";

const removeEmpty = (obj)=> {
    return function remove(current) {
      _.forOwn(current, function (value, key) {
        if (_.isUndefined(value) || _.isNull(value) || _.isNaN(value) ||
          (_.isString(value) && _.isEmpty(value)) ||
          (_.isObject(value) && _.isEmpty(remove(value)))) {
  
          delete current[key];
        }
      });

      if (_.isArray(current)) _.pull(current, undefined);
  
      return current;
  
    }(_.cloneDeep(obj));
};

const _hoisted_1 = ["id"];
const _hoisted_2 = { class: "row" };
const _hoisted_3 = { class: "col-md-11" };
const _hoisted_4 = { class: "col-md-1" };
const _hoisted_5 = ["disabled", "onClick"];
const _hoisted_6 = /*#__PURE__*/createElementVNode("i", { class: "bi bi-trash" }, null, -1 /* HOISTED */);


var script = {
  __name: 'km-input-lstring-ml',
  props: {
  locales: {
    type: Array,
    required: true,
    validator:(value) => {
      return value.every(locale => locale.length <= 3); // we use ISO-2 but need support for ISO-3
    }
  },
  modelValue: {
    type: Array,
    required: false,
    default: () => [{}],
  },
  disabled: {
    type: Boolean,
    required: false,
  },
},
  emits: ["update:modelValue"],
  setup(__props, { emit: __emit }) {

function t(str) {
  return str;
}
const props = __props;

const emit = __emit;
const binding = ref([{ value: {} }]);

function addItem() {
  binding.value.push({ value: {} });
}

function removeItem(item, index) {
  binding.value?.splice(index, 1);
}

function emitChange(value) {
  const clean = removeEmpty(binding.value);
 
  emit("update:modelValue", clean?.map((e) => e.value));

  if (binding.value?.length) {
    if (!binding.value.some((e) => isEmpty(e.value))) {
      addItem();
    }
  }
}

onMounted(() => {
  if (props.modelValue) {
    binding.value = props.modelValue.map((e) => {
      return { value: e };
    });
  }
});

return (_ctx, _cache) => {
  return (openBlock(), createElementBlock("div", {
    id: _ctx.$attrs.id,
    class: normalizeClass(["scbd-controls km-input-lstring-ml", _ctx.$attrs.class])
  }, [
    (openBlock(true), createElementBlock(Fragment, null, renderList(binding.value, (item, index) => {
      return (openBlock(), createElementBlock("div", { key: item }, [
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", _hoisted_3, [
            createVNode(script$1, {
              modelValue: item.value,
              "onUpdate:modelValue": [$event => ((item.value) = $event), emitChange],
              locales: props.locales
            }, null, 8 /* PROPS */, ["modelValue", "onUpdate:modelValue", "locales"])
          ]),
          createElementVNode("div", _hoisted_4, [
            createElementVNode("button", {
              disabled: index == binding.value.length-1,
              class: "btn btn-danger btn-sm",
              type: "button",
              onClick: $event => (removeItem(item, index))
            }, [
              _hoisted_6,
              createTextVNode(" " + toDisplayString(t("remove")), 1 /* TEXT */)
            ], 8 /* PROPS */, _hoisted_5)
          ])
        ])
      ]))
    }), 128 /* KEYED_FRAGMENT */))
  ], 10 /* CLASS, PROPS */, _hoisted_1))
}
}

};

script.__file = "src/components/controls/km-input-lstring-ml.vue";

export { script as default };
//# sourceMappingURL=km-input-lstring-ml.js.map

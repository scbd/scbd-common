import { computed, openBlock, createBlock, unref, isRef, withCtx, renderSlot, createElementVNode, createElementBlock, withModifiers, createCommentVNode } from 'vue';
import VueMultiselect from 'vue-multiselect';
import _, { isEqual, compact } from 'lodash';
import '@/services/composables/i18n';
import '@/services/filters/lstring';

function asArray(data) {
    return _([ data ])
      .flatten()
      .compact()
      .value();
}

const _hoisted_1 = { slot: "clear" };

var script = {
  __name: 'multi-selector',
  props: {   
    modelValue     : {type:[ String, Array, Object ], required:true, default:() => []},
    options      : { type: Array, required: true },
    label        : { type: String },
    trackBy      : { type: String },  
    placeholder  : { type: String,  default: 'Select option' },
    openDirection: { type: String, default: 'below' },
    groupValues  : { type: String },
    groupLabel   : { type: String },
    groupSelect  : { type: Boolean, default: false },
    multiple     : { type: Boolean, default: false },
    clearOnSelect: { type: Boolean, default: true },  
    closeOnSelect: { type: Boolean, default: true },
    searchable   : { type: Boolean, default: true },
    disabled     : { type: Boolean, default: false },
    customLabel  : { type: Function,
      default (option, label) {
        // if (isEmpty(option)) return ''
        return label ? option[label] : option
      }
    },
    allowEmpty   : { type: Boolean, default: true },
    valueKey     : { type: String, required: true},
    customSelectedItem  : {type: Function,default (item) {return item;}},
    isValid      : { type: [ Boolean, Function ],  default: null },   
},
  emits: ['update:model-value', "on-select","on-remove","on-search-change","on-open", "on-close", "on-add-tag","on-value-change"],
  setup(__props, { emit: __emit }) {
  
const emit = __emit;

const props = __props;

const onEventTextChange=(...args)=>{
  this.$emit('on-search-change', ...args);
};
let selectItems = computed({  
    get() {
      const selected = asArray(props.modelValue).map((value) => {
        return props.options?.find((option) => {
          const customSelectedItem =props.customSelectedItem(option[props.valueKey], option);
          
          return isEqual(customSelectedItem, value);
        })
      });

      return compact(selected)
    },
    set(events) {
      let ids = asArray(events).map((event) => props.customSelectedItem(event[props.valueKey], event));     
      emit('update:model-value', props.multiple ? ids : ids[0]);
    },
  }
); 

return (_ctx, _cache) => {
  return (openBlock(), createBlock(unref(VueMultiselect), {
    modelValue: unref(selectItems),
    "onUpdate:modelValue": _cache[1] || (_cache[1] = $event => (isRef(selectItems) ? (selectItems).value = $event : selectItems = $event)),
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
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "clear", {}, () => [
        createElementVNode("template", _hoisted_1, [
          (unref(selectItems).length && !__props.disabled)
            ? (openBlock(), createElementBlock("div", {
                key: 0,
                class: "multiselect__clear",
                onMousedown: _cache[0] || (_cache[0] = withModifiers($event => {isRef(selectItems) ? selectItems.value = null : selectItems = null; _ctx.$emit('change', null);}, ["prevent","stop"]))
              }, null, 32 /* NEED_HYDRATION */))
            : createCommentVNode("v-if", true)
        ])
      ])
    ]),
    _: 3 /* FORWARDED */
  }, 8 /* PROPS */, ["modelValue", "label", "track-by", "placeholder", "open-direction", "options", "group-values", "group-label", "group-select", "multiple", "clear-on-select", "close-on-select", "searchable", "disabled", "custom-label", "allow-empty"]))
}
}

};

script.__file = "src/components/controls/multi-selector.vue";

export { script as default };
//# sourceMappingURL=multi-selector.js.map

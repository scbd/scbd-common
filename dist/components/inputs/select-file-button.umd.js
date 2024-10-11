(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsInputsSelectFileButton = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _hoisted_1 = ["id"];
  var script = {
    __name: 'select-file-button',
    props: {
      multiple: {
        type: Boolean,
        require: false,
        default: false
      },
      accept: {
        type: Array,
        require: false,
        default: ['*/*']
      }
    },
    emits: ['onFileSelected'],
    setup(__props, _ref) {
      let {
        emit: __emit
      } = _ref;
      const emit = __emit;
      const props = __props;
      const selectFile = () => {
        var _props$accept, _props$accept2;
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.style.display = 'none';
        if (props.multiple) fileInput.setAttribute('multiple', props.multiple);
        if (props.accept && !((_props$accept = props.accept) !== null && _props$accept !== void 0 && _props$accept.includes('*/*'))) fileInput.setAttribute('accept', (_props$accept2 = props.accept) === null || _props$accept2 === void 0 ? void 0 : _props$accept2.join(', '));
        fileInput.addEventListener('click', $event => $event.stopPropagation());
        fileInput.addEventListener('change', _ref2 => {
          let {
            target
          } = _ref2;
          const files = [...target.files];
          if (props.multiple) emit('onFileSelected', files);else emit('onFileSelected', files[0]);
        });
        fileInput.click();
      };
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("button", {
          class: "scbd-common select-file-button btn btn-primary",
          type: "button",
          id: _ctx.$attrs.id,
          onClick: _cache[0] || (_cache[0] = vue.withModifiers($event => selectFile(), ["prevent", "stop"]))
        }, [vue.renderSlot(_ctx.$slots, "default")], 8 /* PROPS */, _hoisted_1);
      };
    }
  };
  script.__file = "src/components/inputs/select-file-button.vue";
  return script;
});
//# sourceMappingURL=select-file-button.umd.js.map

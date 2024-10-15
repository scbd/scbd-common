import { defineComponent as t, mergeModels as i, useModel as n, openBlock as m, createElementBlock as u, normalizeClass as a, withDirectives as c, createElementVNode as r, vModelRadio as p, renderSlot as f, createTextVNode as b, toDisplayString as v } from "vue";
const $ = ["id", "value", "required", "disabled"], h = ["for"], V = /* @__PURE__ */ t({
  __name: "radio",
  props: /* @__PURE__ */ i({
    label: {}
  }, {
    modelValue: { type: Boolean, required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(d) {
    const l = n(d, "modelValue");
    return (e, o) => (m(), u("div", {
      class: a(["scbd-common radio form-check", { "form-check-inline": e.$attrs.inline }])
    }, [
      c(r("input", {
        type: "radio",
        id: e.$attrs.id,
        "onUpdate:modelValue": o[0] || (o[0] = (s) => l.value = s),
        value: e.$attrs.value,
        required: e.$attrs.required,
        disabled: e.$attrs.disabled,
        class: a([e.$attrs.class, "form-check-input"])
      }, null, 10, $), [
        [p, l.value]
      ]),
      r("label", {
        for: e.$attrs.id,
        class: "form-check-label"
      }, [
        f(e.$slots, "label", {}, () => [
          b(v(e.label), 1)
        ])
      ], 8, h)
    ], 2));
  }
});
export {
  V as radio
};

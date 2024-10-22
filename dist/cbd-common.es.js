import { defineComponent as u, mergeModels as n, useModel as c, useAttrs as m, openBlock as p, createElementBlock as b, normalizeClass as s, unref as l, withDirectives as f, createElementVNode as i, vModelRadio as k, renderSlot as h, createTextVNode as v, toDisplayString as _, vModelCheckbox as V, vModelDynamic as q } from "vue";
const y = ["id", "value", "required", "disabled"], M = ["for"], B = /* @__PURE__ */ u({
  __name: "radio",
  props: /* @__PURE__ */ n({
    label: {}
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(d) {
    const o = c(d, "modelValue"), e = m();
    return (t, a) => (p(), b("div", {
      class: s(["scbd-common radio form-check", { "form-check-inline": l(e).inline }])
    }, [
      f(i("input", {
        type: "radio",
        id: l(e).id,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => o.value = r),
        value: l(e).value,
        required: l(e).required,
        disabled: l(e).disabled,
        class: s([l(e).class, "form-check-input"])
      }, null, 10, y), [
        [k, o.value]
      ]),
      i("label", {
        for: l(e).id,
        class: "form-check-label"
      }, [
        h(t.$slots, "label", {}, () => [
          v(_(t.label), 1)
        ])
      ], 8, M)
    ], 2));
  }
}), $ = ["id", "value", "required", "disabled"], x = ["for"], C = /* @__PURE__ */ u({
  __name: "checkbox",
  props: /* @__PURE__ */ n({
    label: {}
  }, {
    modelValue: { type: Boolean, required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(d) {
    const o = c(d, "modelValue"), e = m();
    return (t, a) => (p(), b("div", {
      class: s(["scbd-common checkbox form-check", { "form-check-inline": l(e).inline }])
    }, [
      f(i("input", {
        type: "checkbox",
        id: l(e).id,
        "onUpdate:modelValue": a[0] || (a[0] = (r) => o.value = r),
        value: l(e).value,
        required: l(e).required,
        disabled: l(e).disabled,
        class: s([l(e).class, "form-check-input"])
      }, null, 10, $), [
        [V, o.value]
      ]),
      i("label", {
        for: l(e).id,
        class: "form-check-label"
      }, [
        h(t.$slots, "label", {}, () => [
          v(_(t.label), 1)
        ])
      ], 8, x)
    ], 2));
  }
}), S = ["id", "required", "placeholder", "disabled", "type"], D = /* @__PURE__ */ u({
  __name: "dateSelector",
  props: /* @__PURE__ */ n({
    type: {
      type: String,
      default: "date",
      validator(d) {
        return ["date", "month"].includes(d);
      }
    }
  }, {
    modelValue: { required: !0 },
    modelModifiers: {}
  }),
  emits: ["update:modelValue"],
  setup(d) {
    const o = c(d, "modelValue"), e = m();
    return (t, a) => f((p(), b("input", {
      "onUpdate:modelValue": a[0] || (a[0] = (r) => o.value = r),
      class: s(l(e).class),
      id: l(e).id,
      required: l(e).required,
      placeholder: l(e).placeholder,
      disabled: l(e).disabled,
      type: d.type
    }, null, 10, S)), [
      [q, o.value]
    ]);
  }
});
export {
  C as checkbox,
  D as dateSelector,
  B as radio
};

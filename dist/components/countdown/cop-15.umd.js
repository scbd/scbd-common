(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsCountdownCop15 = factory(global.vue));
})(this, function (vue) {
  'use strict';

  var script = {
    name: 'CopCountDown',
    props: {
      endDate: Date,
      url: String
    },
    data() {
      return {
        currentDate: new Date()
      };
    },
    computed: {
      time: getNumberDays
    },
    mounted() {
      this.timer = setInterval(() => {
        this.currentDate = new Date();
      }, 1000 * 60);
    },
    unmounted() {
      clearInterval(this.timer);
    }
  };
  function getNumberDays() {
    const countDownDate = this.endDate.getTime();
    const now = this.currentDate.getTime();
    const distance = countDownDate - now;
    const days = Math.ceil(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
    const hours = Math.ceil(distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)).toString().padStart(2, "0");
    const minutes = Math.ceil(distance % (1000 * 60 * 60) / (1000 * 60)).toString().padStart(2, "0");
    const seconds = Math.ceil(distance % (1000 * 60) / 1000).toString().padStart(2, "0");
    return {
      days,
      hours,
      minutes,
      seconds
    };
  }
  const _withScopeId = n => (vue.pushScopeId("data-v-9dfd118a"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = {
    class: "countdown"
  };
  const _hoisted_2 = {
    class: "alignment"
  };
  const _hoisted_3 = ["href"];
  const _hoisted_4 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("img", {
    width: "35",
    height: "35",
    alt: "",
    src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAABYlAAAWJQFJUiTwAAAFGUlEQVRYhb2Xe6zXcxjHX10sd11NUbQubpUSNaWWWZI/slhKsYq5TorxF3MZudcWQ0JWUoshjdXacq+k5VKylaiU45QkRTldvPzxPGfn5/Q7ndt4tu8+3+/383yf5/157t8GKvWkzsBOYFt9BTWsrwDgYWAr0L++ghrXHwt3APuAj4DWQGmdJal1vdqqm9Tn8rlUfa8e8urspobAS0C7gnd/AO2By4Eu/6dlWqhd1I5qZ3WWQQ/lfh/1GPWE2shtUIds6gHcB3RMC/wFNAH2EEE8OC12CXApsPa/sEw7dZq6O63wjfqz+kk+t1NvzPsfch1VG8vUNJs6AdOBC4HdwCbgbGAlMA9YQWTUs8BC4HfgOKA38FpNDVMTMM2B1cCvqfw4oBERsF8B3YB7gGYp72igDXAA6FdTIECN3PRRmrw01zXqRnVPpnb/5GuoDlD3qmXqr+ogdYo6oiZuqo7h9gSwXV2rblU357sS9RS1awIzv+mrjjSybYy6Lfdurg+Yk9Rf1HXq6gzK5ep+K4rb5FS0N9e7Ksm4TN2Q34xRm6hH1gXM3amkVH0jQW1U9+Xpz00AO1LZwXwut1I/tYP6qfqg2kZdqs6rLZhm6Y6SFH4ggaxVf0z3TLGCdqhvqu+of+e7gSlrkBXu+y2tWysw41PgOvULo7aUGXWmUfLMTZ4SdbZRcYcVAFyrtk/es9S30tIvVwWmqtTuDewAWgEC64F1RD1pC1wPXJy864BbgRFEv/qAqEVHAd2BDUBJvj+QpaAPsLSy0mLtoC+wCPiBKPFtEsSDwANEiT+SaAMHU9k+4FyiHnVLOVcmbwnQALgKmA88TtSsQ6iYZc6kYuhaCMxMK+0HWuR9KVFlOwAn5rUC6JXfXQwMBVYRE2AZ8CNwLfA00cvKDtFcxHdjM/qPVadmwLXIvekF8fB3xsv6fPdo8nxuFMNTi8gerT5hFeldzDKv5LogzTyTmFNuIia5TcCutFTr5N0D/AyMB84HRiVfOV0GDAMeA47P7zZUVlzVcPVaAukJjAauBiYSbhkI/AlsJ3z/FjCXiKNS4AWih0E0WAgXjQIWAxcAXYspLQamBzCSCMhngNnARUSwNgaWAS2BAbnuB7bk/tvAlwn0NuB94LyUtQQ4OQ/2OpEo1YK5AVhDpO9m4M48SUfgVSKItwDHAFOIX5WFwKdE8B8ghq4OyfMkMCPBl1MTYHhlxcVipiUxq3yZVjkHOCL3ymfbdsAgIiPGEPHyYV4/5akXABMqgTis7mKW2ZNrL2AOkcJjgOeBWYQLzgK+JmJjFTG3PACcloBnEa6oivYD71aLDvgu187AcuAzIsPOACYTVbkpFSeHcF0ZEcw9gPsL5H0PjANOIaryfGAs4c5qwXxYcF9+ula5TgKGEC2iJ/AF4ftpRFt4MvfOy0OtBm7h0F/fpkRG/ouKuWlJXoX75TWhN/AiEZiDiYDtBOwFTidOfhsxej5FtITKQAYmmGWHaK6ig56TVfWNfO5lTHuFtNr4L2qtLlLvVXdV4vleXaAuNkbSplmdi46hhxuuhmfJvyg/PjoFjlM7GXPKwwVtYroxH1dHE6vSWd0MPFS9Qp1gzDPd831zY6REvU6dlPcD1Dnqx8lfSHvVKw+nrzow5VNf4bxbTlPVa9RvjaluvfpU8i5WHzH+HG7I/UZFZNcaTOF1vv92xU5jxt1tdPDF+X69MZrWSn5d/rUhOvMQogC2J4rdDKIFrCSmulrTP9oJh1H6YLaAAAAAAElFTkSuQmCC"
  }, null, -1 /* HOISTED */));
  const _hoisted_5 = [_hoisted_4];
  const _hoisted_6 = {
    class: "alignment"
  };
  const _hoisted_7 = ["href"];
  const _hoisted_8 = {
    key: 0
  };
  const _hoisted_9 = {
    class: "countdown-box"
  };
  const _hoisted_10 = {
    key: 0
  };
  const _hoisted_11 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("br", null, null, -1 /* HOISTED */));
  const _hoisted_12 = {
    key: 1
  };
  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("section", _hoisted_1, [vue.createElementVNode("div", _hoisted_2, [vue.createElementVNode("a", {
      href: $props.url
    }, [..._hoisted_5], 8 /* PROPS */, _hoisted_3)]), vue.createElementVNode("div", _hoisted_6, [vue.createElementVNode("a", {
      href: $props.url
    }, [$options.time.days >= 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_8, [(vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList($options.time.days, char => {
      return vue.openBlock(), vue.createElementBlock("span", null, [vue.createElementVNode("span", _hoisted_9, vue.toDisplayString(char), 1 /* TEXT */), vue.createTextVNode(" ")]);
    }), 256 /* UNKEYED_FRAGMENT */)), vue.createTextVNode("DAY"), $options.time.days > 1 ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_10, "S")) : vue.createCommentVNode("v-if", true), _hoisted_11, vue.createTextVNode("TO COP 15 ")])) : (vue.openBlock(), vue.createElementBlock("span", _hoisted_12, "COP 15"))], 8 /* PROPS */, _hoisted_7)])]);
  }
  script.render = render;
  script.__scopeId = "data-v-9dfd118a";
  script.__file = "src/components/countdown/cop-15.vue";
  return script;
});
//# sourceMappingURL=cop-15.umd.js.map

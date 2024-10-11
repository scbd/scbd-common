(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.ScbdCommonComponentsCbdNavHeader = factory(global.vue));
})(this, function (vue) {
  'use strict';

  const _withScopeId = n => (vue.pushScopeId("data-v-e030dd1e"), n = n(), vue.popScopeId(), n);
  const _hoisted_1 = {
    id: "header",
    class: "header",
    role: "banner",
    "aria-label": "Site header"
  };
  const _hoisted_2 = {
    "aria-hidden": "true",
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    "xmlns:xlink": "http://www.w3.org/1999/xlink",
    style: {
      "position": "absolute",
      "width": "0px",
      "height": "0px",
      "overflow": "hidden"
    }
  };
  const _hoisted_3 = /*#__PURE__*/vue.createStaticVNode("<defs data-v-e030dd1e><symbol id=\"icon-sign-out\" viewBox=\"0 0 25 28\" data-v-e030dd1e><title data-v-e030dd1e>Sign Out</title><path d=\"M10 22.5c0 0.438 0.203 1.5-0.5 1.5h-5c-2.484 0-4.5-2.016-4.5-4.5v-11c0-2.484 2.016-4.5 4.5-4.5h5c0.266 0 0.5 0.234 0.5 0.5 0 0.438 0.203 1.5-0.5 1.5h-5c-1.375 0-2.5 1.125-2.5 2.5v11c0 1.375 1.125 2.5 2.5 2.5h4.5c0.391 0 1-0.078 1 0.5zM24.5 14c0 0.266-0.109 0.516-0.297 0.703l-8.5 8.5c-0.187 0.187-0.438 0.297-0.703 0.297-0.547 0-1-0.453-1-1v-4.5h-7c-0.547 0-1-0.453-1-1v-6c0-0.547 0.453-1 1-1h7v-4.5c0-0.547 0.453-1 1-1 0.266 0 0.516 0.109 0.703 0.297l8.5 8.5c0.187 0.187 0.297 0.438 0.297 0.703z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-profile\" viewBox=\"0 0 20 28\" data-v-e030dd1e><title data-v-e030dd1e>Profile</title><path d=\"M20 21.859c0 2.281-1.5 4.141-3.328 4.141h-13.344c-1.828 0-3.328-1.859-3.328-4.141 0-4.109 1.016-8.859 5.109-8.859 1.266 1.234 2.984 2 4.891 2s3.625-0.766 4.891-2c4.094 0 5.109 4.75 5.109 8.859zM16 8c0 3.313-2.688 6-6 6s-6-2.688-6-6 2.688-6 6-6 6 2.688 6 6z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-password\" viewBox=\"0 0 18 28\" data-v-e030dd1e><title data-v-e030dd1e>Password</title><path d=\"M5 12h8v-3c0-2.203-1.797-4-4-4s-4 1.797-4 4v3zM18 13.5v9c0 0.828-0.672 1.5-1.5 1.5h-15c-0.828 0-1.5-0.672-1.5-1.5v-9c0-0.828 0.672-1.5 1.5-1.5h0.5v-3c0-3.844 3.156-7 7-7s7 3.156 7 7v3h0.5c0.828 0 1.5 0.672 1.5 1.5z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-lock\" viewBox=\"0 0 32 32\" data-v-e030dd1e><title data-v-e030dd1e>Lock</title><path d=\"M15 21.915v0c-0.583-0.206-1-0.762-1-1.415 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.653-0.417 1.209-1 1.415v2.594c0 0.263-0.224 0.491-0.5 0.491-0.268 0-0.5-0.22-0.5-0.491v-2.594zM8 14v0 0c-1.658 0.005-3 1.34-3 3.009v9.981c0 1.662 1.346 3.009 3.009 3.009h14.982c1.662 0 3.009-1.337 3.009-3.009v-9.981c0-1.659-1.341-3.005-3-3.009v-3.501c0-4.142-3.366-7.499-7.5-7.499-4.142 0-7.5 3.357-7.5 7.499v3.501zM11 14v-3.499c0-2.492 2.015-4.501 4.5-4.501 2.48 0 4.5 2.015 4.5 4.501v3.499h-9z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-search\" viewBox=\"0 0 250 270\" preserveAspectRatio=\"xMidYMid meet\" data-v-e030dd1e><title data-v-e030dd1e>Search</title><path d=\"M16 254 c-20 -20 -20 -22 5 -63 14 -24 19 -44 15 -63 -7 -37 15 -90 45 -112 13 -9 43 -16 67 -16 62 0 102 40 102 104 0 64 -40 109 -100 112 -31 1 -49 9 -67 28 -27 30 -45 33 -67 10z m164 -104 c36 -36 14 -100 -34 -100 -60 1 -81 79 -29 109 26 15 41 13 63 -9z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-menu\" viewBox=\"0 0 24 24\" data-v-e030dd1e><title data-v-e030dd1e>Menu</title><path d=\"M-1.77635684e-15,-8.8817842e-16 L29.461538,-8.8817842e-16 L29.461538,2 L-1.77635684e-15,2 L-1.77635684e-15,-8.8817842e-16 Z M4.91025633,10.6407675 L4.91025633,9.64076753 L29.461538,9.64076753 L29.461538,10.6407675 L4.91025633,10.6407675 Z M-1.77635684e-15,20.2777774 L-1.77635684e-15,18.2777774 L29.461538,18.2777774 L29.461538,20.2777774 L-1.77635684e-15,20.2777774 Z\" data-v-e030dd1e></path></symbol><symbol id=\"icon-close\" viewBox=\"0 0 30 30\" data-v-e030dd1e><title data-v-e030dd1e>Close</title><path d=\"M18.984 6.422l-5.578 5.578 5.578 5.578-1.406 1.406-5.578-5.578-5.578 5.578-1.406-1.406 5.578-5.578-5.578-5.578 1.406-1.406 5.578 5.578 5.578-5.578z\" data-v-e030dd1e></path></symbol><filter id=\"blur\" x=\"0\" y=\"0\" data-v-e030dd1e><feGaussianBlur in=\"SourceGraphic\" stdDeviation=\".5\" data-v-e030dd1e></feGaussianBlur></filter></defs>", 1);
  const _hoisted_4 = [_hoisted_3];
  const _hoisted_5 = {
    class: "navbar navbar-expand-lg navbar-light bg-white"
  };
  const _hoisted_6 = /*#__PURE__*/vue.createStaticVNode("<a class=\"navbar-brand\" href=\"https://www.cbd.int/\" title=\"Convention on Biological Diversity\" data-v-e030dd1e><img src=\"https://www.cbd.int/themes/custom/bootstrap_sass/images/CBD_logo_green.png\" alt=\"Convention on Biological Diversity\" data-v-e030dd1e></a><button class=\"navbar-toggler hamburger-icon collapsed\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\" data-v-e030dd1e><span class=\"line line-1\" data-v-e030dd1e></span><span class=\"line line-2\" data-v-e030dd1e></span><span class=\"line line-3\" data-v-e030dd1e></span></button>", 2);
  const _hoisted_8 = {
    class: "collapse navbar-collapse",
    id: "navbarSupportedContent"
  };
  const _hoisted_9 = {
    class: "navbar-wrapper"
  };
  const _hoisted_10 = {
    class: "nav-top"
  };
  const _hoisted_11 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("ul", {
    class: "navbar-nav mr-auto"
  }, [/*#__PURE__*/vue.createElementVNode("li", {
    class: "topmenu nav-item dropdown"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link dropdown-toggle",
    href: "",
    role: "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    title: "Information"
  }, " Information "), /*#__PURE__*/vue.createElementVNode("div", {
    class: "Information dropdown-menu"
  }, [/*#__PURE__*/vue.createElementVNode("div", {
    class: "dropdown-item-container"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/contact",
    title: "Contact us",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Contact us")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/terms",
    title: "Terms of Use",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Terms of Use")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/privacy",
    title: "Privacy Policy",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Privacy Policy")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/credits",
    title: "Credits",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Credits")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/copyright",
    title: "© CBD Secretariat",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "© CBD Secretariat")])])])]), /*#__PURE__*/vue.createElementVNode("li", {
    class: "topmenu nav-item dropdown"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link dropdown-toggle",
    href: "",
    role: "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    title: "About the Secretariat"
  }, " About the Secretariat "), /*#__PURE__*/vue.createElementVNode("div", {
    class: "About the Secretariat dropdown-menu"
  }, [/*#__PURE__*/vue.createElementVNode("div", {
    class: "dropdown-item-container"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/staff",
    title: "Staff",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Staff")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/secretariat/executive-secretary/",
    title: "Executive Secretary",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Executive Secretary")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/museum",
    title: "Museum of Nature and Culture",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Museum of Nature and Culture")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/secretariat/initiatives.shtml",
    title: "Initiatives",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Initiatives")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/secretariat/documents.shtml",
    title: "Secretariat Documents",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Secretariat Documents")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/employment",
    title: "Employment Opportunities",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Employment Opportunities")]), /*#__PURE__*/vue.createElementVNode("a", {
    href: "https://www.cbd.int/secretariat/business",
    title: "Doing Business with the CBD",
    class: "dropdown-item"
  }, [/*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Doing Business with the CBD")])])])])], -1 /* HOISTED */));
  const _hoisted_12 = {
    class: "navbar-nav"
  };
  const _hoisted_13 = {
    key: 0,
    class: "nav-item"
  };
  const _hoisted_14 = ["href"];
  const _hoisted_15 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", null, "Login ", -1 /* HOISTED */));
  const _hoisted_16 = {
    key: 0
  };
  const _hoisted_17 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("svg", {
    class: "icon icon-lock"
  }, [/*#__PURE__*/vue.createElementVNode("use", {
    "xlink:href": "#icon-lock"
  })], -1 /* HOISTED */));
  const _hoisted_18 = {
    key: 1,
    class: "topmenu nav-item dropdown"
  };
  const _hoisted_19 = {
    class: "nav-link dropdown-toggle",
    href: "",
    role: "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    title: "User"
  };
  const _hoisted_20 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("svg", {
    class: "icon icon-lock"
  }, [/*#__PURE__*/vue.createElementVNode("use", {
    "xlink:href": "#icon-lock"
  })], -1 /* HOISTED */));
  const _hoisted_21 = {
    class: "user-profile dropdown-menu"
  };
  const _hoisted_22 = {
    class: "dropdown-item-container"
  };
  const _hoisted_23 = ["href"];
  const _hoisted_24 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Profile", -1 /* HOISTED */));
  const _hoisted_25 = [_hoisted_24];
  const _hoisted_26 = ["href"];
  const _hoisted_27 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Password", -1 /* HOISTED */));
  const _hoisted_28 = [_hoisted_27];
  const _hoisted_29 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", {
    class: "dropdown-item-label"
  }, "Sign out", -1 /* HOISTED */));
  const _hoisted_30 = [_hoisted_29];
  const _hoisted_31 = {
    class: "navbar-nav"
  };
  const _hoisted_32 = {
    class: "topmenu nav-item dropdown"
  };
  const _hoisted_33 = {
    class: "nav-link dropdown-toggle",
    href: "",
    role: "button",
    "data-toggle": "dropdown",
    "aria-haspopup": "true",
    "aria-expanded": "false",
    title: "Language"
  };
  const _hoisted_34 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("span", {
    class: "flag-icon"
  }, null, -1 /* HOISTED */));
  const _hoisted_35 = {
    class: "Languages dropdown-menu"
  };
  const _hoisted_36 = {
    class: "dropdown-item-container"
  };
  const _hoisted_37 = ["href", "title"];
  const _hoisted_38 = {
    class: "dropdown-item-label"
  };
  const _hoisted_39 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("div", {
    id: "block-topsearchblock",
    class: "settings-tray-editable block block-cbd-utility block-top-search-block",
    "data-drupal-settingstray": "editable"
  }, [/*#__PURE__*/vue.createElementVNode("form", {
    class: "views-exposed-form",
    "data-drupal-selector": "views-exposed-form-search-search",
    action: "https://www.cbd.int/search",
    method: "get",
    id: "views-exposed-form-search-search",
    "accept-charset": "UTF-8"
  }, [/*#__PURE__*/vue.createElementVNode("div", {
    class: "form-row"
  }, [/*#__PURE__*/vue.createElementVNode("div", {
    "data-drupal-selector": "edit-actions",
    class: "form-actions",
    id: "edit-actions--2"
  }, [/*#__PURE__*/vue.createElementVNode("input", {
    "data-drupal-selector": "edit-submit-search",
    type: "submit",
    id: "edit-submit-search",
    value: "Submit",
    class: "button js-form-submit form-submit btn btn-primary form-control"
  })]), /*#__PURE__*/vue.createElementVNode("fieldset", {
    class: "js-form-item js-form-type-textfield form-type-textfield js-form-item-query form-item-query form-group"
  }, [/*#__PURE__*/vue.createElementVNode("label", {
    for: "edit-query"
  }, "Search"), /*#__PURE__*/vue.createElementVNode("input", {
    "data-drupal-selector": "edit-query",
    placeholder: "Search",
    type: "text",
    id: "edit-query",
    name: "query",
    value: "",
    size: "30",
    maxlength: "128",
    class: "form-text form-control"
  })])])])], -1 /* HOISTED */));
  const _hoisted_40 = /*#__PURE__*/_withScopeId(() => /*#__PURE__*/vue.createElementVNode("div", {
    class: "nav-main"
  }, [/*#__PURE__*/vue.createElementVNode("ul", {
    class: "navbar-nav main-nav"
  }, [/*#__PURE__*/vue.createElementVNode("li", {
    class: "nav-item main-menu-item"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link",
    href: "https://www.cbd.int/convention/",
    role: "button",
    title: "Biodiversity Convention"
  }, " BIODIVERSITY CONVENTION ")]), /*#__PURE__*/vue.createElementVNode("li", {
    class: "nav-item main-menu-item"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link",
    href: "http://bch.cbd.int/protocol",
    role: "button",
    title: "Cartagena Protocol"
  }, " CARTAGENA PROTOCOL ")]), /*#__PURE__*/vue.createElementVNode("li", {
    class: "nav-item main-menu-item"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link",
    href: "https://www.cbd.int/abs",
    role: "button",
    title: "Nagoya Protocol"
  }, " NAGOYA PROTOCOL ")]), /*#__PURE__*/vue.createElementVNode("li", {
    class: "nav-item main-menu-item"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link",
    href: "https://www.cbd.int/countries",
    role: "button",
    title: "Countries"
  }, " COUNTRIES ")]), /*#__PURE__*/vue.createElementVNode("li", {
    class: "nav-item main-menu-item"
  }, [/*#__PURE__*/vue.createElementVNode("a", {
    class: "nav-link",
    href: "https://www.cbd.int/programmes/",
    role: "button",
    title: "Programmes"
  }, " PROGRAMMES ")])])], -1 /* HOISTED */));
  const $accountsBaseUrl = ''; //ToDo assign the accountsBaseUrl

  var script = {
    __name: 'header',
    setup(__props) {
      const isAuthenticated = vue.ref(false);
      const user = vue.ref(undefined);
      const returnUrl = vue.ref(undefined);
      const languages = {
        ar: 'العربية',
        es: 'Español',
        en: 'English',
        fr: 'Français',
        ru: 'Русский',
        zg: '中文'
      };
      vue.computed(() => {
        var _user$value;
        if (((_user$value = user.value) === null || _user$value === void 0 ? void 0 : _user$value.userID) > 1) {
          return user.value.userName;
        }
      });
      const logout = async () => {
        await $auth.logout();
        window.location.reload();
      };
      vue.onMounted(async () => {
        returnUrl.value = window.location.href;
        setTimeout(async () => {
          const fetchedUser = await $auth.fetchUser();
          user.value = fetchedUser;
          isAuthenticated.value = fetchedUser.isAuthenticated;
        }, 1000);
      });
      return (_ctx, _cache) => {
        return vue.openBlock(), vue.createElementBlock("div", null, [vue.createElementVNode("header", _hoisted_1, [(vue.openBlock(), vue.createElementBlock("svg", _hoisted_2, [..._hoisted_4])), vue.createElementVNode("nav", _hoisted_5, [_hoisted_6, vue.createElementVNode("div", _hoisted_8, [vue.createElementVNode("div", _hoisted_9, [vue.createElementVNode("div", _hoisted_10, [_hoisted_11, vue.createElementVNode("ul", _hoisted_12, [!isAuthenticated.value ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_13, [vue.createElementVNode("a", {
          id: "accountsLink-SNE",
          href: $accountsBaseUrl + '/signin?returnUrl=' + returnUrl.value,
          class: "nav-link login di"
        }, [_hoisted_15, isAuthenticated.value ? (vue.openBlock(), vue.createElementBlock("span", _hoisted_16, " Welcome " + vue.toDisplayString(user.value.name), 1 /* TEXT */)) : vue.createCommentVNode("v-if", true), _hoisted_17], 8 /* PROPS */, _hoisted_14)])) : vue.createCommentVNode("v-if", true), isAuthenticated.value ? (vue.openBlock(), vue.createElementBlock("li", _hoisted_18, [vue.createElementVNode("a", _hoisted_19, [vue.createTextVNode(" Welcome " + vue.toDisplayString(user.value.name) + " ", 1 /* TEXT */), _hoisted_20]), vue.createElementVNode("div", _hoisted_21, [vue.createElementVNode("div", _hoisted_22, [vue.createElementVNode("a", {
          href: $accountsBaseUrl + '/profile',
          title: "Profile",
          class: "dropdown-item"
        }, [..._hoisted_25], 8 /* PROPS */, _hoisted_23), vue.createElementVNode("a", {
          href: $accountsBaseUrl + '/password',
          title: "Password",
          class: "dropdown-item"
        }, [..._hoisted_28], 8 /* PROPS */, _hoisted_26), vue.createElementVNode("a", {
          href: "",
          onClick: _cache[0] || (_cache[0] = $event => logout()),
          title: "Sign Out",
          class: "dropdown-item"
        }, [..._hoisted_30])])])])) : vue.createCommentVNode("v-if", true)]), vue.createElementVNode("ul", _hoisted_31, [vue.createElementVNode("li", _hoisted_32, [vue.createElementVNode("a", _hoisted_33, [vue.createTextVNode(vue.toDisplayString(languages[_ctx.$locale || 'en']) + " ", 1 /* TEXT */), _hoisted_34]), vue.createElementVNode("div", _hoisted_35, [vue.createElementVNode("div", _hoisted_36, [(vue.openBlock(), vue.createElementBlock(vue.Fragment, null, vue.renderList(languages, (lang, key) => {
          return vue.createElementVNode("a", {
            href: 'language-switch/' + key + '?returnUrl=' + returnUrl.value,
            title: lang,
            class: "dropdown-item"
          }, [vue.createElementVNode("span", _hoisted_38, vue.toDisplayString(lang), 1 /* TEXT */)], 8 /* PROPS */, _hoisted_37);
        }), 64 /* STABLE_FRAGMENT */))])])])]), _hoisted_39]), _hoisted_40])])])])]);
      };
    }
  };
  script.__scopeId = "data-v-e030dd1e";
  script.__file = "src/components/cbd-nav/header.vue";
  return script;
});
//# sourceMappingURL=header.umd.js.map

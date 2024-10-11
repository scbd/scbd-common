'use strict';

var vue = require('vue');
var luxon = require('luxon');

const defaultInjectKey = 'auth';

function useAuth (key = defaultInjectKey) {
    return vue.inject(key);
}
  
function useUser (key = defaultInjectKey) {
    const auth = useAuth(key);
  
    return vue.computed(() => {
      return auth.user();
    });
}

//https://moment.github.io/luxon/docs/manual/formatting#table-of-tokens

function format(dateTime, format='T') {
    return dateTime && asDateTime(dateTime).toFormat(format)
}

function asDateTime(date) {
    if(date instanceof luxon.DateTime)  return date
    if(date instanceof Date)      return luxon.DateTime.fromJSDate(date)
    if(typeof(date) === 'string') return luxon.DateTime.fromISO(date)

    throw Error('Unknown date/time format');
}

const _hoisted_1 = ["id", "required", "placeholder", "disabled", "rows", "cols"];
const _hoisted_2 = {
  key: 0,
  class: "table table-striped"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = /*#__PURE__*/vue.createElementVNode("i", { class: "fa fa-trash-o icon" }, null, -1 /* HOISTED */);
const _hoisted_5 = [
  _hoisted_4
];

    
var script = {
  __name: 'km-notes',
  props: /*#__PURE__*/vue.mergeModels({
        rows:{
            type:Number,
            default:4    
        }
    }, {
    "modelValue": {type:String, required:true},
    "modelModifiers": {},
  }),
  emits: ["update:modelValue"],
  setup(__props) {

    const model = vue.useModel(__props, "modelValue");
  
    // using for prevent edit history list
    let lastNote = '';
    const newNote = vue.ref("");
    
    // user info will be used for generate new note
    const user = useUser();
 
   // only get history lists
   let notes = vue.computed(()=>{
        if(model.value)
            return  (JSON.parse(model.value)).filter(e=>e!=lastNote);
        return [];
   }); 
   
    // delete history note
    const remove=(index)=>{   
        notes.value.splice(index, 1);
        save();  
    };

    // save whole note list (history notes list + new note)
    const save=()=>{  
        // prevent edit history notes list
        const lNotes = notes.value; 
        if(lNotes.at(-1) == lastNote)
             lNotes.pop();
   
        // generate new note
        const timestamp = format(new Date(), "FF");  
        var newLNote = newNote.value ? `[ ${user.value.name} | ${timestamp} ] - ${newNote.value.trim()}` : "";
        lastNote =newLNote; 
       
        // sending history notes + new note to parent page
        model.value = JSON.stringify([...lNotes, newLNote]);
    };

return (_ctx, _cache) => {
  return (vue.openBlock(), vue.createElementBlock("div", null, [
    vue.withDirectives(vue.createElementVNode("textarea", {
      class: vue.normalizeClass(["form-control", _ctx.$attrs.class]),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((newNote).value = $event)),
      id: _ctx.$attrs.id,
      required: _ctx.$attrs.required,
      placeholder: _ctx.$attrs.placeholder,
      disabled: _ctx.$attrs.disabled,
      rows: __props.rows,
      cols: _ctx.$attrs.cols,
      onChange: save
    }, "\r\n        ", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1), [
      [vue.vModelText, newNote.value]
    ]),
    (vue.unref(notes)?.length)
      ? (vue.openBlock(), vue.createElementBlock("table", _hoisted_2, [
          vue.createElementVNode("tbody", null, [
            (vue.openBlock(true), vue.createElementBlock(vue.Fragment, null, vue.renderList(vue.unref(notes), (item, index) => {
              return (vue.openBlock(), vue.createElementBlock("tr", { key: index }, [
                vue.createElementVNode("td", null, vue.toDisplayString(item), 1 /* TEXT */),
                vue.createElementVNode("td", null, [
                  vue.createElementVNode("span", {
                    class: "btn float-end",
                    onClick: $event => (remove(index))
                  }, [..._hoisted_5], 8 /* PROPS */, _hoisted_3)
                ])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]))
      : vue.createCommentVNode("v-if", true)
  ]))
}
}

};

script.__file = "src/components/controls/km-notes.vue";

module.exports = script;
//# sourceMappingURL=km-notes.cjs.map

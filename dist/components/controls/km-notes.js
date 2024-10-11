import { computed, inject, mergeModels, useModel, ref, openBlock, createElementBlock, withDirectives, createElementVNode, normalizeClass, vModelText, unref, Fragment, renderList, toDisplayString, createCommentVNode } from 'vue';
import { DateTime } from 'luxon';

const defaultInjectKey = 'auth';

function useAuth (key = defaultInjectKey) {
    return inject(key);
}
  
function useUser (key = defaultInjectKey) {
    const auth = useAuth(key);
  
    return computed(() => {
      return auth.user();
    });
}

//https://moment.github.io/luxon/docs/manual/formatting#table-of-tokens

function format(dateTime, format='T') {
    return dateTime && asDateTime(dateTime).toFormat(format)
}

function asDateTime(date) {
    if(date instanceof DateTime)  return date
    if(date instanceof Date)      return DateTime.fromJSDate(date)
    if(typeof(date) === 'string') return DateTime.fromISO(date)

    throw Error('Unknown date/time format');
}

const _hoisted_1 = ["id", "required", "placeholder", "disabled", "rows", "cols"];
const _hoisted_2 = {
  key: 0,
  class: "table table-striped"
};
const _hoisted_3 = ["onClick"];
const _hoisted_4 = /*#__PURE__*/createElementVNode("i", { class: "fa fa-trash-o icon" }, null, -1 /* HOISTED */);
const _hoisted_5 = [
  _hoisted_4
];

    
var script = {
  __name: 'km-notes',
  props: /*#__PURE__*/mergeModels({
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

    const model = useModel(__props, "modelValue");
  
    // using for prevent edit history list
    let lastNote = '';
    const newNote = ref("");
    
    // user info will be used for generate new note
    const user = useUser();
 
   // only get history lists
   let notes = computed(()=>{
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
  return (openBlock(), createElementBlock("div", null, [
    withDirectives(createElementVNode("textarea", {
      class: normalizeClass(["form-control", _ctx.$attrs.class]),
      "onUpdate:modelValue": _cache[0] || (_cache[0] = $event => ((newNote).value = $event)),
      id: _ctx.$attrs.id,
      required: _ctx.$attrs.required,
      placeholder: _ctx.$attrs.placeholder,
      disabled: _ctx.$attrs.disabled,
      rows: __props.rows,
      cols: _ctx.$attrs.cols,
      onChange: save
    }, "\r\n        ", 42 /* CLASS, PROPS, NEED_HYDRATION */, _hoisted_1), [
      [vModelText, newNote.value]
    ]),
    (unref(notes)?.length)
      ? (openBlock(), createElementBlock("table", _hoisted_2, [
          createElementVNode("tbody", null, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(notes), (item, index) => {
              return (openBlock(), createElementBlock("tr", { key: index }, [
                createElementVNode("td", null, toDisplayString(item), 1 /* TEXT */),
                createElementVNode("td", null, [
                  createElementVNode("span", {
                    class: "btn float-end",
                    onClick: $event => (remove(index))
                  }, [..._hoisted_5], 8 /* PROPS */, _hoisted_3)
                ])
              ]))
            }), 128 /* KEYED_FRAGMENT */))
          ])
        ]))
      : createCommentVNode("v-if", true)
  ]))
}
}

};

script.__file = "src/components/controls/km-notes.vue";

export { script as default };
//# sourceMappingURL=km-notes.js.map

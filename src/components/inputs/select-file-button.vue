<template>
  <button
    ref="self"
    class="btn"
    type="button"
    v-bind="$attrs"
    @click.prevent.stop="selectFile()"
  >
    <slot name="default" ></slot>
  </button>
</template>

<script>
//import {  CButton} from '@coreui/vue';
export default {
  name: 'SelectFileButton',
  // components: { CButton },
  props: {
    multiple: { type: Boolean, require: false, default: false },
    accept: { type: String, require: false, default: '*/*' }
  },
  emits: ['files'],
  methods: {
    selectFile
  }
};

function selectFile () {
  const { multiple, accept } = this;
  const thisElement = this.$refs.self;

  const fileInput = document.createElement('INPUT');

  fileInput.type = 'file';
  fileInput.style.display = 'none';

  if (multiple) fileInput.setAttribute('multiple', 'multiple');
  if (accept && accept !== '*/*') fileInput.setAttribute('accept', accept);

  fileInput.addEventListener('click', ($event) => $event.stopPropagation());
  fileInput.addEventListener('change', ({ target }) => {
    console.log(target);

    const files = [...target.files];
    this.$emit('files', files);
    alert("emit")
  });

  thisElement.appendChild(fileInput);
  fileInput.click();
}
</script>

<template>
    <div class="form-group km-form-group mb-3" :class="{'has-error':hasError, 'has-help':content, 'mandatory':required}">
        <label class="mb-1 control-label" v-if="caption" :for="name" :name="name" :required="required ? true : null">
            {{caption}}             
        </label>
        <km-help v-if="content" :title="title" :content="content" class="ms-1 me-1"></km-help>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { useAttrs, toRefs, ref } from 'vue'
import KmHelp  from './view/KmHelp.vue';   

const props = defineProps({
    name      : { type:String, default:"" },
    caption   : { type:String },
    required  : { type:Boolean, default:false },
    isValidFn : { type:Function },
});

const attrs     = useAttrs();
const title     = attrs['data-title']
const content   = attrs['data-content']

const hasError = ref(false)
</script>

<style scoped>
    .km-form-group.mandatory{
        border-left: 5px solid red;
        padding-left: 10px;
    }
    .km-form-group label.required:after, .km-form-group label[required]:after {
        color: #e32;
        content: ' * ';
    }
    .km-form-group.has-help label.control-label{
        display: unset;
    }
    font-awesome-icon{
        padding-right: 5px;
    }
</style>

<template>
    <KmFormGroup v-bind=$attrs :name="name" :caption="caption"
        :is-valid-fn="isValidFn">
        <slot></slot>
    </KmFormGroup>            
</template>
<script lang="ts" setup>
import {  makeUid}     from '../../services/util/index'   
import { default as KmFormGroup } from './km-form-group.vue';
//const attrs = useAttrs()

const props = defineProps({
    name      : {type:String, default:makeUid()},
    caption   : {type:String  },
    isValidFn : {type:Function},
})

</script>
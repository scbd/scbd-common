<template>
    <span ref="helpAnchor" class="show-pop" data-animation='pop'>
        <slot></slot>
        <slot name="icon">
            {{" "}}<i class="bi bi-question-circle-fill" v-if="!slots.icon && !slots.default"></i>
        </slot>
    </span>

    <div class="webui-popover-content">
        <slot name="content">
            {{ content }}
        </slot>
    </div>
</template>

<script setup>
import 'webui-popover';
import 'webui-popover/dist/jquery.webui-popover.css'
import $ from 'jquery'
import {ref, useSlots, onMounted, onBeforeUnmount, defineProps } from 'vue'

const helpAnchor = ref(null);
const props = defineProps({
    title: {type:String},
    content: {type:String, required: true}
})
const slots  = useSlots();

onMounted(()=>{    
    const settings = {
        trigger: 'hover',
        title: props.title || "Help",
        closeable: true,
        dismissible: true,
        padding: true,
        backdrop: false,
        style: 'inverse',
        delay: {
            show: null,
            hide: 200
        }
    };
    
    $ (helpAnchor.value)
        .webuiPopover('destroy')
        .webuiPopover(settings);
});

onBeforeUnmount(()=>{
    $(helpAnchor.value).webuiPopover('destroy')
})
</script>

<style lang="scss">
    .show-pop{
        color: unset;
        text-decoration-style: dotted;
        border-bottom: 3px solid rgb(93, 136, 221);
        text-decoration-color: rgb(93 136 221);    
        text-decoration-thickness: 3px;
    }
    .webui-popover-content {
        max-width: 800px;
        max-height: 500px;
    }
</style>
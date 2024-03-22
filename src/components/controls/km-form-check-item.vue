
<template>
    <!-- <span v-if="useSecurity().role.isAdministrator()">
        {{ attrs }}, {{ modelValue }}, {{ attrs.value }} {{ modelValue == attrs.value }}
    </span> -->
    <!-- <CFormCheck :inline="$attrs.inline" :type="$attrs.type" 
        :name="$attrs.name"  :for="$attrs.for" 
        :id="$attrs.id" :value="$attrs.value"  
        @click="onCheck" 
        :checked="modelValue == $attrs.value" 
        :label="label" v-model="props.modelValue"/>  -->
        <div class="form-check">
            <input class="form-check-input" 
                :type="type" 
                v-model="model"
                :value="value"
                :id="$attrs.id"
                :required="$attrs.required"
                :disabled="$attrs.disabled"
                :class="$attrs.class" 
                :checked="value"            
                @click="onCheck" 
                >
            <label :for="$attrs.id" class="form-check-label">
                <slot name="label">{{ label }}</slot>
            </label>
        </div>
               
       
</template>

<script  setup>
    //const attrs = useAttrs()
    //import checkbox from '../inputs/checkbox.vue';
    const emit = defineEmits(['update:modelValue',])

    const model = defineModel({
        type: Boolean,
        required: true,
    });
  
    const props = defineProps({
        //modelValue: {},
        label     : {type:String, required:true },
        type      : {type:String, required:true, default:"checkbox"}
    })
    const onCheck = ($evt)=>{     
        //TODO: convert true/false number to native types
        //let value = $evt.target.value;  
        let value = $evt.target.checked;  
        console.log(value)     
        if(['true', 'false'].includes(value)){
            value = value == 'true' ? true : false
        }        
        emit('update:modelValue', value)
        
    }
</script>
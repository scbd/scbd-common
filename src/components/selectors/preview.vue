
<template>
    <div>
        <h3>CBD selectors components</h3>
         <preview-component card-header="language selector">
            <template #left>
                <km-language v-model="selectedItems"/> 
                selected languages: {{ selectedItems }}        
            </template>          
            <template #right>
                <code>
                    {{ ` <km-language v-model="selectedItems/>  ` }}
                </code>
            </template>
        </preview-component> 
    </div>
</template>

<script setup>
    import previewComponent from '../controls/preview-component.vue';
    import kmLanguage from './km-language.vue'
    
    import { ref } from 'vue'
    const selectedItems = ref([]);
</script>

<style lang="scss" scoped>
</style>

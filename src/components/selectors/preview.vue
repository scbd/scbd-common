
<template>
    <div>
        <h3>CBD selectors components</h3>
        <preview-component card-header="Language selector">
            <template #left>
                <km-language v-model="selectedItems"/> 
                selected languages: {{ selectedItems }}        
            </template>          
            <template #right>
                {{ ` <km-language v-model="selectedItems/>  ` }}
            </template>
        </preview-component>

        <preview-component card-header="Government selector">
            <template #left>
                <km-government v-model="selectedItems"/>        
                selected government: {{ selectedItems }}        
            </template>          
            <template #right>
                {{ `<km-government v-model="selectedItems"/>  ` }}
            </template>
        </preview-component> 
    </div>
</template>

<script setup>
    import previewComponent from '../controls/preview-component.vue';
    import kmGovernment from './km-government.vue'
    import kmLanguage from './km-language.vue'
    
    import { ref } from 'vue'
    const selectedItems = ref({ "identifier": "ag" });
</script>

<style lang="scss" scoped>
</style>

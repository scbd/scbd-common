<template>
    <div>
        <h3>CBD selectors components</h3>


         <preview-component card-header="language selector">
            <template #left>
                <km-language></km-language>
            </template>

            <template #right>
                <code></code>
            </template>
        </preview-component> 

    </div>
</template>

<script setup>
    import previewComponent from '../controls/preview-component.vue';
    import kmLanguage from './km-language.vue'

</script>

<style lang="scss" scoped>

</style>
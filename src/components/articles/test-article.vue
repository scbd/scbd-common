<template>
    <div>
        <h>articleResult</h><br>
        {{ articleResult }}
    </div>
</template>

<script setup>
import ky from 'ky';
import { onMounted, ref } from 'vue';
import ArticlesApi from '../../services/api/articles';
const articlesApi = new ArticlesApi();
const articleResult = ref(null);

onMounted( async ()=>{

     articleResult.value = await articlesApi.getArticleById("619c556b4f1f30000140ef06");
    console.log("articleResult articleResult articles data", articleResult.value);
    })
</script>

<style lang="scss" scoped>

</style>
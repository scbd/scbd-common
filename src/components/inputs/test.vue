<template>
    <div>
        <h>sitePrefixUrl : </h>{{  sitePrefixUrl }}<br>

        <h>timeout : </h>{{  timeout }}<br>

        <h>token: </h>{{  token }}<br>

        <h>tokenType: </h>{{  tokenType }}<br>
    </div>
</template>

<script setup>
import { ref, inject } from 'vue';

const sitePrefixUrl = ref(null);
const timeout = ref(null);
const token = ref(null);
const tokenType = ref(null);
if(inject('sitePrefixUrl')){
    sitePrefixUrl.value = inject('sitePrefixUrl')
}
if(inject('timeout')){
    timeout.value = inject('timeout')
}
if(inject('token')){
    token.value = inject('token')
}
if(inject('tokenType')){
    tokenType.value = inject('tokenType')
}

</script>

<style scoped>

</style>
<template>
    <button @click="count++">Click count {{count}} </button>
</template>

<script>

export default {
    name:"ClickCount",
    data() { 
        return {
            count:0
        }
    }
}
</script>

<style scoped>

</style>

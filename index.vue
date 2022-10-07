<template>
    <div>
      <h1>Dev Applications</h1>
      <click-count  />
    </div>
  </template>
  
  <script>
    import ClickCount from './src/components/click-count/button.vue'
    export default {
      components: {
        ClickCount
      }
    }
  </script>
  
  <style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
  </style>
    
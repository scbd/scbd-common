<template>
    <div>
      <h1>Dev Applications</h1>
      <countdown :end-date="new Date('2022-10-20T14:00:00.000')"  />
    </div>
  </template>
  
  <script>
    import countdown from './src/components/cop-countdown/index.js'
    export default {
      components: {
        countdown
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
    
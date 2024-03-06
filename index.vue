<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900" media="all" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css,npm/@scbd/www-css@1.0.1/dist/style.min.css,npm/animate.css@3.5.2/animate.min.css">
  <link rel="stylesheet" href="https://www.cbd.int/app/template-phoenix-overrides.css">
  <link rel="stylesheet" href="https://www.cbd.int/app/css/bootstrap-migrate-3-to-4.css">
    <ScbdHeader></ScbdHeader>
      <div class="preview">
        <button
          v-for="(_, tab) in tabs"
          :key="tab"
          :class="['tab-button', { active: currentTab === tab }]"
          @click="currentTab = tab"
        >
          {{ tab }}
        </button>
        <component :is="tabs[currentTab]" class="tab"></component>
      </div>
    <ScbdFooter></ScbdFooter>
</template>

<script setup>
  import { ref, provide, defineAsyncComponent } from 'vue';
  import ScbdHeader from './src/components/cbd-nav/header.vue'
  import ScbdFooter from './src/components/cbd-nav/footer.vue'
  // Preview tabs
  const home = defineAsyncComponent(() =>
    import('./src/components/preview.vue')
  )
  const articles = defineAsyncComponent(() =>
    import('./src/components/articles/preview.vue')
  )
  const inputs = defineAsyncComponent(() =>
    import('./src/components/inputs/preview.vue')
  )
  const controls = defineAsyncComponent(() =>
    import('./src/components/controls/preview.vue')
  )
  const selectors = defineAsyncComponent(() =>
    import('./src/components/selectors/preview.vue')
  )
  
  const currentTab = ref('home')
  const tabs = {
      home,
      articles,
      inputs,
      controls,
      selectors
    }
    
  provide('auth', {
    user(){
      return {
        "userID": 999999,
        "name": "Test User",
        "email": "test.user@cbd.int",
        "institution": "CBD",
        "userGroups": [
          "user:999999"
        ],
        "isAuthenticated": true,
        "roles": [
          "Everyone",
          "User",          
        ],
        "isEmailVerified": true
      }
    }
  })
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
  
<style>
/* Tabs style  */
.preview {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}
.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
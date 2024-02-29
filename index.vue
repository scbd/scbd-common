<template>
    <ScbdHeader></ScbdHeader>
    <div class="container">
        <div class="preview">
          <ul class="nav nav-tabs mt-3" id="myTab" role="tablist" >
            <li class="nav-item" v-for="(_, tab) in tabs" :key="tab">
              <a class="nav-link" :class="{ active: currentTab === tab }" :id="tab + '-tab'" @click="currentTab = tab"
              data-toggle="tab" :href="'#'+ tab" role="tab" 
                :aria-controls="tab" aria-selected="true">{{tab}}</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane bg-white" :class="{  'fade show active': currentTab === tab }" :id="tab" role="tab" :aria-labelledby="tab+'-tab'" v-for="(_, tab) in tabs" :key="tab">
              <component :is="tabs[currentTab]" class="p-3"></component>
            </div>
          </div>        
        </div>
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
  const notes = ref(["[Yuan Li | Feb 23, 2024 2:30:20 PM ] -first note","[Yuan Li|Feb 23, 2024 2:40:20 PM ] -second note"]) 
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
</style>
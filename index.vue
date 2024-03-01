<template>
  <div>
    <ScbdHeader></ScbdHeader>
    <div class="container">
      <div class="row">
        <div class="col-md-2">
          <ul class="nav flex-column fs-5">
            <li class="nav-item">
              <router-link to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Articles">Articles</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/Inputs">Inputs</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/selectors">selectors</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/controls">Controls</router-link>
            </li>
          </ul>
        </div>
        <div class="col-md-10">
          <router-view />
        </div>

      </div>
  </div>
    <br>
    <br>
    <br>
    <br>
    <ScbdFooter></ScbdFooter>
  </div>
</template>

<script setup>
  // ToDo path will change after rollup fixes
  import ScbdHeader from './src/components/cbd-nav/header.vue'
  import ScbdFooter from './src/components/cbd-nav/footer.vue'
  import CopCountDown from './src/components/countdown/cop-count-down.vue';
  import { ref, provide } from 'vue';

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
  //<--------------- Testing Area ----------------------> 
  //Cop-count-down testing entries
  const endDate = new Date('2024-04-20');
  const copUrl = 'https://www.unep.org/un-biodiversity-conference-cop-15';
  const dateValue = ref('2024-02-06');



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
  
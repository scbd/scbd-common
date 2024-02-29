<template>
  <div>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900" media="all" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css,npm/@scbd/www-css@1.0.1/dist/style.min.css,npm/animate.css@3.5.2/animate.min.css">

  <link rel="stylesheet" href="https://www.cbd.int/app/template-phoenix-overrides.css">
  <link rel="stylesheet" href="https://www.cbd.int/app/css/bootstrap-migrate-3-to-4.css">

    <ScbdHeader></ScbdHeader>
    <div class="container">
      <legend>Controls usage</legend>
      <hr/>
      <div class="row">
        <div class="col-3">
          <h3>COP Countdown</h3>
          <cop-count-down cop-title="COP 15" :end-date="endDate" :url="copUrl"></cop-count-down>
        </div>
        <div class="col-3">
          <h3>Date Selector</h3> {{ dateValue }}
          <date-selector  class="test" v-model="dateValue"></date-selector>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-6">
          <!-- Testing cbdArticleCoverImage -->
          <h3>Testing cbd Article Cover Image</h3>
          <cbd-article-cover-image :cover-image="coverImage" > </cbd-article-cover-image>
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
  import dateSelector from  './src/components/inputs/dateSelector.vue'
  import { ref } from 'vue';

  //<--------------- Testing Area ----------------------> 
  //Cop-count-down testing entries
  const endDate = new Date('2024-04-20');
  const copUrl = 'https://www.unep.org/un-biodiversity-conference-cop-15';
  const dateValue = ref('2024-02-06');

  //<--------------- Testing CBD Article Cover Image component ----------------------> 
  import cbdArticleCoverImage from './src/components/articles/cbd-article-cover-image.vue';
  const coverImage = {
            "url": "https://attachments.cbd.int/6d60d013f7f2ed996312f5caf90d1d7d/Manila Risk Assessment workshop-1 (1).png",
            "credits": 'The credit goes to you.'
        };


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
  
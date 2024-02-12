<template>
  <div>

  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900" media="all" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.css">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css,npm/@scbd/www-css@1.0.1/dist/style.min.css,
      npm/animate.css@3.5.2/animate.min.css">

  <link rel="stylesheet" href="https://www.cbd.int/app/template-phoenix-overrides.css">
  <link rel="stylesheet" href="https://www.cbd.int/app/css/bootstrap-migrate-3-to-4.css">

    <ScbdHeader></ScbdHeader>
    <div style="margin-top:20px;margin-bottom:50px">
      <h1>Dev Applications</h1>
      <cop-count-down cop-title="COP 15" :end-date="endDate" :url="copUrl"></cop-count-down>

      <h1>Test articles Accordion</h1>
      <articles-accordion :query="{q}" ></articles-accordion>

      <h1>KM Link</h1>
      <km-link title="hellllllllll" to="abc.com" icon='fa-address-book'></km-link>
    </div>
    <ScbdFooter></ScbdFooter>
  </div>
</template>

<script setup>
  // ToDo path will change after rollup fixes
  import ScbdHeader from './src/components/cbd-nav/header.vue'
  import ScbdFooter from './src/components/cbd-nav/footer.vue'



  //<--------------- Cop-count-down testing entries----------------------> 
  import CopCountDown from './src/components/countdown/cop-count-down.vue'; 
  const endDate = new Date('2024-04-20');
  const copUrl = 'https://www.unep.org/un-biodiversity-conference-cop-15';

  //<--------------- Cop-count-down testing entries---------------------->
  // import articlesAccordion from './src/components/articles'; 
  import articlesAccordion from '@/components/articles/articles-accordion.vue'; 
  const q = { 
					$and : [
						{ adminTags : { $all : ['abs', 'getting-started']}}
					]
				};
  //<--------------- Test KM Link---------------------->
  import KmLink from './src/components/controls/km-link.vue'
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
  
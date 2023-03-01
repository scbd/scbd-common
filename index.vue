<template>
    <div>
    <!-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css"> -->

    <!-- <script src="https://cdn.jsdelivr.net/combine/npm/jquery@3.4.1/dist/jquery.slim.min.js,npm/popper.js@1.16.0/dist/umd/popper.min.js,npm/bootstrap@4.1.3/dist/js/bootstrap.min.js,
        npm/requirejs@2.3.6/require.min.js"></script>
     -->

    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=BenchNine:300,400,600,900" media="all" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/combine/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css,npm/@scbd/www-css@1.0.1/dist/style.min.css,
        npm/animate.css@3.5.2/animate.min.css">

    <link rel="stylesheet" href="https://www.cbd.int/app/template-phoenix-overrides.css">
    <link rel="stylesheet" href="https://www.cbd.int/app/css/bootstrap-migrate-3-to-4.css">

      <ScbdHeader></ScbdHeader>
      <div style="margin-top:20px;margin-bottom:50px">
        <h1>Dev Applications</h1>
        <countdown :end-date="new Date('2022-10-20T14:00:00.000')"  />
      </div>
      <ScbdFooter></ScbdFooter>
    </div>
  </template>
  
  <script>
    import countdown from './dist/components/countdown/cop-15.js'
    import ScbdHeader from './dist/components/cbd-nav/header.js'
    import ScbdFooter from './dist/components/cbd-nav/footer.js'
    export default {
      components: {
        countdown,
        ScbdHeader,
        ScbdFooter
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
    
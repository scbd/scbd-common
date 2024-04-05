<template>
          <tree :data="data"></tree>   
  </template>
  
  <script setup>
    import tree from './tree.vue';
    import { terms } from './terms.js';

    // format
    /*[{
        "termId":          expect.any(Number),
        "identifier":      expect.any(String),
        "name":            expect.any(String),
        "title":           expect.any(Object),   
        "shortTitle":      expect.any(Object),
        "description":     expect.any(String),
        "longDescription": expect.any(Object),
        "source":          expect.any(String),
        "broaderTerms":    expect.any(Array),
        "narrowerTerms":   expect.any(Array),
        "relatedTerms":    expect.any(Array),
        "nonPreferedTerms":expect.any(Array),
      }]
    */

    const data = terms;
        


  </script>
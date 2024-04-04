<template>
          <tree :data="data"></tree>   
  </template>
  
  <script setup>
    import tree from './tree.vue';

    const data = [
         {
          name: "option 1",      
          selected:true,
          children: [
            {
              name: "sub option 1",              
              children: [
                {
                  name: "option 1.1.1",
                  id:111,
                  selected:false,
                },
                {
                  name: "option 1.1.2",
                  selected:true,
                },
                {
                  name: "option 1.1.3",
                  selected:false,
                },
              ],
            },
            { name: "sub option 2",  selected:false, },
            { name: "sub option 3",  selected:false, },
            { name: "sub option 4",  selected:false,},
          ],
        },
        {
          name: "option 2",
          selected:false,
          children: [
            { name: "sub option 1",  selected:false, },
            {
              name: "sub option 2",
              selected:false,
              children: [
                { name: "option 2.2.1" ,  selected:false,},
                { name: "option 2.2.2" ,  selected:false,}             
              ],
            }      
        ]
        }
    
    ];
        


  </script>
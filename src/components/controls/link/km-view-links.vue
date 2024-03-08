<template>
    <table class="table table-striped" v-if="links?.length"> 
        <tbody>
            <tr  v-for="(item, index) in links" :key="index">  
                <td> {{languages[item.language]}}  <a :href="item.url" >{{item.name}}</a></td>
                <td style="width:10px;"><span class="btn" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
           </tr>        
        </tbody>
    </table> 
</template>
<script setup>
  import { ref, computed } from 'vue'

  const model = defineModel({type:Array, required:true});
   
   let links = computed(()=>{
        if(model.value)
            return  model.value;
        return [];
   }); 


  const languages = {   
    "ar":"Arabic",           
    "en":"English",
    "cn":"Chinese",
    "fr":"French",         
    "es":"Spanish",
    "ru":"Russian"
  }

  const remove=(index)=>{ 
        links.value.splice(index, 1);   
    };


  const langue = computed((key)=>{ 
      return languages[key];
  });

</script>
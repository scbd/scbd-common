<template>
    <table class="table table-striped" v-if="links?.length"> 
        <tbody>
            <tr  v-for="(item, index) in links" :key="index">  
                <td>{{languages[item.language]}}  <a :href="item.url" >{{item.name}}</a></td>   
                <td class = "text-end">
                    <span class="btn m-1" @click="editLink(index)"><i class="fa fa-edit icon"></i></span>
                    <span class="btn" @click="deleteLink(index)"><i class="fa fa-trash-o icon"></i></span>
                </td>
           </tr>        
        </tbody>
    </table> 
</template>

<script setup>
  import { defineEmits, computed } from 'vue'
  import { languages } from '../../../data/language'

  const model = defineModel({type:Array, required:true});
  const emit = defineEmits(['deleteLink'],['editLink']);
   
    let links = computed(()=>{
        if(model.value)
            return  model.value;
        return [];
    });   
 
    const deleteLink = (index) =>{    
        emit("deleteLink", index);        
    }

    const editLink = (index) =>{    
        emit("editLink", index);        
    }
</script>
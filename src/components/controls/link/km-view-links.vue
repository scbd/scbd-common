<template>
    <table class="table table-striped" v-if="links?.length"> 
        <tbody>
            <tr  v-for="(item, index) in links" :key="index">  
                <td>{{languages[item.language]}}  <a :href="item.url" >{{item.name}}</a></td>   
                <td class = "text-end">
                    <span class="btn m-1" @click="edit(index)"><i class="bi bi-pencil-square"></i></span>
                    <span class="btn" @click="remove(index)"><i class="bi bi-trash3"></i></span>
                </td>
           </tr>        
        </tbody>
    </table> 
</template>

<script setup>
  import { defineEmits, computed } from 'vue'
  import { languages } from '../../../data/language'

  const model = defineModel({type:Array, required:true});
  const emit = defineEmits(['onDelete','onEdit']);
   
    let links = computed(()=>{
        if(model.value)
            return  model.value;
        return [];
    });   
 
    const remove = (index) =>{    
        emit("onDelete", index);        
    }

    const edit = (index) =>{    
        emit("onEdit", index);        
    }
</script>
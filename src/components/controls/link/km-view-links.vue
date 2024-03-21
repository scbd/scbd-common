<template>
    <div class="scbd-common km-view-links">
        <table class=" table table-striped" v-if="links?.length"> 
            <tbody>
                <tr  v-for="(item, index) in links" :key="index">  
                    <td  class="align-middle" >
                        <span> {{languages[item.language]}}  </span>                         
                        <a :href="item.url" >
                            {{item.name}} 
                        </a>                    
                        <span v-if="item.tag">
                            ({{ item.tag }})
                        </span>            
                    </td>  
                    <td class="text-nowrap text-right align-middle">              
                        <button class="btn btn-outline-secondary" @click="edit(index)"><i class="bi bi-pencil-square"></i></button>
                        <button class="btn btn-outline-secondary" @click="remove(index)"><i class="bi bi-trash3"></i></button>
                    </td>      
            </tr>             
            </tbody>
        </table> 
    </div>
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
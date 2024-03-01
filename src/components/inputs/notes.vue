
<template>
    <div>
        <textarea id="newNote" v-model="newNote" rows="4" cols="50" @change="save" ></textarea>

        <table class="table table-striped" v-if="notes?.length">
            <tr v-for="(item, index) in notes" :key="index">
                <td>{{item}}</td>                
                <td><button @click="remove(index)">Del</button></td>
            </tr>
        </table>   
    </div> 
</template>



<script setup>
   import { ref, computed } from 'vue'
   import {useUser} from '../../services/composables/useAuth'
   import {format} from '../../services/filters/datetime'
   
 
   let lastNote = '';
   const model = defineModel({type:String, required:true});
   const newNote = ref()
   let notes = computed(()=>{
        if(model.value)
            return  (JSON.parse(model.value)).filter(e=>e!=lastNote);
        return [];
   }); 

   const user = useUser();

   const remove=(index)=>{  
        for (var i = 0; i < notes.value.length; i++) {        
            if(notes.value[i] == notes.value[index]){             
                notes.value.splice(i, 1);        
            }
        }  
        save();  
   }

    const save=()=>{   
        const timestamp = new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true
        }).format(new Date());

        const lNotes = notes.value;
        if(lNotes[lNotes.length-1] == lastNote)
             lNotes.splice(lNotes.length-1, 1);
            
        var newLNote = newNote.value? "[ " +  user.value.name  + " | " + timestamp + " ] - " + newNote.value:"";  
        lastNote =newLNote; 
       

        model.value = JSON.stringify([...lNotes, newLNote]);
    }

</script>


<style>

</style>
       
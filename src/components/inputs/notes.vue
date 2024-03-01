<template>
    <div>
        <textarea            
            v-model="newNote"           
            :id="$attrs.id"
            :class="$attrs.class"
            :required="$attrs.required" 
            :placeholder="$attrs.placeholder"
            :disabled="$attrs.disabled"
            :rows="$attrs.rows" 
            :cols="$attrs.cols" 
            @change="save" >
        </textarea>       
   
        <table class="table table-striped" v-if="notes?.length">
            <tr v-for="(item, index) in notes" :key="index">
                <td>{{item}}  </td>   
                <td style="width:10px;"><span class="btn" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
            </tr>
        </table>   
    </div> 
</template>

<script setup>
   import { ref, computed } from 'vue'
   import {useUser} from '../../services/composables/useAuth'
  
   let lastNote = '';
   const newNote = ref();
   const user = useUser();

   const model = defineModel({type:String, required:true});
   
   let notes = computed(()=>{
        if(model.value)
            return  (JSON.parse(model.value)).filter(e=>e!=lastNote);
        return [];
   }); 
   
   const remove=(index)=>{  
        for (var i = 0; i < notes.value.length; i++) {        
            if(notes.value[i] == notes.value[index]){             
                notes.value.splice(i, 1);        
            }
        }  
        save();  
   };

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
            
        var newLNote = newNote.value? "[ " +  user.value.name  + " | " + timestamp + " ] - " + newNote.value.trim():"";  
        lastNote =newLNote; 
       
        model.value = JSON.stringify([...lNotes, newLNote]);
    };
</script>
<style>
    textarea:focus {
        box-shadow: 0 0 0 0.15rem rgb(13 110 253 / 25%);
    }

    textarea::placeholder {
        color: #999;
        opacity: 1;
        font-size: .8rem;
    } 

    textarea {
        resize: none;
        display:inline-block;
        width:100%;
    }

    table { 
        width:100%;
    }

    table, td , tr{
        padding: 0;
        margin: 0;
        vertical-align: top;
    }

    tr:nth-child(odd)   {
        background-color:#E3E3E3
    }
    tr:nth-child(odd)  span {
        background-color:#E3E3E3
    }
    tr:nth-child(even)   span {
        background-color:#EFEFEF
    }
    tr:nth-child(even)    {
        background-color:#EFEFEF
    }
</style>

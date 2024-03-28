<template>
    <div>
        <textarea   class="form-control"         
            v-model="newNote"           
            :id="$attrs.id"
            :class="$attrs.class"
            :required="$attrs.required" 
            :placeholder="$attrs.placeholder"
            :disabled="$attrs.disabled"
            :rows="rows" 
            :cols="$attrs.cols" 
            @change="save" >
        </textarea>       
   
        <table class="table table-striped" v-if="notes?.length">
            <tbody>
                <tr v-for="(item, index) in notes" :key="index">
                    <td>{{item}}  </td>   
                    <td ><span class="btn float-end" @click="remove(index)"><i class="fa fa-trash-o icon"></i></span></td>
                </tr>    
            </tbody>    
        </table>   
    </div> 
</template>

<script setup>
    import { ref, computed } from 'vue'
    import {useUser} from '../../services/composables'
    import {format} from '../../services/filters'

    const model = defineModel({type:String, required:true});

    const props = defineProps({
        rows:{
            type:Number,
            default:4    
        }
    });
  
    // using for prevent edit history list
    let lastNote = '';
    const newNote = ref("");
    
    // user info will be used for generate new note
    const user = useUser();
 
   // only get history lists
   let notes = computed(()=>{
        if(model.value)
            return  (JSON.parse(model.value)).filter(e=>e!=lastNote);
        return [];
   }); 
   
    // delete history note
    const remove=(index)=>{   
        notes.value.splice(index, 1);
        save();  
    };

    // save whole note list (history notes list + new note)
    const save=()=>{  
        // prevent edit history notes list
        const lNotes = notes.value; 
        if(lNotes.at(-1) == lastNote)
             lNotes.pop();
   
        // generate new note
        const timestamp = format(new Date(), "FF");  
        var newLNote = newNote.value ? `[ ${user.value.name} | ${timestamp} ] - ${newNote.value.trim()}` : "";
        lastNote =newLNote; 
       
        // sending history notes + new note to parent page
        model.value = JSON.stringify([...lNotes, newLNote]);
    };
</script>
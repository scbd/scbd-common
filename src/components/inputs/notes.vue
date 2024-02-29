
<template>
    <div>    
        <textarea id="newNote" name="notes" rows="4" cols="50"  @change="save"></textarea>
        <table class="table table-striped" v-if="historyList.length &&localList.length">
            <tr v-for="(item, index) in historyList" :key="index">
                <td>{{item}}</td>
                <td><button @click="removeElement_history(index)">Del</button></td>
            </tr>
        </table>            
    </div> 
</template>



<script setup>
   //import {useUser} from '../../../services/composables/useAuth.js'
   const props = defineProps({
        list: Array,        
   })

   var localList = props.list;
   var historyList = [...localList];

    const removeElement_history=(index)=> {
      historyList.splice(index, 1);  
      localList.splice(index, 1);  
    
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
    
        var newNote = "[ " +  "useUser()"   + " | " + timestamp + " ] - " + document.getElementById("newNote").value;   
        localList.push( newNote);         
    }

</script>



       
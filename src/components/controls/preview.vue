<template>
    <div>
        <h3>CBD control components</h3>   
        
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        Km notes
                    </div>
                    <div class="card-body"> 
                        <div class="row">
                            <div class="col-6">
                                <km-notes  class="test" v-model="notes"></km-notes>  
                                <div>notes : {{ notes }}</div>
                            </div>
                            <div class="col-4">
                                <strong>km notes sample code</strong>
                                <textarea rows="10" cols="80" class="bg-purple text-white"> 
                                    <template>
                                        <div>                                  
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
                                        import {useUser} from '../../services/composables/useAuth'
                                        import {format} from '../../services/filters/datetime'

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
                                </textarea>
                            </div>
                        </div>
                    </div>               
                </div>
            </div>        
        </div>
    </div>
</template>

<script setup>
  //km Notes
  import kmNotes from './km-notes.vue';
  import { ref } from 'vue';

  const notes = ref("[\"[ Yuan Li | Feb 29, 2024 3:04:00 PM ] - this is first notes\",\"[ Yuan Li | Feb 29, 2024 5:26:42 PM ] - this is second notes\"]")
 
</script>

<style lang="scss" scoped>
  
</style>
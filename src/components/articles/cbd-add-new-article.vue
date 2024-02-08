<template>
        <a :href="newArticleUrl" :target="target">
        <slot>
            <span v-if="!id"><i class="fa fa-plus"></i> Add Content</span>
            <span v-if="id" ><i class="fa fa-edit"></i> Edit Content</span>
            
        </slot>
    </a>
</template>

<script setup>
import { ref, computed } from 'vue';
const { tags, customTags, adminTags, target, id } = defineProps({
            tags 		: { type: Array  , required: false, default: () => []           }, // [] of tag id's
            customTags 	: { type: Array  , required: false, default: () => []           }, // [] of customTag id's
            adminTags 	: { type: Array  , required: false, default: () => []           }, // [] of adminTag text
            target      : { type: String , required: false, default: '_blank'    },
            id          : { type: String , required: false, default: undefined   },
        });

const newArticleUrl = computed(() => {
 const domain = window.location.hostname.replace(/[^\.]+\./, '');
 let baseUrl = 'https://www.cbd.int/management';

 if (domain === 'localhost' || domain === 'cbddev.xyz') baseUrl = 'https://oasis.cbddev.xyz';

				const queryString = [];
                if(!id){
                    if(tags?.length)
                        queryString.push('tags='		+ tags.map(encodeURIComponent).join(','))
                    if(customTags?.length)
                        queryString.push('customTags='	+ customTags.map(encodeURIComponent).join(','))
                    if(adminTags?.length)
                        queryString.push('adminTags='	+ adminTags.map(encodeURIComponent).join(','))
                }

                queryString.push('returnUrl=' + encodeURI(window.location.href));

                if (!id)
                    return `${baseUrl}/articles/new?${queryString.join('&')}`;

                return `${baseUrl}/articles/${encodeURIComponent(id)}/edit?${queryString.join('&')}`;
});
</script>

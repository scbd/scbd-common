
<template>
   <div style="border:none;margin-top:10px">
        <div v-if="!loading">
        
            <slot name="article-cover-image">
                <div v-if="!hideCoverImage && article && article.coverImage && article.coverImage.url" >
                    <cbd-article-cover-image :cover-image="article.coverImage"></cbd-article-cover-image>
                </div>
            </slot>

            <slot name="article-add-new">
                <div v-if="hasEditRights" class="pull-right">    
                    <cbd-add-new-article :tags="tags" :admin-tags="adminTags" :custom-tags="customTags" :id="(article||{})._id" 
                        :target="showEditTarget" class="btn btn-default"></cbd-add-new-article>
                </div>
            </slot>
            <slot name="article">
                <div v-if="article" v-html="$options.filters.lstring(article.content, $locale)" class="ck-content"></div>
            </slot>

            <slot name="article-empty">
                <div v-if="!article" class="ck-content">No information is available for this section at the moment.</div>
            </slot>

        </div>
        <slot name="article-loading">
            <div v-if="loading">Loading content... <i class="fa fa-spinner fa-spin"></i></div>
        </slot>
    </div>

</template>

<script>

import 'css!cdn!npm/@scbd/ckeditor5-build-inline-full@35.0.0/build/content-style.css';
import axios from 'axios';
import ArticlesApi from '../../services/api/articles';
import {lstring } from '../../services/filters/lstring'
import cbdAddNewArticle from './cbd-add-new-article.vue';
import cbdArticleCoverImage from './cbd-article-cover-image.vue';

export default {
    name: 'cbdArticle',
    components : { 
        cbdAddNewArticle, 
        cbdArticleCoverImage 
    },
    props: {
        hideCoverImage  : { type: Boolean, required: false, default:false        },
        showEdit        : { type: Boolean, required: false, default:true         },
        showEditTarget  : { type: String , required: false, default: '_self'     },
        showEditRoles   : { type: Array  , required: false, default:[]           }, // [] of scope roles
        article         : { type: Object,  required: false, default:undefined    },
        query           : { type: Object,  required: false                       },
        tags 		    : { type: Array  , required: false, default:[]           }, // [] of tag id's
        customTags 	    : { type: Array  , required: false, default:[]           }, // [] of customTag id's
        adminTags 	    : { type: Array  , required: false, default:[]           }, // [] of adminTag text
    },
    data() {
        return {
            returnUrl       : window.location.href,
            hasEditRights   : false,
            loading         : false
        }
    },
    created() {
       this.ArticlesApi = new ArticlesApi({ token: this.$auth.strategy.token.get() });
    },
    mounted() {
        if(!this.article && this.query)
            this.loadArticle();
    },
    methods: {
        async loadArticle() {
            try{
                this.loading = true;
                const query = this.query;
                const articleResult = await this.ArticlesApi.queryArticles(query)
     
                if(articleResult.length){
                    let lArticle = articleResult[0];

                    this.preProcessOEmbed();

                    if(lArticle.coverImage?.url){
                        //sometime the file name has space/special chars, use new URL's href prop which encodes the special chars
                        const url = new URL(lArticle.coverImage.url)
                        lArticle.coverImage.url = url.href;

                        lArticle.coverImage.url_1200  = lArticle.coverImage.url.replace(/attachments\.cbd\.int\//, '$&1200x600/')
                    }
                    this.article = lArticle;
                    this.$emit('load', { ...this.article });   
                }
                else {
                    this.$emit('load');
                }

                this.$auth.fetchUser().then(()=>{
                    if(this.showEdit || this.showEdit == 'true' || this.hasOwnProperty(this.showEdit)){

                        let roles = [...this.showEditRoles, 'oasisArticleEditor', 'Administrator']
                        this.hasEditRights = this.$auth.hasScope(roles);
                    }
                })
            }
            catch(e){
                console.error(e)
            }
            finally{
                this.loading = false;
            }
        },
        preProcessOEmbed() {

            setTimeout(function(){

                document.querySelectorAll( 'oembed[url]' ).forEach(async function(element) {
                    var url = element.attributes.url.value;
                    var params = {
                        url : encodeURI(url),
                    }

                    const response = await axios.get('/api/v2020/oembed', {params:params});                    
                    var embedHtml = '<div class="ck-media__wrapper" style="width:100%">' + response.data.html +'</div>'
                    element.insertAdjacentHTML("afterend", embedHtml);
                    
                });

            }, 500)
        }
    },
    filters:{
        lstring
    }
}
</script>
    
<style>

</style>

<template>
  <div class="row">
    <div class="col-4">
      <h3>CBD Article Cover Image</h3>
      <cbd-article-cover-image :cover-image="coverImage">
      </cbd-article-cover-image>
    </div>
    <div class="col-4">
      <h3>Code</h3>
      <textarea rows="10" cols="80" class="bg-black text-white">
                <template>
                    <div class="image-credit-wrapper" v-if="coverImage.url"><div :class="'img cover-image cover-image-position-' + (coverImage.position||'center') + ' cover-image-size-' + (coverImage.size||'cover')"

                    v-if="coverImage.url_1200||coverImage.url" :style="'background-image: url(' + cssEscapeUrl(coverImage.url_1200||coverImage.url) + ');'"></div><span class="image-credit" v-if="coverImage.credits"> {
                            {
                            coverImage.credits
                        }
                    }

                    </span><slot></slot></div></template><script setup>import {
                        cssEscape
                    }

                    from '../../services/util/css.escape';

                    const {
                        coverImage
                    }

                    =defineProps({
                        coverImage: {
                            type: Object,
                            required: true
                        }
                    });

                    const cssEscapeUrl=function(url) {
                        return cssEscape(url);
                    }

                    </script><style scoped>.image-credit-wrapper img {
                        width: 100% !important;
                    }

                    .image-credit-wrapper {
                        overflow: hidden;
                        position: relative;
                        /* margin-left: -15px;
                                        margin-right: -15px; */
                        max-height: 375px;
                        width: 100%
                    }

                    .image-credit-wrapper .image-credit {
                        position: absolute;
                        right: 0px;
                        bottom: 4px;
                    }

                    .image-credit {
                        background: rgba(0, 0, 0, .7);
                        color: #ccc;
                        display: inline-block;
                        font-size: 11px;
                        font-family: helvetica;
                        font-weight: 300;
                        padding: 5px 8px;
                        position: absolute;
                        bottom: 0;
                        right: 0;
                    }

                    .cover-image {
                        width: 100%;
                        background-repeat: no-repeat;
                        position: absolute;
                        top: 0px;
                        right: 0px;
                        bottom: 0px;
                        left: 0px;

                    }

                    .cover-image-position-left {
                        background-position: left;
                    }

                    .cover-image-position-right {
                        background-position: right;
                    }

                    .cover-image-position-top {
                        background-position: top;
                    }

                    .cover-image-position-center {
                        background-position: center;
                    }

                    .cover-image-position-bottom {
                        background-position: bottom;
                    }

                    .cover-image-size-cover {
                        background-size: cover;
                    }

                    .cover-image-size-contain {
                        background-size: contain;
                    }

                    @media (max-width: 767px) {

                        /*For all phone sizes*/
                        .image-credit-wrapper {
                            height: 120px;
                        }
                    }

                    @media (min-width: 768px) and (max-width: 991px) {

                        /* For IPads*/
                        .image-credit-wrapper {
                            height: 250px;
                        }
                    }

                    @media (min-width: 992px) and (max-width: 1199px) {

                        /* For IPad pro*/
                        .image-credit-wrapper {
                            height: 300px;
                        }
                    }

                    @media (min-width: 1200px) {

                        /* For big screens*/
                        .image-credit-wrapper {
                            height: 350px;
                        }
                    }

                    </style>
     </textarea
      >
    </div>
  </div>
</template>

<script setup>
import cbdArticleCoverImage from "./cbd-article-cover-image.vue";
const coverImage = {
  url: "https://attachments.cbd.int/6d60d013f7f2ed996312f5caf90d1d7d/Manila Risk Assessment workshop-1 (1).png",
  credits: "The credit goes to you.",
};
</script>

<style lang="scss" scoped>
</style>
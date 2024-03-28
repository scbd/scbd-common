<template>
  <div class="scbd-controls km-locales btn-group" role="group" aria-label="Document locales" :id="$attrs.id">
    <button v-for="locale in locales" :key="locale" :class="['btn', 'btn-primary', { active: locale === modelValue }]" 
        @click="onLocaleSelected(locale)">
      <div data-bs-toggle="tooltip" data-bs-placement="top" class="d-inline-block" :title="lstring(getTerm(locale), appLocale)">
        <span tabindex="0">{{ locale.toUpperCase() }}</span>
      </div>
    </button>
  </div>
</template>

<script setup>
  import { defineProps, ref, watch } from 'vue';
  import { lstring } from "../../../services/util"

  const model = defineModel({type:String, required: true})
  const props = defineProps({  
    locales: { type: Array, required: true },
  });

  // TODO: use i18n
  // const { t, locale : appLocale } = useI18n();
  const appLocale = ref("en");

  function onLocaleSelected(locale) {
    model.value = locale;
  }

  function setDefaultLocale(languages) {
    if (languages?.length) {
      if (languages.length === 1 || languages.includes(appLocale.value)) {
        onLocaleSelected(appLocale.value);
      } else {
        onLocaleSelected(languages[0]);
      }
    }
  }

  watch(props.locales, (languages) => {
    setDefaultLocale(languages);
  });

  function getTerm(lang) {
    //TODO: Use thesaurus API
    // thesaurusStore.loadTerm(`lang-${lang}`)
    // return thesaurusStore.getTerm(`lang-${lang}`)||{};   
    return lang;   
  }
</script>
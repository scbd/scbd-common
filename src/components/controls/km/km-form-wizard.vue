<template>
  <div :id="$attrs.id" class="sbcd-controls km-form-wizard">
    <div class="nav-header mb-2">
      <ul class="nav nav-pills nav-fill">
        <li
          @click.prevent.stop="selectTab(index)"
          class="nav-item"
          :class="{ active: tab.isActive }"
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
        >
          <a class="nav-link" href="#">
            <span class="tabStatus">{{ index + 1 }} </span>
            <span class="tabLabel">{{ tab.title }}</span>
          </a>
        </li>
      </ul>
    </div>
    <div class="nav-body">
      <form>
        <slot></slot>
      </form>
    </div>
    <div class="nav-footer mt-2">
      <ul class="nav nav-pills nav-fill">
        <li
          @click.prevent.stop="selectTab(index)"
          class="nav-item"
          :class="{ active: tab.isActive }"
          v-for="(tab, index) in tabs"
          :key="`tab-${index}`"
        >
          <a class="nav-link" href="#">
            <span class="tabStatus">{{ index + 1 }} </span>
            <span class="tabLabel">{{ tab.title }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount, computed, defineEmits, provide } from "vue";

const tabs = ref([]);
const emits = defineEmits(["onTabChange"]);

const selectTab = (index) => {
  switchTab(index);
};
const switchTab = (index) => {
  tabs.value.forEach((tab) => {
    tab.isActive = false;
  });
  tabs.value[index].isActive = true;
  emits("onTabChange", index);
};
const totalTabs = computed(() => this.tabs.length);
const currentTab = computed(() => this.tabs.find((e) => e.isActive));

onBeforeMount(() => {
   provide("addFormWizardTabKey", (tab) => {
    tabs.value.push(tab);
  });
});
</script>

<style scoped>
.km-form-wizard ul.nav-pills > li {
  position: relative;
  overflow: visible;
  border-right: 15px solid transparent;
  border-left: 15px solid transparent;
}

.km-form-wizard ul.nav-pills > li + li {
  margin-left: 0;
}

.km-form-wizard ul.nav-pills > li:first-child {
  border-left: 0;
}

.km-form-wizard ul.nav-pills > li:first-child a {
  border-radius: 5px 0 0 5px;
}

.km-form-wizard ul.nav-pills > li:last-child {
  border-right: 0;
}

.km-form-wizard ul.nav-pills > li:last-child a {
  border-radius: 0 5px 5px 0;
}

.km-form-wizard ul.nav-pills > li a {
  border-radius: 0;
  background-color: #eee;
}

.km-form-wizard ul.nav-pills > li:not(:last-child) a:after {
  right: -20px;
  border-color: transparent transparent transparent #eee;
}

.km-form-wizard ul.nav-pills > li:not(:first-child) a:before,
.km-form-wizard ul.nav-pills > li:not(:last-child) a:after {
  position: absolute;
  content: "";
  top: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 20px 0 20px 20px;
  z-index: 150;
}

.km-form-wizard ul.nav-pills > li:not(:first-child) a:before {
  left: -20px;
  border-color: #eee #eee #eee transparent;
}

.km-form-wizard ul.nav-pills > li:hover:not(:last-child) a:after {
  border-color: transparent transparent transparent #aaa;
}

.km-form-wizard ul.nav-pills > li:hover:not(:first-child) a:before {
  border-color: #aaa #aaa #aaa transparent;
}

.km-form-wizard ul.nav-pills > li:hover a {
  background-color: #aaa;
  color: #fff;
}

.km-form-wizard ul.nav-pills > li.active:not(:last-child) a:after {
  border-color: transparent transparent transparent #428bca;
}

.km-form-wizard ul.nav-pills > li.active:not(:first-child) a:before {
  border-color: #428bca #428bca #428bca transparent;
}

.km-form-wizard ul.nav-pills > li.active a {
  background-color: #428bca;
  color: #fff;
}

.tabStatus {
  display: inline-block;
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
  line-height: 1.5rem;
  color: #fff;
  text-align: center;
  background: rgba(0, 0, 0, 0.38);
  border-radius: 50%;
}

.nav-pills .nav-item {
  margin: 0 10px;
}
</style>

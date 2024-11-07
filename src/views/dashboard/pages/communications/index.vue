<template>
  <div>
    <h2>prop</h2>
    <son :parent-data1="parentData1" :parent-data2="parentData2" @child-event="childEvent"></son>
    <h2>v-model</h2>
    <son v-model="modelValue"></son>
    <h2>mitt</h2>
    <div>mittValue:{{ mittValue }}</div>
    <son />
  </div>
</template>

<script setup lang="ts">
import { eventMitt } from "@/utils/mitt";
import { onUnmounted, reactive, ref, watch } from "vue";
import son from "./components/Son.vue";
const parentData1 = ref("parentData1");
const parentData2 = reactive({
  name: "parentData2"
});
const modelValue = ref("modelValue");
const mittValue = ref("mittValue");
const childEvent = (msg: string) => {
  console.log(msg);
  parentData1.value = msg;
};
const handleMitt = (mittMsg: string) => {
  console.log(mittMsg, "mittMsg");
  mittValue.value = mittMsg;
};
eventMitt.on("handleMitt", handleMitt);

watch(parentData1, (newVal, oldVal) => {
  console.log(newVal, oldVal);
});
onUnmounted(() => {
  eventMitt.off("handleChange", handleMitt);
});
</script>

<style lang="scss" scoped></style>

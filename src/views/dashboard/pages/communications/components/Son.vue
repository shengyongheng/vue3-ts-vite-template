<template>
  <div>{{ parentData1 }}</div>
  <div><el-button @click="emits('child-event', '新数据')">按钮</el-button></div>
  <div>
    modelValue:{{ modelValue }}
    <el-button @click="emits('update:modelValue', 'new modelValue')">按钮</el-button>
  </div>
  <div>
    <el-button @click="mittClick">按钮</el-button>
  </div>
</template>

<script setup lang="ts">
import { eventMitt } from "@/utils/mitt";

const emits = defineEmits(["child-event", "update:modelValue"]);
const props = defineProps({
  parentData1: {
    type: String,
    default: ""
  },
  parentData2: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: String,
    default: ""
  }
});
const mittClick = () => {
  eventMitt.emit("handleMitt", "新数据");
};
console.log(props, "props");
</script>

<style lang="scss" scoped></style>

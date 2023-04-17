<script setup lang='ts'>
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from "pinia"
import { DataType } from "./types"
import { ElMessage } from 'element-plus'
import useStore from "@/store"
const { homeStore } = useStore()
let { name } = storeToRefs(homeStore)
const data = reactive<DataType>({
    name: "衡盛永"
})
const eleRef = ref<HTMLElement>();

onMounted(() => {
    console.log('组件挂载到页面之后执行-------onMounted')
    console.log(eleRef.value)
    ElMessage.success("全局提示")
})

</script>
<template>
    <div class="home" ref="eleRef">
        homeStore.name: {{ name }}
        <br />
        data.name:{{ data.name }}
    </div>
</template>

<style scoped lang='scss'>
.home {}
</style>
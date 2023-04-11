<template>
    <div></div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
export default defineComponent({
    name: 'MyLogin',
    setup() {
        const data = reactive({})
        onMounted(() => {
            console.log('组件挂载到页面之后执行-------onMounted')
        })
        return {
            ...toRefs(data),
        }
    },
})

</script>
<style scoped lang='scss'></style>
<template>
    <div>
        test1 组件
    </div>
</template>

<script setup lang="ts">
const { data } = defineProps({
    data: {
        type: Object,
        default: () => ({})
    }
})
// console.log(data, 'data')
</script>

<style lang="scss" scoped></style>
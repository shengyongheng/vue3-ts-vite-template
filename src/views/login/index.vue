<template>
    <div>登录</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import loginApi from "@/api/login/index"
export default defineComponent({
    name: 'MyLogin',
    setup() {
        const data = reactive({})
        onMounted(() => {
            loginApi.login('api/test', { params: { username: '衡盛永', password: '123456' } }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        })
        return {
            ...toRefs(data),
        }
    },
})

</script>
<style scoped lang='scss'></style>
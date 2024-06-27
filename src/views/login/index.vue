<template>
    <div @click="login">登录</div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import loginApi from "@/api/login/index"
export default defineComponent({
    name: 'MyLogin',
    setup() {
        const router = useRouter();
        const data = reactive({})
        onMounted(() => {
            loginApi.login('api/test', { params: { username: '衡盛永', password: '123456' } }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            });
        })
        const login = () => {
            router.push({
                path: '/dashboard',
            })
        }
        return {
            ...toRefs(data),
            login
        }
    },
})

</script>
<style scoped lang='scss'></style>
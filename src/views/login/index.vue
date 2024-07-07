<template>
  <div @click="console.log(name)">登录</div>
  <input type="text" v-model="name" />
  <div>{{ computedName }}</div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  toRefs,
  onMounted,
  computed,
} from "vue";
import { useRouter } from "vue-router";
import loginApi from "@/api/login/index";
export default defineComponent({
  name: "MyLogin",
  beforeCreate() {
    console.log("beforeCreate");
  },
  created() {
    console.log("created");
  },
  setup() {
    const router = useRouter();
    const data = reactive({
      name: "你好",
    });
    onMounted(() => { });
    const computedName = computed(() => {
      return data.name + "!";
    });
    console.log(computedName, "computedName");

    return {
      ...toRefs(data),
      computedName,
    };
  },
});
</script>
<style scoped lang='scss'></style>
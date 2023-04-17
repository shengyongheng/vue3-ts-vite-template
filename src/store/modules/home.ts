import { defineStore } from "pinia"

interface AppState {
    token: string
    name?: string
}

export default defineStore("home", {
    // 相当于data
    state: (): AppState => {
        return {
            // 所有这些属性都将自动推断其类型,如果推断失败可以试下 as xxx
            token: "test-token",
            name: "hengshengyong"
        }
    },
    // 相当于计算属性
    getters: {

    },
    // 相当于vuex的 mutation + action，可以同时写同步和异步的代码
    actions: {

    },
    /**
     * @desc 只有当状态发生改变时，才进行持久化
     */
    // 所有数据持久化
    // persist: true,
    // 按需持久化
    persist: {
        // 修改存储中使用的键名称，默认为当前 Store的 id
        key: 'token',
        // 修改为 sessionStorage，默认为 localStorage
        // storage: window.sessionStorage,F
        // 部分持久化状态的点符号路径数组，[]意味着没有状态被持久化(默认为undefined，持久化整个状态)
        paths: ['token'],
    },
});
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue' // 结合vue使用



export const userStore = defineStore('userStore', () => {
    // 变量声明
    const isAdmin = ref(false);


    // 方法
    const setAdmin = async (value: boolean) => {
        isAdmin.value = value
    }


    return {

        //   变量
        isAdmin,

        //方法
        setAdmin,

    } as const
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(userStore, import.meta.hot))
}
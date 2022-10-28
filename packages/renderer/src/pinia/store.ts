import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStore = defineStore('main', ()=>{
    // 变量声明
  const featureSelection = ref<string>('generate')
  const managerSession = ref('')
    // 方法声明
  const setFeature = (value:string)=>{
    featureSelection.value = value
  }
  const setMemberInfo = (value:string)=>{
    managerSession.value = value
  }
    // 请求
  const getCount = async()=>{}
  return{
    //   变量
    featureSelection,
    managerSession,
    //   方法
    getCount,
    setFeature,
    setMemberInfo
  } as const
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useStore, import.meta.hot))
}
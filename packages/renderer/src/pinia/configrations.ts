import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import jsonData from '../assets/equipment.json'

export const useConfigrations = defineStore('configrations', ()=>{
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
  import.meta.hot.accept(acceptHMRUpdate(useConfigrations, import.meta.hot))
}
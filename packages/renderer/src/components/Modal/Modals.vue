<script setup lang="ts">
import { ref, onMounted } from 'vue'

const modal = ref() 
const body = document.body as HTMLElement
const div = document.createElement('div') as HTMLElement
body.appendChild(div)

// 组件加载自动弹出
onMounted(()=>{
    body.classList.add('modal-show')
    div.classList.add('modal-backdrop')
    div.classList.add('fade')
    div.classList.add('show')
    modal.value.classList.add('show')
    modal.value.style.display = 'block'
})
// 关闭弹出框
const close = ()=>{
    modal.value.style.display = 'none'
    modal.value.classList.remove('show')
    body.classList.remove('modal-show')
    body.removeChild(div)
}
</script>

<template>
<!-- 弹出框 -->
<div 
ref="modal"
class="modal fade" 
id="staticBackdrop" 
data-bs-backdrop="static" 
data-bs-keyboard="false" 
tabindex="-1" 
aria-labelledby="staticBackdropLabel" 
style="display: none;" 
aria-hidden="true"
>
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">管理账号登录</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="close">
                </button>
            </div>
            <div class="modal-body">
                <div class="text-center mt-2">
                    <img src="@img/images/xuanren_logo.png" alt="logo">
                </div>
                 <div class="p-2 mt-4">
                    <div class="mb-3 modal-date-group">
                      <input 
                      type="text" 
                      class="form-control"  
                      style="padding-left: 30px;" 
                      id="username" 
                      placeholder="用户名"
                      >
                      <i class="bx bxs-user" style="color: #5b73e8"></i>
                    </div>
                    <div class="mb-3 modal-date-group">
                      <input 
                      type="password" 
                      class="form-control"  
                      style="padding-left: 30px;" 
                      id="userpassword" 
                      placeholder="密码"
                      >
                      <i class="bx bxs-lock-alt" style="color: #5b73e8"></i>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-bs-dismiss="modal" @click="close">取消</button>
                <button type="button" class="btn btn-primary" >确认登录</button>
            </div>
        </div>
    </div>
</div>
</template>
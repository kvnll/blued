<script setup lang="ts">
const emit = defineEmits(['close'])
</script>
<template>
    <teleport to="body">
        <div class="modal_custom modal-flex">
            <div class="modal-content modal-container">
                <div class="row" >
                    <div class="col-12">
                        <div class="">
                            <div class="modal-header">
                                <h5 class="modal-title" style="font-weight: bold;">提示</h5>
                                <button type="button" class="btn-close" @click="emit('close')">
                                </button>
                            </div>
                            <div class="modal-body">
                                <p>登录失败请重试！</p>
                            </div>
                                <div class="mt-3 text-center" style="margin-bottom:20px">
                                    <button 
                                    class="btn btn-primary w-sm waves-effect waves-light"
                                    @click="emit('close')"
                                    >
                                      确认
                                     </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </teleport>
</template>

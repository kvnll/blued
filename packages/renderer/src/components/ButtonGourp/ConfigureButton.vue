<script setup lang="ts">
import { ref } from 'vue'

const buttonActive = ref<string>('')
const menuOpen = (value:string)=>{
    buttonActive.value = value
    console.log(buttonActive.value)
}
</script>

<template>
<div class="row">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">点位配方模板</h4>
            <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom"
            :class="[buttonActive==='initialization'&&'btn-success']" 
            @click="menuOpen('initialization')"
            >
                伺服电机测试
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom"
            :class="[buttonActive==='start'&&'btn-success']" 
            @click="menuOpen('start')"
            >
                伺服电机测试
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom"
            :class="[buttonActive==='stop'&&'btn-success']" 
            @click="menuOpen('stop')"
            >
                伺服电机测试
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom" 
            :class="[buttonActive==='initialization1'&&'btn-success']"
            @click="menuOpen('initialization1')"
            >
                电机测试模板
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom" 
            :class="[buttonActive==='faultReset'&&'btn-success']"
            @click="menuOpen('faultReset')"
            >
                点位名称
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom" 
            :class="[buttonActive==='auto'&&'btn-success']"
            @click="menuOpen('auto')"
            >
                点位名称
            </button>
        </div>
        <div class="configure-box">
            <button 
            type="button" 
            class="btn btn-lg btn-secondary waves-effect waves-light configure-custom"
            :class="[buttonActive==='faultReset1'&&'btn-success']"
            @click="menuOpen('faultReset1')"
            >
                故障复位
            </button>
        </div>
            </div>
        </div>
    </div>
</div>
</template>

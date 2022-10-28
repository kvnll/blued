<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Parameter from '@/components/Parameter.vue'
import Modals from '@/components/Modal/Modals.vue'
</script>

<template>
<div class="container-fluid">
<!-- start page title -->

<div class="row">
    <div class="col-md-12 col-xl-12">
        <div class="card card-body" style="height:100%;">
            <Parameter/>
        </div>
    </div>
</div>

<!-- 弹出框 -->
<Modals />
<!-- end row -->
</div>
</template>
<script setup lang="ts">
import { watch, ref } from 'vue'
import BButtonGroup  from '@/components/ButtonGourp/ButtonGroup.vue'
import Material from '@/components/Material.vue'
import { useSystemInfoStore } from '../../../../pinia/systemInfo';
import SystemStatus from '@/components/ButtonGourp/SystemStatus.vue'


const useStore = useSystemInfoStore();
</script>

<template>
<div class="container-fluid">
<!-- start page title -->
<SystemStatus></SystemStatus>

<!-- end page title -->
<div class="row">
    <div class="col-lg-12 index_box_items">
        <div class="index-date-group ipt">
             <input 
                class="form-control input" 
                type="text" 
                id="default-input" 
                placeholder="报警信息！"  
               >
                <i class="fas fa-bell" style="font-size:20px"></i>
        </div>
        <div class="index-date-group ipt1">
             <input 
                class="form-control input" 
                type="text" 
                id="default-input" 
                placeholder="12:39" 
                >
                <i class="fas fa-stopwatch" style="font-size:20px"></i>
        </div>
    </div><!-- end col -->
</div>
<!-- end row -->

<div class="row">
    <div class="col-md-9">
        <div class="card card-body" style="margin-top:60px; height:90%;">
            <Material/>
        </div>
    </div>
    <div class="col-md-3" style="margin-top:60px;height: 100%;">
       <BButtonGroup></BButtonGroup>
    </div>
</div>
<!-- end row -->
</div>
</template>
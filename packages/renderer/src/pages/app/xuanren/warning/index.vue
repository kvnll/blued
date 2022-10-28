<script setup lang="ts">
import { watch, ref } from 'vue'
import BButtonGroup  from '@/components/ButtonGourp/ButtonGroup.vue'
import Warning from '@/components/Warning.vue'
import SystemStatus from '@/components/ButtonGourp/SystemStatus.vue'

import Alarm from "@/components/alarm.vue";

</script>

<template>
<div class="container-fluid">
<!-- start page title -->
<SystemStatus></SystemStatus>
<!-- end page title -->
    <Alarm></Alarm>
<!-- end row -->

<div class="row">
    <div class="col-md-9">
        <div class="card card-body" style="margin-top:20px;">
            <Warning/>
        </div>
    </div>
    <div class="col-md-3" style="margin-top:20px;height: 100%;">
       <BButtonGroup></BButtonGroup>
    </div>
</div>
<!-- end row -->
</div>
</template>
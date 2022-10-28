<script setup lang="ts">

import { useSystemInfoStore } from '../pinia/systemInfo';
const useStore = useSystemInfoStore();
</script>


<template>
    <div class="row">
      <div class="col-lg-12 index_box_items" v-if="useStore.alarms.length != 0">
        <div class="index-date-group ipt">
          <input
            class="form-control input"
            type="text"
            id="default-input"
            disabled
            :placeholder="useStore.alarms[0].alarm_info + '----' + useStore.alarms.length + '条报警'"
          />
          <i class="fas fa-bell" style="font-size: 20px"></i>
        </div>
        <div class="index-date-group ipt1">
          <input
            class="form-control input"
            type="text"
            disabled
            id="default-input"
            placeholder="12:39"
          />
          <i class="fas fa-stopwatch" style="font-size: 20px"></i>
        </div>
      </div>
      <!-- end col -->
    </div>
</template>

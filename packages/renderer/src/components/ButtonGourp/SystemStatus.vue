<script setup lang="ts">
import { watch, ref } from 'vue'
import BButtonGroup  from '@/components/ButtonGourp/ButtonGroup.vue'
import Generate from '@/components/Generate.vue'
import { useSystemInfoStore } from '../../pinia/systemInfo';


const useStore = useSystemInfoStore();
</script>

<template>
    <div class="row">
      <div class="col-12 row" style="margin-bottom: 10px; height: 90%">
        <div class="row">
          <div
            class="col-2"
            v-for="i in useStore.jsonData.auto"
            style="margin-bottom: 20px;"
            :key="i.address"
          >
            <i
              class="bx bxs-circle p-1"
                    style=" font-size: 16px; float: left;"

              
              :style="
                useStore.readSystemStatusInfo[i.address]
                  ? 'color:#00DD00'
                  : 'color:grey'
              "
            ></i>
            <span style="float: left">{{ i.name }}</span>
          </div>
        </div>
      </div>
    </div>
</template>
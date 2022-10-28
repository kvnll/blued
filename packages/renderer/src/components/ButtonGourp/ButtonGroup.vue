<script setup lang="ts">
// @ts-nocheck

import { ref } from "vue";
import { useSystemInfoStore } from "../../pinia/systemInfo";

const useStore = useSystemInfoStore();
</script>

<template>
  <div class="row">
    <div
      v-for="item in useStore.jsonData.menu"
      :key="item.address"
      class="col-6 col-sm-6 diy"
    >
      <!-- :class="
          useStore.readSystemStatusInfo[item.address] ? 'btn-success' : ''
        " -->
      <div v-if="item.buttonType == 'click'">
        <button
          type="button"
          @click="
            () => {
              useStore.writePlc(item, true);
              if (item.cleardb != null) {
                useStore.writePlc(item.cleardb, false);
              }
            }
          "
                    style="width: 100%; padding: 10px; font-size: 16px"

          :style="{
            'background-color': item.current_data ? 'orange' : '',
            height: 50,
            width: '100%',
          }"
          :class="[
            'btn',
            'btn-secondary',
            'waves-effect',
            'waves-light',
            'butttongroup-custom',
            { 'disable-btn': item.name == '消毒' },
          ]"
        >
          {{ item.name }}
        </button>
      </div>

      <div v-if="item.buttonType == 'hold'">
        <button
          type="button"
          @touchstart="
            () => {
              // @ts-ignore

              item.color = 'orange';
              useStore.writePlc(item, true);
            }
          "
          @touchcancel="
            () => {
              // @ts-ignore

              item.color = 'grey';
              useStore.writePlc(item, false);
            }
          "
          @touchend="
            () => {
              // @ts-ignore

              item.color = 'grey';
              useStore.writePlc(item, false);
            }
          "
          @mousedown="
            () => {
              // @ts-ignore

              item.color = 'orange';
              useStore.writePlc(item, true);
            }
          "
          :style="{
            // @ts-ignore

            'background-color': item.color,
            height: 50,
          }"
          @mouseup="
            () => {
              // @ts-ignore
              item.color = 'grey';
              useStore.writePlc(item, false);
            }
          "
          style="width: 100%; padding: 10px; font-size: 16px"
          :class="[
            'btn',
            'btn-secondary',
            'waves-effect',
            'waves-light',
            'butttongroup-custom',
          ]"
        >
          {{ item.name }}
        </button>
      </div>

      <div v-if="item.buttonType == 'hold_return'">
        <button
          type="button"
          @click="
            () => {
              useStore.writePlc(item, !item.current_data);
              item.current_data = !item.current_data;
            }
          "
                    style="width: 100%; padding: 10px; font-size: 16px"

          :style="{
            'background-color': item.current_data ? 'orange' : '',
            height: 50,
            width: '100%',
          }"
          :class="[
            'btn',
            'btn-secondary',
            'waves-effect',
            'waves-light',
            'butttongroup-custom',
            { 'disable-btn': item.name == '消毒' },
          ]"
        >
          {{ item.name }}
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.diy {
  padding-left: 0 !important;
  padding-right: 20px !important;
  box-sizing: border-box;
}
//不可选中
.disable-btn {
  background-color: #eeeeee !important;
  color: #565758 !important;
  border: #91949b 1px solid !important;
}
</style>

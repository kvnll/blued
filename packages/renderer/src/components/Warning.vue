<script setup lang="ts">
import { useSystemInfoStore } from "../pinia/systemInfo";
const useStore = useSystemInfoStore();
</script>

<template>
  <div class="row">
    <div class="col-lg-12">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 20px">报警显示</h4>
          <div class="table-responsive">
            <button
              type="button"
              class="btn btn-danger waves-effect waves-light"
              style="margin-top: 40px; height: 50px"
              @click="useStore.clearAlarm"
              @touchstart="useStore.clearAlarm"
            >
              清除警报 <i class="fas fa-redo"></i>
            </button>
            <table class="table mb-0">
              <thead>
                <tr>
                  <th>NO.1</th>
                  <th>报警信息</th>
                  <th>报警代码</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="i in useStore.alarms" :key="i">
                  <th scope="row">{{ i.time }}</th>
                  <td>{{ i.alarm_info }}</td>
                  <td>{{ i.code }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
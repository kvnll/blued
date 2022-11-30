<script setup lang="ts">
// @ts-nocheck
import { useScannerStore } from "../../../../pinia/scannerStore";
const userStore = useScannerStore();
</script>
<template>
  <div class="container-fluid">
    <!-- start page title -->
    <!-- left -->
    <div class="row">
      <div class="col-xl-12">
        <div class="row col-12">
          <div class="col-xl-6">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">串口配置</h4>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >plc 读码信号:</label
                  >
                  <div class="col-md-4">
                    {{ userStore.plc_read_compare_ready }}
                    {{ userStore.current_scanner_loop_time }}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >plc 打码信号:</label
                  >
                  <div class="col-md-4">
                    {{ userStore.plc_read_prinnter_ready }}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >plc 读码信号:</label
                  >
                  <div class="col-md-4">
                    {{ userStore.plc_read_compare_ready }}
                    {{ userStore.current_campre_loop_time }}
                  </div>
                </div>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >读码器1数据:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      v-model="userStore.first_scanner_data"
                      disabled
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.get_scanner_data('1')"
                    >
                      获取
                    </div>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >读码器2数据:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      v-model="userStore.second_scanner_data"
                      disabled
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.get_scanner_data('2')"
                    >
                      获取
                    </div>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >读码器3数据:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      disabled
                      v-model="userStore.third_scanner_data"
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.get_scanner_data('3')"
                    >
                      获取
                    </div>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >读码器4数据:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      disabled
                      v-model="userStore.fourth_scanner_data"
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.get_scanner_data('4')"
                    >
                      获取
                    </div>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >读码器5数据:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      disabled
                      v-model="userStore.fifth_scanner_data"
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.get_scanner_data('5')"
                    >
                      获取
                    </div>
                  </div>
                </div>

                <div class="mb-3 row">
                  <label
                    for="example-text-input"
                    class="col-md-3 col-form-label"
                    >测试打码器:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      disabled
                      value="B2215213"
                      id="example-text-input"
                    />
                  </div>
                  <div class="col-md-4">
                    <div
                      class="btn btn-info"
                      @click="userStore.send_printer_data('B2215213')"
                    >
                      获取
                    </div>
                  </div>
                </div>
                <div class="mb-3 row">
                  <label
                    for="compare-text-input"
                    class="col-md-3 col-form-label"
                    >比对结果:</label
                  >
                  <div class="col-md-4">
                    <input
                      class="form-control"
                      type="text"
                      disabled
                      v-model="userStore.compare_result"
                      id="compare-text-input"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-6">
            <div class="card">
              <div class="card-header">系统日志</div>
              <div class="card-content" style="max-height: 1000px">
                <ol>
                  <li v-for="item in userStore.system_logs" :key="item">
                    {{ item }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end col -->
      <!-- right -->
    </div>
    <!-- end row -->
  </div>
</template>
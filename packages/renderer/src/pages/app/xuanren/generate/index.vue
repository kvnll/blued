<script setup lang="ts">
import { watch, ref } from "vue";
import BButtonGroup from "@/components/ButtonGourp/ButtonGroup.vue";
import Generate from "@/components/Generate.vue";
import { useSystemInfoStore } from "../../../../pinia/systemInfo";
import Typography from "../../element/typography/index.vue";
import SystemStatus from "@/components/ButtonGourp/SystemStatus.vue";
import Alarm from "@/components/alarm.vue";

const useStore = useSystemInfoStore();
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
        <div style="margin-top: 20px">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <div class="card mb-4">
                    <img
                      class="card-img-top img-fluid G-img"
                      src="../../../../../src/assets/images/background.png"
                      alt="Card image cap"
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-12">
                  <div class="col-lg-12">
                    <div class="row diy-row">
                      <div
                        class="col-lg-4"
                        v-for="item in useStore.jsonData.materials"
                        :key="item.address"
                      >
                        <div class="mb-4 row">
                          <label
                            for="example-text-input"
                            class="col-md-3 col-form-label label-diy"
                            >{{ item.name }}</label
                          >
                          <div class="col-md-8">
                            <div
                              class="S-btn_custom bg-success"
                              :class="[
                                // @ts-ignore
                                !item.current_data ? 'bg-success' : 'bg-danger',
                              ]"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-3" style="margin-top: 20px; height: 100%">
        <BButtonGroup></BButtonGroup>
      </div>
    </div>
    <!-- end row -->
  </div>
</template>
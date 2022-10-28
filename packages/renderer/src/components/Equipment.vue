<script setup lang="ts">
import jsonData from "../assets/ranfeng1.json";
import axios from "axios";
import { ref, onMounted, onUnmounted  } from "vue";
import jsonData2 from "../assets/ranfeng2.json";

const ranfengdata = ref({});
const ranfengdata2 = ref({});

let setLoops: NodeJS.Timer;

const readPlc = async (item: any) => {
  let type = 99;
  if (item.type == "int") {
    type = 2;
  }

  if (item.type == "bool") {
    type = 0;
  }

  if (item.type == "real") {
    type = 4;
  }

  if (item.type == "dint") {
    type = 2;
  }
  const u = new URLSearchParams({
    Address: "DB1030." + item.address,
    Type: type.toString(),
  }).toString();

  const result = await axios.get("http://127.0.0.1:6688/SiemensS7Net?" + u, {});

  return result.data.value;
};

const getPlcs = async () => {
  jsonData.auto.map(async (item: any) => {
    item.current_data = await readPlc(item);
    if (item.name != undefined) {
      ranfengdata.value[item.name] = item.current_data;
    }
  });
  jsonData2.auto.map(async (item: any) => {
    item.current_data = await readPlc(item);
    if (item.name != undefined) {
      ranfengdata2.value[item.name] = item.current_data;
    }
  });
};

onMounted(async () => {
    getPlcs();
  setLoops = setInterval(() => {
    getPlcs();
  }, 3000);
});

onUnmounted(async () => {
  clearInterval(setLoops);
});
</script>
<template>
  <div class="row">
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 20px">染封设备信息</h4>
          <div class="table-responsive" style="margin-top: 30px">
            <table class="table table-bordered mb-0" style="text-align: center">
              <tbody>
                <tr v-for="(key, value) in ranfengdata" :key="value">
                  <td
                    style="width: 30%; vertical-align: middle !important"
                    scope="row"
                  >
                    {{ value }}
                  </td>
                  <th
                    style="width: 10%; vertical-align: middle !important"
                    scope="row"
                  >
                    {{ key }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title" style="font-size: 20px">染封设备信息</h4>
          <div class="table-responsive" style="margin-top: 30px">
            <table class="table table-bordered mb-0" style="text-align: center">
              <tbody>
                <tr v-for="(key, value) in ranfengdata2" :key="key">
                  <td
                    style="width: 30%; vertical-align: middle !important"
                    scope="row"
                  >
                    {{ value }}
                  </td>
                  <th
                    style="width: 10%; vertical-align: middle !important"
                    scope="row"
                  >
                    {{ key }}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
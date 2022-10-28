<script setup lang="ts">
// @ts-nocheck
import ConfigureButton from "@/components/ButtonGourp/ConfigureButton.vue";
import Configure from "@/components/Configure.vue";
import Modals from "@/components/Modal/Modals.vue";
import { json } from "node:stream/consumers";
import { ref, watchEffect, onMounted, onUnmounted } from "vue";
import axios from "axios";
import jsonData from "../../../../assets/db.json";
// @node-module
const fs = require("fs");
import path from "path";

const color = ref("grey");
const keys = Object.keys(jsonData);
const buttonActive = ref(keys[0]);
const current_json = ref(<any[]>[]);
const autoMode = ref("auto");
const current_address = ref({});

const getData = async () => {
  const data = await jsonData[buttonActive.value];
  current_json.value = [];
  if (autoMode.value == "auto") {
    current_json.value = data.auto;
  } else {
    current_json.value = data.menu;
  }
  current_json.value = current_json.value.map((item) => {
    // @ts-ignore
    item.color = "";
    // @ts-ignore
    item.inputValue = "";
    return item;
  });
};

getData();

const menuOpen = (value: string) => {
  buttonActive.value = value;
  console.log(buttonActive.value);
  getData();
};

const modeChanges = (value: string) => {
  autoMode.value = value;
  getData();
};

// @ts-ignore
let setLoops;

onMounted(async () => {
  setLoops = setInterval(() => {
    current_json.value.map((item) => {
      // @ts-ignore
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
      axios
        .get("http://127.0.0.1:6688/SiemensS7Net", {
          params: { address: item.dbdata + "." + item.address, type: type },
        })
        .then((res) => {
          item.value = res.data.value;
          item.message = res.data.message;
        })
        .catch((error) => {
          item.message = "plc 链接失败";
        });
    });
    current_json.value = current_json.value;
  }, 1000);
});

onUnmounted(async () => {
  clearInterval(setLoops);
});

function toShort(number) {
  const int16 = new Int16Array(1);
  int16[0] = number;
  return int16[0];
}
const plcWrite = (item: any, value: any) => {
  // Bool=0,
  //  Byte=1,
  //  Int16=2,
  //  Int32=3,
  //  Float = 4,
  // Default = 99
  let type = 99;
  if (item.type == "int") {
    type = 2;
  }

  if (item.type == "byte") {
    type = 1;
  }

  if (item.type == "bool") {
    type = 0;
  }

  if (item.type == "real") {
    type = 4;
  }

  if (item.type == "dint") {
    type = 3;
  }

  const u = new URLSearchParams({
    Address: item.dbdata + "." + item.address,
    Type: type,
    Value: value,
  }).toString();

  console.log(u);
  axios
    .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
    .catch(function (error: any) {
      console.log(error);
    });
};
//type_options
const typeOptions = ref<any>([
  { label: "bool", text: "bool" },
  { label: "byte", text: "byte" },
  { label: "int", text: "int" },
  { label: "dint", text: "dint" },
  { label: "real", text: "real" },
]);
//编辑对象
const editParmas = ref<any>({});
//执行编辑(拿到json,修改json，覆盖json)
const plcEdit = async (index: number) => {
  const json = await jsonData;
  json[buttonActive.value][autoMode.value][index] = Object.assign(
    {},
    editParmas.value
  );
  //剔除无用参数
  json[buttonActive.value][autoMode.value] = json[buttonActive.value][
    autoMode.value
  ].map((item: any) => {
    return {
      dbdata: item.dbdata,
      address: item.address,
      type: item.type,
      name: item.name,
      jog: item.jog,
    };
  });
  const data = JSON.stringify(json);
  fs.writeFile(
    path.join(
      __dirname,
      "../../../../../../packages/renderer/src/assets/db.json"
    ),
    data,
    "utf8",
    function (error: any) {
      if (!error) {
        current_json.value[index].edit = false;
        getData();
      }
    }
  );
};
//添加模型/对象
const model = {
  dbdata: "",
  address: "",
  type: undefined,
  name: "",
  jog: false,
};
const addParmas = ref<any>(Object.assign({}, model));
const addShow = ref<Boolean>(false);
// 打开添加/关闭添加
const openAdd = () => {
  addShow.value = !addShow.value;
};
//执行添加(拿到json,修改json，覆盖json)
const plcAdd = async () => {
  if (
    addParmas.value.name == "" ||
    addParmas.value.address == "" ||
    !addParmas.value.type
  ) {
    return;
  }
  const json = await jsonData;
  addParmas.value.dbdata = json[buttonActive.value][autoMode.value][0].dbdata; //设置默认的dbdata
  json[buttonActive.value][autoMode.value].push(addParmas.value);
  const data = JSON.stringify(json); //序列化
  fs.writeFile(
    path.join(
      __dirname,
      "../../../../../../packages/renderer/src/assets/db.json"
    ),
    data,
    "utf8",
    function (error: any) {
      if (!error) {
        getData();
        addShow.value = false;
        addParmas.value = Object.assign({}, model);
      }
    }
  );
};
</script>
<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-10">
        <div class="card card-body" style="height: 100%">
          <div class="row">
            <div class="col-12 flex_box">
              <h4 class="card-title" style="font-size: 20px">
                参数信息
                <hr />
                <div class="button-items">
                  <input
                    :class="
                      autoMode == 'auto' ? 'btn btn-info' : 'btn btn-grey'
                    "
                    @click="modeChanges('auto')"
                    type="button"
                    value="自动"
                  />
                  <input
                    :class="
                      autoMode == 'menu' ? 'btn btn-info' : 'btn btn-grey'
                    "
                    @click="modeChanges('menu')"
                    type="button"
                    value="手动"
                  />
                </div>
              </h4>
              <div class="button-items">
                <input class="btn btn-info" type="button" value="导入" />
                <input class="btn btn-info" type="button" value="导出" />
              </div>
            </div>
            <!-- end col-->
            <div class="col-md-12">
              <div
                class="row"
                v-for="(item, index) in current_json"
                :key="index"
              >
                <div class="row">
                  <div class="col-md-3">
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      id="formrow-email-input"
                      :placeholder="item.name"
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      id="formrow-email-input"
                      :placeholder="item.address"
                    />
                  </div>
                  <div class="col-md-1">
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      id="formrow-email-input"
                      :placeholder="item.type"
                    />
                  </div>
                  <div class="col-md-2">
                    <input
                      type="text"
                      disabled
                      class="form-control"
                      id="formrow-email-input"
                      :value="item.value"
                    />
                  </div>

                  <div class="col-md-1">
                    <b-button
                      @click="item.show = !item.show"
                      @touch="item.show = !item.show"
                      class="m-1"
                      >写区
                    </b-button>
                  </div>
                  <div class="col-md-1">
                    <b-button
                      @click="
                        () => {
                          item.edit = !item.edit;
                          editParmas = Object.assign({}, item);
                        }
                      "
                      @touch="
                        () => {
                          item.edit = !item.edit;
                          editParmas = Object.assign({}, item);
                        }
                      "
                      class="m-1"
                      >编辑
                    </b-button>
                  </div>
                  <div class="col-md-2" v-if="item.type == 'bool'">
                    <b-button
                      style="width: 100%"
                      class="btn btn-lg btn-secondary waves-effect waves-light"
                      @touchstart="
                        () => {
                          item.color = 'orange';
                          plcWrite(item, true);
                        }
                      "
                      @touchcancel="
                        () => {
                          item.color = 'grey';
                          plcWrite(item, false);
                        }
                      "
                      @touchend="
                        () => {
                          item.color = 'grey';
                          plcWrite(item, false);
                        }
                      "
                      @mousedown="
                        () => {
                          item.color = 'orange';
                          plcWrite(item, true);
                        }
                      "
                      :style="{ 'background-color': item.color, height: 50 }"
                      @mouseup="
                        () => {
                          item.color = 'grey';
                          plcWrite(item, false);
                        }
                      "
                      >jog</b-button
                    >
                  </div>
                  <hr />
                </div>
                <div class="row" v-if="item.show">
                  <b-collapse v-model="item.show">
                    <b-card>
                      <input class="form-control" v-model="item.inputValue" />
                      <hr />
                      <input
                        class="btn btn-info"
                        type="button"
                        @touch="plcWrite(item, item.inputValue)"
                        @click="plcWrite(item, item.inputValue)"
                        value="执行写入"
                      />
                    </b-card>
                  </b-collapse>
                </div>
                <div class="row" v-if="item.edit">
                  <b-collapse v-model="item.edit">
                    <b-card>
                      <div class="row">
                        <div class="col-md-4">
                          <input
                            type="text"
                            class="form-control"
                            id="formrow-email-input"
                            v-model="editParmas.name"
                          />
                        </div>
                        <div class="col-md-3">
                          <input
                            type="text"
                            class="form-control"
                            id="formrow-email-input"
                            v-model="editParmas.address"
                          />
                        </div>
                        <div class="col-md-2">
                          <b-form-select
                            v-model="editParmas.type"
                            :options="typeOptions"
                            placeholder="type"
                          ></b-form-select>
                        </div>
                      </div>
                      <hr />
                      <input
                        class="btn btn-info"
                        type="button"
                        @touch="plcEdit(index)"
                        @click="plcEdit(index)"
                        value="执行编辑"
                      />
                    </b-card>
                  </b-collapse>
                </div>

                <!-- end col-->
              </div>
            </div>
            <!-- add-box-header -->
            <div class="row">
              <input
                class="btn btn-info"
                type="button"
                @touch="openAdd"
                @click="openAdd"
                value="添加"
              />
            </div>
            <!-- add-box-body -->
            <b-card v-if="addShow">
              <div class="row">
                <div class="col-md-4">
                  <input
                    type="text"
                    placeholder="name"
                    v-model.trim="addParmas.name"
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <input
                    type="text"
                    placeholder="address"
                    v-model.trim="addParmas.address"
                    class="form-control"
                  />
                </div>
                <div class="col-md-3">
                  <b-form-select
                    v-model="addParmas.type"
                    :options="typeOptions"
                  ></b-form-select>
                </div>
              </div>
              <hr />
              <input
                class="btn btn-info"
                type="button"
                @touch="plcAdd"
                @click="plcAdd"
                value="执行添加"
              />
            </b-card>
          </div>
        </div>
      </div>
      <div class="col-md-2" style="height: 100%">
        <div class="row">
          <div class="col-xl-12">
            <div class="card">
              <div class="card-body">
                <h4 class="card-title">点位配方模板</h4>
                <div
                  class="configure-box p-0"
                  v-for="index in keys"
                  :key="index"
                >
                  <button
                    type="button"
                    class="
                      p-0
                      mt-2
                      btn btn-lg btn-secondary
                      waves-effect waves-light
                      configure-custom
                    "
                    :class="[buttonActive === index && 'btn-success']"
                    @click="menuOpen(index)"
                  >
                    {{ index }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

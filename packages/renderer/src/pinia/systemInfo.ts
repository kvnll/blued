import axios from "axios"
// @ts-nocheck

import { acceptHMRUpdate, defineStore } from "pinia"
import { computed, ref, reactive } from "vue"
import { useStorage } from '@vueuse/core'

export const useSystemInfoStore = defineStore("systemInfo", () => {
  // 变量声明
  const readSystemStatusInfo = ref({})
  const writeSystemStatusInfo = ref<any>([])
  const alarms = ref<any>([])
  let jsonData = reactive({
    auto: [
      {
        dbdata: "DB1030",
        address: "DBX134.3",
        type: "bool",
        name: "开始按钮",
        jog: false,
      },
      {
        dbdata: "DB1001",
        name: "样本管三轴在初始位",
        address: "DBX284.2",
        type: "bool",
        value: "null"
      },
      {
        dbdata: "DB1001",
        name: "开盖两轴在初始位",
        address: "DBX284.3",
        type: "bool",
        value: null
      },
      {
        dbdata: "DB1001",

        name: "移液三轴轴在初始位",
        address: "DBX284.4",
        type: "bool",
        value: null
      },
      {
        dbdata: "DB1001",

        name: "样本管转台在初始位",
        address: "DBX284.5",
        type: "bool",
        value: null
      },
      {
        dbdata: "DB1001",

        name: "沉降仓转台在初始位",
        address: "DBX284.6",
        type: "bool",
        value: null
      },
      {
        dbdata: "DB1001",

        name: "清洗转台在初始位",
        address: "DBX284.7",
        type: "bool",
        value: null
      },
      {
        dbdata: "DB1001",

        name: "离心机1在初始位",
        address: "DBX285.0",
        type: "bool",
        value: "null"
      },
      {
        dbdata: "DB1001",

        name: "离心机2在初始位",
        address: "DBX285.1",
        type: "bool",
        value: "null"
      },
      {
        dbdata: "DB1030",
        name: "R01在原位",
        address: "DBX2.6",
        type: "bool",
        value: "null"
      },
      {
        dbdata: "DB1030",

        "name": "R02在原位",
        "address": "DBX2.7",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R03在原位",
        "address": "DBX3.0",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R01运行中",
        "address": "DBX3.1",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R02运行中",
        "address": "DBX3.2",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R03运行中",
        "address": "DBX3.3",
        "type": "bool",
        "value": "null"
      },

    ],
    materials: [

      {
        dbdata: "DB1030",
        address: "DBX1.6",
        type: "bool",
        name: "样本管输入",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX1.7",
        type: "bool",
        name: "样本管输出",
        jog: false,
      },

      {
        dbdata: "DB1030",
        address: "DBX2.0",
        type: "bool",
        name: "沉降仓输入",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX2.1",
        type: "bool",
        name: "配重",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX2.2",
        type: "bool",
        name: "Tip头",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX2.3",
        type: "bool",
        name: "清洗液",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX2.4",
        type: "bool",
        name: "拨片架",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX2.5",
        type: "bool",
        name: "细胞固定盒",
        jog: false,
      },
    ],
    menu: [
      {
        dbdata: "DB1030",
        address: "DBX0.0",
        type: "bool",
        name: "初始化按钮",
        buttonType: 'hold',
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.1",
        buttonType: 'hold',
        type: "bool",
        name: "开始按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.2",
        buttonType: 'click',

        type: "bool",
        name: "重置按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.3",
        type: "bool",
        buttonType: 'click',
        name: "暂停按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.4",
        buttonType: 'hold',

        type: "bool",
        name: "继续运行按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.5",
        type: "bool",
        buttonType: 'hold',
        name: "故障复位",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.6",
        type: "bool",
        buttonType: 'click',
        cleardb: {
          dbdata: "DB1030",
          address: "DBX0.7",
          type: "bool",
          buttonType: 'click',
          name: "自动按钮",
          jog: false,
        },
        name: "手动按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX0.7",
        type: "bool",
        buttonType: 'click',
        cleardb: {
          dbdata: "DB1030",
          address: "DBX0.6",
          type: "bool",
          buttonType: 'click',
          name: "自动按钮",
          jog: false,
        },
        name: "自动按钮",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX1.0",
        type: "bool",
        buttonType: 'hold_return',
        current_data: true,
        name: "清洗模式",
        jog: false,
      },
      {
        dbdata: "DB1030",
        buttonType: 'click',
        address: "DBX1.1",
        type: "bool",
        name: "#1 离心机吊篮清洗",
        jog: false,
      },
      {
        dbdata: "DB1030",
        buttonType: 'click',

        address: "DBX1.2",
        type: "bool",
        name: "#2 离心机吊篮清洗",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX1.3",
        buttonType: 'click',

        type: "bool",
        name: "#1 离心机吊篮归位",
        jog: false,
      },
      {
        dbdata: "DB1030",
        address: "DBX1.4",
        buttonType: 'click',

        type: "bool",
        name: "#2 离心机吊篮归位",
        jog: false,
      }, {
        dbdata: "DB1030",
        address: "DBX1.5",
        buttonType: 'hold',

        type: "bool",
        name: "注射泵点抽液",
        jog: false,
      },
      {
        dbdata: "DB1030",
        name: "R01在原位",
        address: "DBX2.6",
        type: "bool",
        value: "null"
      },
      {
        dbdata: "DB1030",

        "name": "R02在原位",
        "address": "DBX2.7",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R03在原位",
        "address": "DBX3.0",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R01运行中",
        "address": "DBX3.1",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R02运行中",
        "address": "DBX3.2",
        "type": "bool",
        "value": "null"
      },
      {
        dbdata: "DB1030",

        "name": "R03运行中",
        "address": "DBX3.3",
        "type": "bool",
        "value": "null"
      },


    ],
    alarms: [
      {
        dbdata: "DB1001",
        address: "DBX0.0",
        type: "BOOL",
        name: "急停报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.1",
        type: "BOOL",
        name: "安全门打开",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.2",
        type: "BOOL",
        name: "TIP头废料箱不在位报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.3",
        type: "BOOL",
        name: "废料箱不在位报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.4",
        type: "BOOL",
        name: "稀释液不足报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.5",
        type: "BOOL",
        name: "相机通信已成报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.6",
        type: "BOOL",
        name: "样本管输入层推出报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX0.7",
        type: "BOOL",
        name: "样本光输入层中间位报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.0",
        type: "BOOL",
        name: "样本管输出层推出报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.1",
        type: "BOOL",
        name: "样本管输出层中间位报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.2",
        type: "BOOL",
        name: "TIP头不足报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.3",
        type: "BOOL",
        name: "沉降仓不足报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.4",
        type: "BOOL",
        name: "拨片架不足报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.5",
        type: "BOOL",
        name: "配重不足报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.6",
        type: "BOOL",
        name: "细胞盒不在位报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX1.7",
        type: "BOOL",
        name: "NG台有件报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX154.0",
        type: "BOOL",
        name: "样本管转台报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX156.0",
        type: "INT",
        name: "样本管转台报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX158.0",
        type: "BOOL",
        name: "移液X轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX160.0",
        type: "INT",
        name: "移液X轴报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX162.0",
        type: "BOOL",
        name: "移液Y轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX164.0",
        type: "INT",
        name: "移液Y轴报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX166.0",
        type: "BOOL",
        name: "移液Z轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX168.0",
        type: "INT",
        name: "移液Z轴报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX170.0",
        type: "BOOL",
        name: "样本管搬运X轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX172.0",
        type: "INT",
        name: "样本管搬运X代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX174.0",
        type: "BOOL",
        name: "样本管搬运Y轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX176.0",
        type: "INT",
        name: "样本管搬运Y代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX178.0",
        type: "BOOL",
        name: "样本管搬运Z轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX180.0",
        type: "INT",
        name: "样本管搬运Z代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX182.0",
        type: "BOOL",
        name: "沉降仓转台报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX184.0",
        type: "INT",
        name: "沉降仓转台代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX186.0",
        type: "BOOL",
        name: "样本管开盖X轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX188.0",
        type: "INT",
        name: "样本管开盖X轴报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX190.0",
        type: "BOOL",
        name: "样本管开盖Z轴报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX192.0",
        type: "INT",
        name: "样本管开盖Z轴报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX194.0",
        type: "BOOL",
        name: "倒废液电机1报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX196.0",
        type: "WORD",
        name: "倒废液电机1故障代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX198.0",
        type: "WORD",
        name: "倒废液电机1报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX200.0",
        type: "BOOL",
        name: "倒废液电机2报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX202.0",
        type: "WORD",
        name: "倒废液电机2故障代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX204.0",
        type: "WORD",
        name: "倒废液电机2报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX206.0",
        type: "BOOL",
        name: "仍废料电机报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX208.0",
        type: "WORD",
        name: "仍废料电机故障代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX210.0",
        type: "WORD",
        name: "仍废料电机报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX212.0",
        type: "BOOL",
        name: "倒废液电抓1报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX214.0",
        type: "WORD",
        name: "倒废液电抓1报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX216.0",
        type: "BOOL",
        name: "倒废液电抓2报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX218.0",
        type: "WORD",
        name: "倒废液电抓2报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX220.0",
        type: "BOOL",
        name: "开盖电抓报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX222.0",
        type: "DINT",
        name: "开盖电抓报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX226.0",
        type: "BOOL",
        name: "样本管抓取电抓报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX228.0",
        type: "DINT",
        name: "样本管抓取电抓报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX232.0",
        type: "BOOL",
        name: "离心机1报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX234.0",
        type: "INT",
        name: "离心机1报警报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX236.0",
        type: "BOOL",
        name: "离心机2报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX238.0",
        type: "INT",
        name: "离心机2报警报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX240.0",
        type: "BOOL",
        name: "振荡器1报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX242.0",
        type: "INT",
        name: "振荡器1报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX244.0",
        type: "BOOL",
        name: "振荡器2报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX246.0",
        type: "INT",
        name: "振荡器2报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX248.0",
        type: "BOOL",
        name: "振荡器3报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX250.0",
        type: "INT",
        name: "振荡器3报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX252.0",
        type: "BOOL",
        name: "振荡器4报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX254.0",
        type: "INT",
        name: "振荡器4报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX256.0",
        type: "BOOL",
        name: "振荡器5报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX258.0",
        type: "INT",
        name: "振荡器5报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX260.0",
        type: "BOOL",
        name: "振荡器6报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX262.0",
        type: "INT",
        name: "振荡器6报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX264.0",
        type: "BOOL",
        name: "振荡器7报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX266.0",
        type: "INT",
        name: "振荡器7报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX268.0",
        type: "BOOL",
        name: "振荡器8报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX270.0",
        type: "INT",
        name: "振荡器8报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.0",
        type: "BOOL",
        name: "振荡器9报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX274.0",
        type: "INT",
        name: "振荡器9报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX276.0",
        type: "BOOL",
        name: "振荡器10报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX278.0",
        type: "INT",
        name: "振荡器10报警代码",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX280.0",
        type: "BOOL",
        name: "R01机器人报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX280.1",
        type: "BOOL",
        name: "R02机器人报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.0",
        type: "BOOL",
        name: "达科为染色机电源断开",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.1",
        type: "BOOL",
        name: "达科为染色机机械臂报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.2",
        type: "BOOL",
        name: "达科为染色机没有启动连接",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.3",
        type: "BOOL",
        name: "达科为染色机恒染试剂过期",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.4",
        type: "BOOL",
        name: "达科为染色机数据出错报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX282.5",
        type: "BOOL",
        name: "达科为染色机与设备没有连接报警",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX284.0",
        type: "BOOL",
        name: "读码NG",
        jog: false
      },
      {
        dbdata: "DB1001",
        address: "DBX284.1",
        type: "BOOL",
        name: "读码比对NG",
        jog: false
      }
    ]
  })


  const writePlc = (
    item: { type: string; dbdata: string; address: string },
    inputValue: any
  ) => {
    let type = 2
    console.log("##############");
    if (item.type == "int") {
      type = 2
    }

    if (item.type == "bool") {
      type = 0
    }

    if (item.type == "real") {
      type = 3
    }

    // @ts-ignore
    const u = new URLSearchParams({
      Address: item.dbdata + "." + item.address,
      Type: type,
      Value: inputValue,
    }).toString()

    axios
      .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
      .catch(function (error) { })
  }
  // 方法声明
  // 请求
  const getPlcs = async () => {
    jsonData.auto.map(async (item: any) => {
      readSystemStatusInfo.value[item.address] = await readPlc(item);
    })

    jsonData.menu.map(async (item: any) => {
      item.current_data = await readPlc(item);

    })

    jsonData.materials.map(async (item: any) => {
      item.current_data = await readPlc(item);
    })

    jsonData.alarms.map(async (item: any) => {
      const time = new Date().toLocaleTimeString();
      // alarms.value.push({ time: time, alarm_info: item, code: 2 })
      let alarm_result = await readPlc(item);
      console.log(alarm_result)
      if (alarm_result != false && alarm_result != null) {
        // @ts-ignore

        const index = alarms.value.findIndex(x => x.alarm_info === item.name)
        if (index == -1) {
          alarms.value.push({ time: time, alarm_info: item.name, code: alarm_result })

        }


      }
    })
    jsonData = jsonData;
  }

  const readPlc = async (item: any) => {
    const u = new URLSearchParams({
      Address: item.dbdata + '.' + item.address,
      Type: '0',
    }).toString()


    const result = await axios
      .get("http://127.0.0.1:6688/SiemensS7Net?" + u, {})

    return result.data.value

  }

  const clearAlarm = () => {
    alarms.value = [];
  }
  return {
    readSystemStatusInfo,
    writeSystemStatusInfo,
    writePlc,
    clearAlarm,
    jsonData,
    alarms,
    //   方法
    getPlcs,
  } as const
})
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSystemInfoStore, import.meta.hot))
}

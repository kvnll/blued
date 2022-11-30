import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
// @ts-nocheck

export const useScannerStore = defineStore('scanner', () => {
    // @ts-nocheck

    const process_is_running = ref<boolean>(false);

    // 存储扫码枪扫描数据
    const first_scanner_data = ref<string>('');
    const second_scanner_data = ref<string>('');
    const third_scanner_data = ref<string>('');
    const fourth_scanner_data = ref<string>('');
    const fifth_scanner_data = ref<string>('');


    const system_logs = ref<string[]>([]);


    const current_scanner_loop_time = ref();

    const current_campre_loop_time = ref();


    const current_time_for_plc = ref();


    // 开始扫码点位
    const plc_read_scanner_ready = ref<boolean>(false);

    const plc_read_prinnter_ready = ref<boolean>(false);


    const plc_read_compare_ready = ref<boolean>(false);

    const not_allow_to_read = async (ready: boolean) => {
            // @ts-ignore

        console.log("##########################%%%%%%%%%%%%%%%%%%%%%");
                    // @ts-ignore

        const u = new URLSearchParams({
            Address:  "DB1045.DBX397.7",
            Type: 0,
            Value: ready,
        }).toString()

        console.log(u)
        const result = await axios
            .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error: any) {
                console.log(error)
            })

    }

    // com 映射
    const scanner_com_mapper = {
      '1': 'COM10',
      '2': 'COM5',
      '3': 'COM4',
      '4': 'COM9',
      '5': 'COM6',
    }

    // 获取扫码枪扫描数据
    const get_scanner_data = async (scannerKey:string) => {
      let result = (await getScannerResult(scanner_com_mapper[scannerKey])) || ''
      // 5号扫描结果限制10位，其他扫描结果限制9位
      const maxLength = scannerKey == '5' ? 10 : 9;
      if(result.length > maxLength){
        result = result.substring(0, maxLength);
      }
      switch (scannerKey) {
        case '1':
          first_scanner_data.value = result || ''
          break;
        case '2':
          second_scanner_data.value = result || ''
          break;
        case '3':
          third_scanner_data.value = result || ''
          break;
        case '4':
          fourth_scanner_data.value = result || ''
          break;
        case '5':
          fifth_scanner_data.value = result || ''
          break;
        default:
          break;
      }
    }

    const send_printer_data = async (data: string) => {

        const result = await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM3&hexString=${ascii_to_hexa(data)}`, {})
            .catch(function (error) { })

    }





    const checkprocess_is_running = ref(false)
    const previous_barcode = ref('');
    const third_barcode_barcode = ref('');


    // 监测是否可以扫描第一个标
    const scanner_first_set_read = async () => {
        // @ts-ignore
        const u = new URLSearchParams({
            Address: 'DB1045.DBX410.0',
            Type: 0,
        }).toString()

        const result = await axios
            .get("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error) { })
        // @ts-ignore
        console.log(result.data.value, '10.0');
        // @ts-ignore

        return result.data.value

    }


    const prinnter_first_set_read = async () => {
        const u = new URLSearchParams({
            Address: 'DB1045.DBX412.0',
            Type: '0',
        }).toString()

        const result = await axios
            .get("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error) { })
        // @ts-ignore
        console.log(result.data.value, '12.0');
        // @ts-ignore

        return result.data.value

    }


    //等待 1 顺序
    const check_a_all_set = async () => {
        const u = new URLSearchParams({
            Address: 'DB1045.DBX410.2',
            Type: '0',
        }).toString()

        const result = await axios
            .get("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error) { })
        // @ts-ignore

        console.log(result.data.value, '10.2');
        // @ts-ignore

        return result.data.value

    }


    // 等待二

    const check_b_all_set = async () => {
        const u = new URLSearchParams({
            Address: 'DB1045.DBX410.3',
            Type: '0',
        }).toString()

        const result = await axios
            .get("http://127.0.0.1:6688/SiemensS7Net?" + u, {})

            .catch(function (error) { })
        // @ts-ignore

        console.log(result.data.value, '10.3');
        // @ts-ignore

        return result.data.value

    }

    // @ts-ignore

    const scanner_first_set_callback = async (res) => {
        // @ts-ignore

        const u = new URLSearchParams({
            Address: res == 1 ? "DB1045.DBX398.0" : "DB1045.DBX398.1",
            Type: 0,
            Value: true,
        }).toString()

        console.log(u)
        const result = await axios
            .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error: any) {
                console.log(error)
            })
        // @ts-ignore


        console.log(result.data.value, '98.0');

        // @ts-ignore

        return result.data.value == 1 ? true : false

    }




    // @ts-ignore

    const print_finish_to_plc = async () => {
        // @ts-ignore

        const u = new URLSearchParams({
            Address: "DB1045.DBX404.0",
            Type: 0,
            Value: true,
        }).toString()

        console.log(u)
        const result = await axios
            .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error: any) {
                console.log(error)
            })
        // @ts-ignore

        return result.data.value == 1 ? true : false

    }

    // @ts-ignore

    const checkend_first_set_callback = async (res) => {
        console.log(res)
        // @ts-ignore

        const u = new URLSearchParams({
            Address: res == 1 ? "DB1045.DBX400.0" : "DB1045.DBX400.1",
            Type: '0',
            Value: true,
        }).toString()

        console.log(u)
        const result = await axios
            .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error: any) {
                console.log(error)
            })
        // @ts-ignore

        return result.data.value == 1 ? true : false

    }




    // 扫码 打码 顺讯

    const workFlowProctocal = async () => {

        if (system_logs.value.length > 100 ) {
            system_logs.value = [];
        }
        if (!process_is_running.value) {
            // @ts-ignore

            current_scanner_loop_time.value = new Date().toLocaleString();

            // 读plc扫码是否准备好
            const scanner_first_set_is_read = await scanner_first_set_read();
            plc_read_scanner_ready.value = scanner_first_set_is_read;

            if (scanner_first_set_is_read) {
                console.log("####收到扫码信号");
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}PLC 读码信号输出  ${scanner_first_set_is_read}`)


                process_is_running.value = true

                // console.log("####开始读码1");
                await get_scanner_data('1')
                await get_scanner_data('2')
                // console.log("####开始读码2");
                await new Promise(resolve => setTimeout(resolve, 1000));
                // console.log("####开始读码3");

                // await get_scanner_data('1')
                // await get_scanner_data('2')

                await get_scanner_data('1')
                await get_scanner_data('2')


                console.log("####读码器1数据", first_scanner_data.value);
                console.log("####读码器2数据", second_scanner_data.value);
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器1号机 👩🏻‍⚕️  ${first_scanner_data.value}`)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器2号机 👩🏻‍⚕️  ${second_scanner_data.value}`)

                // 当两个码都是空白的时候
                if (first_scanner_data.value != '' || second_scanner_data.value != '') {
                    // 将1、2扫描的A码转换成D码
                    let aCode = first_scanner_data.value;
                    aCode == '' && (aCode = second_scanner_data.value)
                    // 发起转换request
                    const current_scanner_set_data = await aCodeToDCode(aCode);
                    if(current_scanner_set_data && current_scanner_set_data.length > 0){
                      // ACode转码成功
                      system_logs.value.push(`打印阶段A码:${aCode},D码:${current_scanner_set_data}`)
                      // 发送成功指令给PLC
                      scanner_first_set_callback('1')
                      // @ts-ignore
                      system_logs.value.push(`${current_campre_loop_time.value}#######扫码成功 ✅ 返回给plc`)

                      console.log("###---------------数据", first_scanner_data.value);

                      await new Promise(resolve => setTimeout(resolve, 1000));

                      const myInterval = setInterval(async () => {
                          // 开始打印
                          console.log("####准备打印");
                          await  not_allow_to_read(false);
                          // @ts-ignore
                          //获取plc 打码准备
                          const print_result = await prinnter_first_set_read()
                          plc_read_prinnter_ready.value = print_result;

                          if (print_result) {
                              console.log("####开始打印 😁😁😁😁😁");
                              // @ts-ignore
                              await get_scanner_data('1')
                              await get_scanner_data('2')

                              await new Promise(resolve => setTimeout(resolve, 500));

                              await get_scanner_data('1')
                              await get_scanner_data('2')

                              await send_printer_data(current_scanner_set_data)

                              // 告诉plc 打码指令已经下发
                              await print_finish_to_plc();

                              await new Promise(resolve => setTimeout(resolve, 1000));

                              await  not_allow_to_read(true);
                              
                              // @ts-ignore
                              system_logs.value.push(`${current_campre_loop_time.value}#######打印完毕 ✅  返回给plc`)

                              clearInterval(myInterval);

                          }
                      }, 4000);
                    } else {
                      // ACode转码失败
                      scanner_first_set_callback('2')
                      system_logs.value.push(`${current_campre_loop_time.value}#######A码转D码失败 ❌ 返回给plc`)
                    }
                } else {
                    scanner_first_set_callback('2')
                    // @ts-ignore
                    system_logs.value.push(`${current_campre_loop_time.value}#######扫码失败 ❌ 返回给plc`)
                }
                process_is_running.value = false
            } else {
                process_is_running.value = false
            }
        }
    }


    // 对比
    const checkFlowProtocal = async () => {

        // @ts-ignore
        if (!checkprocess_is_running.value) {

            current_campre_loop_time.value = new Date().toLocaleString();


            console.log("#检验步骤--- 检查是否开始比对")


            const is_a_ready = await check_a_all_set();
            const is_b_ready = await check_b_all_set();

            plc_read_compare_ready.value = is_a_ready && is_b_ready
            if (is_a_ready && is_b_ready) {
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######开始扫码比对 👩🏻‍⚕️ 👩🏻‍⚕️ 👩🏻‍⚕️ 👩🏻‍⚕️ 👩🏻‍⚕️ 👩🏻‍⚕️  ${plc_read_compare_ready.value}`)

                checkprocess_is_running.value = true

                let check_result_bool = false
                await get_scanner_data('3');
                await get_scanner_data('4');
                await get_scanner_data('5');

                await new Promise(resolve => setTimeout(resolve, 1000));

                await get_scanner_data('3');
                await get_scanner_data('4');
                await get_scanner_data('5');

                // await get_scanner_data('3');
                // await get_scanner_data('4');
                // await get_scanner_data('5');

                console.log('扫码器3号机', third_scanner_data.value)
                console.log('扫码器4号机', fourth_scanner_data.value)
                console.log('扫码器5号机', fifth_scanner_data.value)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器3号机 👩🏻‍⚕️  ${third_scanner_data.value}`)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器4号机 👩🏻‍⚕️  ${fourth_scanner_data.value}`)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器5号机 👩🏻‍⚕️ ${fifth_scanner_data.value}`)

                if(third_scanner_data.value.length > 0 && fourth_scanner_data.value.length > 0 && third_scanner_data.value != fourth_scanner_data.value){
                  // 3,4都不为空，但是却不相等，直接返回失败给PLC
                  check_result_bool = false
                } else {
                  // 比对前先将3、4号A码转换成D码，再和5号D码进行比对
                  let aCode = third_scanner_data.value;
                  aCode == '' && (aCode = fourth_scanner_data.value)
                  // 发起转换request
                  const dCode = await aCodeToDCode(aCode);
                  system_logs.value.push(`比对阶段A码:${aCode},D码:${dCode}`)
                  if (fifth_scanner_data.value == '') { // 5号为空
                      check_result_bool = false
                  } else if (dCode == fifth_scanner_data.value) {
                      check_result_bool = true
                  }
                }
                // @ts-ignore
                if (check_result_bool) {
                    await checkend_first_set_callback(1);
                    // @ts-ignore
                    system_logs.value.push(`${current_campre_loop_time.value}#######比对成功 ✅  返回给plc`)
                } else {
                    await checkend_first_set_callback(0);
                    // @ts-ignore
                    system_logs.value.push(`${current_campre_loop_time.value}#######比对失败 ❌  返回给plc`)
                }
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            checkprocess_is_running.value = false
        }
    }

    // A码转D码
    const aCodeToDCode = async (aCode: string) => {
      const url = 'https://fc.landing-med.com/hb_cervical/cervical_tool/api/code_insert/machine_find_DCode'
      const result = await axios
            .post(url, {
              aCode,
            })
            .catch(function (error) { })
      if(result['status'] == 200){
        // 请求成功
        const res = result['data'];
        const data = res['data'] || ''; // D码
        return data;
      } else {
        return '';
      }
    }

    const getScannerResult = async (com: string) => {
        //激活扫码器
        // await axios
        //     .get(`http://127.0.0.1:6688/SerialPort?portName=${com}&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
        //     .catch(function (error) { })

        //获取扫码器的值
        const result = await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=${com}&hexString=43%2044%204F%2050%2053%204D%2044%2032%200D`, {})
            .catch(function (error) { })

        // await axios
        //     .get(`http://127.0.0.1:6688/SerialPort?portName=${com}&hexString=52%2044%2043%204D%2058%2045%2056%2031%202C%2050%2031%2030%200D`, {})
        //     .catch(function (error) { })
        // @ts-ignore

        if (result.status == 200) {
            
            // @ts-ignore
            const result_data  =  hex2a(result.data.value);
            // @ts-ignore
            return result_data
        } else {
            return ''
        }

    }




    const ascii_to_hexa = (str: string) => {
        str = str += `\r\n
        `
        var arr1 = [];
        for (var n = 0, l = str.length; n < l; n++) {
            var hex = Number(str.charCodeAt(n)).toString(16);
            arr1.push(hex);
        }
        var arra2 = arr1.join(" ");
        return arra2
    }

    const hex2a = (hex: string) => {
        var str = '';
        for (var i = 0; i < hex.length; i += 2)
            str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
        return str;
    }

    const resetall = async () => {
        // @ts-ignore

        const u = new URLSearchParams({
            Address: "DB1045.DBX412.1",
            Type: 0,
            Value: true,
        }).toString()

        console.log(u)
        const result = await axios
            .post("http://127.0.0.1:6688/SiemensS7Net?" + u, {})
            .catch(function (error: any) {
                console.log(error)
            })
        // @ts-ignore

        if (result.data.value) {
            // @ts-ignore
            previous_barcode.value = '';
        }


    }

    const active_all_scanners = async () => {
        //激活扫码器
        await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM10&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
            .catch(function (error) { })
        await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM9&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
            .catch(function (error) { })
        await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM5&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
            .catch(function (error) { })
        await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM6&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
            .catch(function (error) { })
        await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=COM4&hexString=2B%202B%202B%202B%2046%2057%2043%204D%2053%204F%2052%2031%200D`, {})
            .catch(function (error) { })
    }
    return {
        //   变量

        //方法
        resetall,

        first_scanner_data,
        second_scanner_data,
        third_scanner_data,
        fourth_scanner_data,
        fifth_scanner_data,

        get_scanner_data,
        send_printer_data,

        system_logs,
        current_campre_loop_time,
        current_scanner_loop_time,
        plc_read_compare_ready,
        current_time_for_plc,
        not_allow_to_read,
        plc_read_prinnter_ready,
        plc_read_scanner_ready,

        scanner_first_set_read,
        checkFlowProtocal,
        workFlowProctocal,
        getScannerResult,
        aCodeToDCode,

        active_all_scanners

    } as const
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useScannerStore, import.meta.hot))
}
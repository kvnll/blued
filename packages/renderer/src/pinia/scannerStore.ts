import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref, watch, watchEffect } from 'vue'
// @ts-nocheck


// scanner
// COM10 = 第一个
// COM5 = 第二个
// COM4 = 第三个
// COM9 = 第四个
// COM6 = 第五个


export const useScannerStore = defineStore('scanner', () => {
    // @ts-nocheck

    const process_is_running = ref(false);

    const first_scanner_data = ref('');
    const second_scanner_data = ref('');
    const third_scanner_data = ref('');
    const fourth_scanner_data = ref('');
    const fifth_scanner_data = ref('');


    const system_logs = ref([]);
    const current_scanner_loop_time = ref();
    const current_campre_loop_time = ref();
    const current_time_for_plc = ref();


    // 开始扫码点位
    const plc_read_scanner_ready = ref(false);
    const plc_read_prinnter_ready = ref(false);
    const plc_read_compare_ready = ref(false);

    // 1,2 扫码 任意一个扫出来就算扫描成功
    // 3,4 打码
    // 3,4,5 比对, 3===4 || 3===5对比成功
    const get_scanner_data = async (position: number) => {
        let port;
        switch (position) {
            case 1:
                port = 'COM10';
                break;
            case 2:
                port = 'COM5';
                break;
            case 3:
                port = 'COM4';
                break;
            case 4:
                port = 'COM9';
                break;
            case 5:
                port = 'COM6';
                break;
            default:
                port = 'COM10';
                break;
        }

        const result = await getScannerResult(port)

        // @ts-ignore
        switch (position) {
            case 1:
                // @ts-ignore
                first_scanner_data.value = result

                break;
            case 2:
                // @ts-ignore
                second_scanner_data.value = result
                break;
            case 3:
                // @ts-ignore
                third_scanner_data.value = result
                break;
            case 4:
                // @ts-ignore
                fourth_scanner_data.value = result
                break;
            case 5:
                // @ts-ignore
                fifth_scanner_data.value = result
                break;
            default:
                break;
        }


    }

    const not_allow_to_read = async (ready: boolean) => {
        // @ts-ignore

        console.log("##########################%%%%%%%%%%%%%%%%%%%%%");
        // @ts-ignore

        const u = new URLSearchParams({
            Address: "DB1045.DBX397.7",
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



    // 发送打码数据 3, 4
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

    const compare_result_to_plc = async (res) => {
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

    // @ts-ignore

    const is_second_set_ok = async (res) => {
        console.log(res)
        // @ts-ignore

        const u = new URLSearchParams({
            Address: res == 1 ? "DB1045.DBX400.3" : "DB1045.DBX400.4",
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

        if (system_logs.value.length > 100) {
            system_logs.value = [];
        }
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
            await get_scanner_data(1)
            await get_scanner_data(2)
            // console.log("####开始读码2");
            await new Promise(resolve => setTimeout(resolve, 500));


            await get_scanner_data(1)
            await get_scanner_data(2)


            // @ts-ignore
            system_logs.value.push(`${current_campre_loop_time.value}读码器1数据  ${first_scanner_data.value}`)
            // @ts-ignore
            system_logs.value.push(`${current_campre_loop_time.value}读码器2数据  ${second_scanner_data.value}`)


            // 当两个码有数据
            if (first_scanner_data.value != '' || second_scanner_data.value != '') {
                scanner_first_set_callback('1')

                // @ts-ignore
                system_logs.value.push(`${current_campre_loop_time.value}#######扫码成功 ✅ 返回给plc`)

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


    // 对比
    const checkFlowProtocal = async () => {

        // @ts-ignore
        if (!checkprocess_is_running.value) {

            current_campre_loop_time.value = new Date().toLocaleString();


            // 开始打码

            console.log("#开始打码")

            const is_print_ready = await prinnter_first_set_read();

            if (is_print_ready) {

                // console.log("####开始读码第二组");
                await get_scanner_data(3)
                await get_scanner_data(4)
                // console.log("####开始读码2");
                await new Promise(resolve => setTimeout(resolve, 500));


                await get_scanner_data(3)
                await get_scanner_data(4)

                if (third_scanner_data.value != '' || fourth_scanner_data.value != '') {
                    await is_second_set_ok(1);

                    let current_scanner_set_data = third_scanner_data.value;
                    if (current_scanner_set_data == '') {
                        current_scanner_set_data = fourth_scanner_data.value;

                    }
                                    // @ts-ignore

                    system_logs.value.push(`${current_campre_loop_time.value}#######开始打码 ${current_scanner_set_data}`)

                    //开始打码
                    await send_printer_data(current_scanner_set_data)

                } else {
                                                        // @ts-ignore

                    system_logs.value.push(`${current_campre_loop_time.value}####### 打码失败`)

                    await is_second_set_ok(0);
                }




            }


            // 开始比对

            const is_a_ready = await check_a_all_set();
            const is_b_ready = await check_b_all_set();

            plc_read_compare_ready.value = is_a_ready && is_b_ready
            if (is_a_ready && is_b_ready && !checkprocess_is_running.value) {
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######开始扫码比对 ############################################ ${plc_read_compare_ready.value}`)

                checkprocess_is_running.value = true

                let check_result_bool = false
                await get_scanner_data(3);
                await get_scanner_data(4);
                await get_scanner_data(5);
                await new Promise(resolve => setTimeout(resolve, 1000));


                await get_scanner_data(3);
                await get_scanner_data(4);
                await get_scanner_data(5);

                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器3号扫码器  ${third_scanner_data.value}`)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器4号扫码器 👩🏻‍⚕️  ${fourth_scanner_data.value}`)
                // @ts-ignore

                system_logs.value.push(`${current_campre_loop_time.value}#######扫码器5号扫码器 👩🏻‍⚕️ ${fifth_scanner_data.value}`)


                if (third_scanner_data.value == fifth_scanner_data.value || fourth_scanner_data.value == fifth_scanner_data.value) {
                    check_result_bool = true

                }



                if (fifth_scanner_data.value == '') {
                    check_result_bool = false
                }



                // @ts-ignore

                if (check_result_bool) {
                    await compare_result_to_plc(1);
                    // @ts-ignore


                    system_logs.value.push(`${current_campre_loop_time.value}#######比对成功 ✅  返回给plc ##################################`)


                } else {
                    await compare_result_to_plc(0);
                    // @ts-ignore

                    system_logs.value.push(`${current_campre_loop_time.value}#######比对失败 ❌  返回给plc ##################################`)


                }

                await new Promise(resolve => setTimeout(resolve, 500));

                checkprocess_is_running.value = false

            }

        }

    }


    const getScannerResult = async (com: string) => {
        const result = await axios
            .get(`http://127.0.0.1:6688/SerialPort?portName=${com}&hexString=43%2044%204F%2050%2053%204D%2044%2032%200D`, {})
            .catch(function (error) { })
        // @ts-ignore
        if (result.status == 200) {

            // @ts-ignore
            let result_data = hex2a(result.data.value);
            if (result_data.length > 10) {
                result_data = result_data.substring(0, 10);
            }
            // @ts-ignore

            return result_data
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

        active_all_scanners

    } as const
})
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useScannerStore, import.meta.hot))
}
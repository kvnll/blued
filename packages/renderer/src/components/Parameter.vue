<script setup lang="ts">
</script>
<template>
 <div class="row">
    <div class="col-lg-12">
        <div class="card">
            <div class="card-body">
                <h4 class="card-title" style="font-size:20px">参数信息</h4>
                <div class="table-responsive" style="margin-top:30px">
                    <table class="table table-bordered mb-0" style="text-align:center">
                        <tbody>
                            <tr>
                                <th style="width:10%;" scope="row">参数1</th>
                                <td style="width:10%;" scope="row">染封级——就绪</td>
                                <th scope="row">参数1</th>
                                <td> 水箱温度</td>
                            </tr>
                            <tr>
                                <th style="width:10%;" scope="row">参数1</th>
                                <td>Jacob</td>
                                <th scope="row">参数2</th>
                                <td>@fat</td>
                            </tr>
                            <tr>
                                <th style="width:10%;" scope="row">参数1</th>
                                <td>Larry</td>
                                <th scope="row">参数3</th>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th style="width:10%;" scope="row">参数1</th>
                                <td>Larry</td>
                                <th scope="row">参数4</th>
                                <td>@twitter</td>
                            </tr>
                            <tr>
                                <th style="width:10%;" scope="row">参数1</th>
                                <td>Larry</td>
                                <th scope="row">参数5</th>
                                <td>@twitter</td>
                            </tr>
                            <tr v-for="i in [1,2,3,4,5]" :key="i">
                                <th style="width:10%;" scope="row">参数1</th>
                                <td style="width:40%;">Larry</td>
                                <th style="width:10%;" scope="row">参数6</th>
                                <td>@twitter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    </div>
</div>
</template>
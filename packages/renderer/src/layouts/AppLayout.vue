<script setup lang="ts">
import Header from "./partials/header.vue"
import Sider from "./partials/sider.vue"
</script>
<template>
  <div id="layout-wrapper ">
    <Sider></Sider>
    <div class="main-content">
      <div class="page-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useStorage } from "@vueuse/core";

const route = useRoute();
const router = useRouter();
const state = useStorage("user", {});
const onClick = () => {
  router.push({ name: "login" });
};
router.push({ name: "login" });
</script>
<template>
  <div class="my-5 pt-sm-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="text-center">
            <div>
              <div class="row justify-content-center">
                <div class="col-sm-4">
                  <div class="error-img">
                
                  </div>
                </div>
              </div>
            </div>
            <h4 class="text-uppercase mt-4">玄刃科技</h4>
            <p class="text-muted">
              It will be as simple as Occidental in fact, it will be Occidental
            </p>
            <div class="mt-5">
              <a
                @click="onClick"
                class="btn btn-primary waves-effect waves-light"
                >开始使用
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="">
    <Suspense>
      <RouterView v-slot="{ Component }">
        <component :is="Component" />
      </RouterView>
    </Suspense>
  </div>
</template>

<script setup lang="ts">
import { useScannerStore } from "./pinia/scannerStore";
import { useSystemInfoStore } from "./pinia/systemInfo";
const sysStore = useSystemInfoStore();

const userStore = useScannerStore();

userStore.workFlowProctocal();

userStore.checkFlowProtocal();

userStore.resetall();
userStore.not_allow_to_read(true);

sysStore.getPlcs();
setInterval(() => {
  // userStore.scanner_first_set_read();

  userStore.workFlowProctocal(); // 1 、2

  userStore.checkFlowProtocal(); // 3 、 4 、5

  userStore.resetall();
  
  sysStore.getPlcs();

}, 2400);
</script>

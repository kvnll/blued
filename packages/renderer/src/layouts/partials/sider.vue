<script setup lang="ts">
import { ref } from "vue"
import { useStore } from "../../pinia/store"
import { userStore } from "../../pinia/userStore"
const store = useStore()

const activeSidebar = ref("generate")
const elementMenuOpen = ref<boolean>(false)
const formsMenuOpen = ref<boolean>(false)
const tablesMenuOpen = ref<boolean>(false)
const iconsMenuOpen = ref<boolean>(false)
const mapMenuOpen = ref<boolean>(false)

const userStoreInstance = userStore();
</script>
<template>
  <div class="vertical-menu mm-active">
    <!-- LOGO -->
    <div class="navbar-brand-box">
      <a class="logo logo-dark">
        <span class="logo-lg" style="align-self: flex-end">
          <img
            src="../../assets/images/logo.png"
            alt=""
            style="margin-top: 20px"
            height="32"
          />
        </span>
      </a>
    </div>
    <div data-simplebar="init" class="sidebar-menu-scroll mm-show">
      <div class="simplebar-wrapper" style="margin: 10px">
        <div class="simplebar-height-auto-observer-wrapper">
          <div class="simplebar-height-auto-observer"></div>
        </div>
        <div class="simplebar-mask">
          <div class="simplebar-offset" style="right: -20px; bottom: 0px">
            <div
              class="simplebar-content-wrapper"
              style="
                height: 100%;
                padding-right: 20px;
                padding-bottom: 0px;
                overflow: hidden scroll;
              "
            >
              <div class="simplebar-content" style="padding: 0px">
                <!--- Sidemenu -->
                <div id="sidebar-menu" class="mm-active">
                  <ul class="metismenu list-unstyled mm-show" id="side-menu">
                    <li
                      :class="[activeSidebar === 'generate' && 'mm-active']"
                      @click="activeSidebar = 'generate'"
                    >
                      <router-link
                        :to="{ name: 'app-xuanren-generate' }"
                        class="waves-effect link-center p-4"
                      >
                        <i class="bx bx-home-circle"></i>
                        <span>生产窗口</span>
                      </router-link>
                    </li>
                    <li
                      :class="[activeSidebar === 'warning' && 'mm-active']"
                      @click="activeSidebar = 'warning'"
                    >
                      <router-link
                        :to="{ name: 'app-xuanren-warning' }"
                        class="waves-effect link-center p-4"
                      >
                        <i class="bx bx-error"></i>
                        <span>报警查询</span>
                      </router-link>
                    </li>
                    <li
                      :class="activeSidebar === 'equipment' && 'mm-active'"
                      @click="activeSidebar = 'equipment'"
                    >
                      <router-link
                        :to="{ name: 'app-xuanren-equipment' }"
                        class="waves-effect link-center p-4"
                        aria-expanded="false"
                      >
                        <i class="bx bx-lock-alt"></i>
                        <span>染封设备</span>
                      </router-link>
                    </li>

                    <li
                      :class="activeSidebar === 'configure' && 'mm-active'"
                                          v-if="userStoreInstance.isAdmin"

                      @click="activeSidebar = 'configure'"
                    >
                      <router-link
                        :to="{ name: 'app-xuanren-configure' }"
                        class="waves-effect link-center p-4"
                        aria-expanded="false"
                      >
                        <i class="bx bx-wrench"></i>
                        <span>调试界面</span>
                      </router-link>
                    </li>

                    <li
                    v-if="userStoreInstance.isAdmin"
                      :class="activeSidebar === 'serial' && 'mm-active'"
                      @click="activeSidebar = 'serial'"
                    >
                      <router-link
                        :to="{ name: 'app-xuanren-serial' }"
                        class="waves-effect link-center p-4"
                        aria-expanded="false"
                      >
                        <i class="bx bx-wrench"></i>
                        <span>串口调试</span>
                      </router-link>
                    </li>
                  </ul>
                </div>
                <!-- Sidebar -->
              </div>
            </div>
          </div>
        </div>
        <div
          class="simplebar-placeholder"
          style="width: auto; height: 960px"
        ></div>
      </div>
      <div
        class="simplebar-track simplebar-horizontal"
        style="visibility: hidden"
      >
        <div
          class="simplebar-scrollbar"
          style="transform: translate3d(0px, 0px, 0px); display: none"
        ></div>
      </div>
      <div
        class="simplebar-track simplebar-vertical"
        style="visibility: visible"
      >
        <div
          class="simplebar-scrollbar"
          style="
            height: 227px;
            transform: translate3d(0px, 0px, 0px);
            display: block;
          "
        ></div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.metismenu li {
  margin-top: 20px;
}
.link-center {
  font-size: 22px !important;

  .bx {
    font-size: 22px !important;
    margin-right: 5px;
  }
}
</style>

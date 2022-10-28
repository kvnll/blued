<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Modal from "@/components/Modal/Modal.vue";
import { userStore } from "../pinia/userStore";


const userStoreInstance = userStore();
const modalOpen = ref<boolean>(false);

const router = useRouter();
type User = {
  phone: string;
  password: string;
};
const user = ref<User>({
  phone: "",
  password: "",
});
const valify = computed(
  () => user.value.password === "admin" && user.value.phone === "admin"
);
const valifyuser = computed(
  () => user.value.password === "user" && user.value.phone === "user"
);

const login = () => {
  if (valify.value) {
    router.push({ name: "app-xuanren-generate" });
    userStoreInstance.setAdmin(true);
  } else if (valifyuser.value) {
        userStoreInstance.setAdmin(false);

    router.push({ name: "app-xuanren-generate" });

  } else {
    modalOpen.value = true;
  }
};
</script>
<template>
  <div class="account-pages my-5 pt-sm-5" style="margin-top: 15rem !important">
    <div class="container">
      <div class="row align-items-center justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-5">
          <div class="card">
            <div class="card-body p-4">
              <div class="text-center mt-2">
                <img
                  src="../assets/images/logo.png"
                  style="width: 200px"
                  alt="logo"
                />
                <h5 class="" style="font-weight: bold; margin-top: 40px">
                  玄刃科技 !
                </h5>
              </div>
              <div class="p-2 mt-4">
                <div class="mb-3 login-data">
                  <input
                    type="text"
                    class="form-control"
                    style="padding-left: 30px"
                    id="username"
                    placeholder="用户名"
                    v-model="user.phone"
                  />
                  <i class="bx bxs-user"></i>
                </div>
                <div class="mb-3 login-data">
                  <input
                    type="password"
                    class="form-control"
                    style="padding-left: 30px"
                    id="userpassword"
                    placeholder="密码"
                    v-model="user.password"
                  />
                  <i class="bx bxs-lock-alt"></i>
                </div>
                <div class="mt-3 text-center">
                  <button
                    class="btn btn-primary w-sm waves-effect waves-light"
                    @click="login"
                  >
                    开始登录
                  </button>
                </div>
                <div class="mt-4 text-center"></div>
                <div class="mt-4 text-center">
                  <p class="mb-0">
                    注册 /<a class="fw-medium text-primary"> 找回 </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal v-if="modalOpen" @close="modalOpen = !modalOpen" />
</template>

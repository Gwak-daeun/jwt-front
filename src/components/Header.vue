<template>
  <header>
    <div class="collapse bg-dark" id="navbarHeader">
      <div class="container">
        <div class="row">
          <div class="col-sm-4 py-4">
            <h4>사이트맵</h4>
            <ul class="list-unstyled">
              <li>
                <router-link class="text-white" to="/">메인화면</router-link>
              </li>

              <li v-if="$store.state.account.id">
                <router-link class="text-white" to="/orders"
                  >주문내역</router-link
                >
              </li>

              <li>
                <router-link
                  class="text-white"
                  to="/login"
                  v-if="!$store.state.account.id"
                  >로그인</router-link
                >
                <a class="text-white" to="/login" @click="logout()" v-else
                  >로그아웃</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="navbar navbar-dark bg-dark shadow-sm">
      <div class="container">
        <router-link to="/" class="navbar-brand d-flex align-items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            aria-hidden="true"
            class="me-2"
            viewBox="0 0 24 24"
          >
            <path
              d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
            />
            <circle cx="12" cy="13" r="4" />
          </svg>
          <strong>Gallery</strong>
        </router-link>
        <router-link to="/cart" class="cart btn" v-if="$store.state.account.id">
          <i class="fa fa-shopping-cart" aria-hidden="true"></i>
        </router-link>
        <!-- <router-link to="/admin" > -->
        <button class="btn btn-primary">관리자 페이지로 이동</button>
        <!-- </router-link> -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script>
import store from "@/scripts/store";
import router from "@/scripts/router";
import axios from "axios";

export default {
  name: "Header",
  setup() {
    const logout = () => {
      axios.post("/api/logout").then(() => {
        store.commit("setAccount", 0);
        router.push("/");
      });
    };

    // const goToAdmin = () => {
    //     axios.get("/api/page/admin").catch((err) =>

    //     console.log(err)
    //     );
    //   };
    return {
      logout,
      // goToAdmin,
    };
  },
};
</script>

<style scoped>
header .navbar .cart {
  margin-left: auto;
  color: white;
}
</style>

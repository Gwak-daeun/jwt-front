<template>
  <input />
</template>

<script>
import { onMounted } from "vue";

export default {
  setup() {
    onMounted(() => {
      // 간편로그인한 유저
      function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      }

      // 사용 예시
      const accessToken = getCookie("accessToken");
      const refreshToken = getCookie("refreshToken");
      const username = getCookie("username");
      const roles = getCookie("roles");

      if (accessToken !== undefined && accessToken.length !== 0) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (refreshToken !== undefined && refreshToken.length !== 0) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      if (username !== undefined && username.length !== 0) {
        localStorage.setItem("username", username);
      }
      if (roles !== undefined && roles.length !== 0) {
        localStorage.setItem("roles", roles);
      }

      //   localStorage.setItem("refreshToken", refreshToken);
      //   localStorage.setItem("username", username);
      //   localStorage.setItem("roles", roles);

      // 읽어온 쿠키 값들을 활용하여 원하는 작업 수행
      console.log("Access Token:", accessToken);
      console.log("Refresh Token:", refreshToken);
      console.log("Username:", username);
      console.log("roles:", roles);

      function expireCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      }

      expireCookie("accessToken");
      expireCookie("refreshToken");
      expireCookie("username");
      expireCookie("roles");
    });
  },
};
</script>

<style></style>

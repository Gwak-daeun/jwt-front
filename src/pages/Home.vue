<template>
  <div>
    <div class="album py-5 bg-body-tertiary">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
          <button @click="test()">테스트하기</button>
          <button @click="logout()">로그아웃</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Card from '../components/Card.vue';
import axios from "axios";
import { onMounted, reactive } from "vue";
import router from "@/scripts/router";

export default {
  name: "Home",
  components: {
    // Card
  },
  setup() {
    const state = reactive({
      items: [],
      errMsg: "",
    });

    // onMounted(() => {
    //   // 간편로그인한 유저
    //   function getCookie(name) {
    //     const value = `${document.cookie}`;
    //     console.log("쿠키값은?" + value);
    //     const parts = value.split(`; ${name}=`);
    //     if (parts.length === 2) return parts.pop().split(";").shift();
    //   }

    //   // 사용 예시
    //   const accessToken = getCookie("accessToken");
    //   const refreshToken = getCookie("refreshToken");
    //   const username = getCookie("username");
    //   const roles = getCookie("roles");

    //   if (accessToken.length != 0) {
    //     localStorage.setItem("accessToken", accessToken);
    //   }
    //   if (refreshToken.length != 0) {
    //     localStorage.setItem("refreshToken", refreshToken);
    //   }
    //   if (username.length != 0) {
    //     localStorage.setItem("username", username);
    //   }
    //   if (roles.length != 0) {
    //     localStorage.setItem("roles", roles);
    //   }

    //   // localStorage.setItem("refreshToken", refreshToken || "");
    //   // localStorage.setItem("username", username || "");
    //   // localStorage.setItem("roles", roles || "");

    //   // 읽어온 쿠키 값들을 활용하여 원하는 작업 수행
    //   console.log("Access Token:", accessToken);
    //   console.log("Refresh Token:", refreshToken);
    //   console.log("Username:", username);
    //   console.log("roles:", roles);

    //   function expireCookie(name) {
    //     document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    //   }

    //   expireCookie("accessToken");
    //   expireCookie("refreshToken");
    //   expireCookie("username");
    //   expireCookie("roles");
    // });

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

    //api 요청
    const test = () => {
      const accessToken = localStorage.getItem("accessToken");
      axios
        .get("http://localhost:8080/api/test", {
          headers: {
            Authorization: encodeURI(`Bearer ${accessToken}`),
            username: encodeURI(localStorage.getItem("username")),
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          if (err.response && err.response.data) {
            // 에러 응답이 있을 경우 에러 내용을 출력
            state.errMsg = err.response.data;
            console.log("에러 내용 : " + state.errMsg);

            if (state.errMsg === "please send refreshToken") {
              console.log("리프레시 토큰 요구하는 api수행");

              state.errMsg = "";

              requireRefreshToken();
            }
          } else {
            // 에러 응답이 없는 경우, 일반적인 에러 처리
            console.error("에러 발생:", err);
          }
        });
    };

    //리프레시 토큰 요청
    const requireRefreshToken = () => {
      const refreshToken = localStorage.getItem("refreshToken");

      axios
        .post("http://localhost:8080/api/requireRefreshToken", null, {
          headers: {
            AuthorizationRefresh: encodeURI(`Bearer ${refreshToken}123`),
            username: encodeURI(localStorage.getItem("username")),
          },
        })
        .then((res) => {
          console.log("리프레시 토큰으로 엑세스 토큰 재발급 성공!");
          console.log("액세스 토큰 : " + res.data.accessToken);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
        })
        .catch((err) => {
          console.log("엑세스 토큰 재발급 에러 : " + err);

          state.errMsg = err.response.data;
          console.log("에러 내용 : " + state.errMsg);

          if (state.errMsg === "login again") {
            localStorage.clear();
            alert("로그아웃 되었습니다.");
            router.push("/login");
          }
        });
    };

    const logout = () => {
      localStorage.clear();
      alert("로그아웃 되었습니다.");
    };

    return {
      state,
      test,
      requireRefreshToken,
      logout,
    };
  },
};
</script>

<style scoped></style>

<template>
  <div class="form-signin w-100 m-auto">
    <h1 class="h3 mb-3 fw-normal">Login</h1>

    <div class="form-floating">
      <input
        type="username"
        class="form-control"
        id="floatingInput"
        placeholder="name@example.com"
        v-model="state.form.username"
      />
      <label for="floatingInput">Username</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control"
        id="floatingPassword"
        placeholder="Password"
        v-model="state.form.password"
      />
      <label for="floatingPassword">Password</label>
    </div>

    <div class="form-check text-start my-3">
      <input
        class="form-check-input"
        type="checkbox"
        value="remember-me"
        id="flexCheckDefault"
      />
      <label class="form-check-label" for="flexCheckDefault">
        Remember me
      </label>
    </div>
    <button class="btn btn-primary w-100 py-2" @click="login()">로그인</button>
    <button @click="oauthLoigin()">구글 로그인</button>
    <a href="http://localhost:8080/oauth2/authorization/google">
      <button>a태그 구글 로그인</button>
    </a>
    <a href="http://localhost:8080/oauth2/authorization/naver">
      <button>네이버 로그인</button>
    </a>
    <a href="http://localhost:8080/oauth2/authorization/kakao">
      <button>카카오 로그인</button>
    </a>
    <!-- <button @click="get()">헤더값 받아오기</button> -->
    <p class="mt-5 mb-3 text-body-secondary">&copy; 2017–2023</p>
  </div>
</template>

<script>
import { reactive } from "vue";
import axios from "axios";
import store from "@/scripts/store";
import router from "@/scripts/router";
export default {
  setup() {
    const state = reactive({
      form: {
        username: "",
        password: "",
      },
    });

    const login = () => {
      console.log("로그인 요청");
      axios
        .post("http://localhost:8080/api/login", state.form)
        .then((res) => {
          console.log("로그인 완료");

          console.log(res.data);

          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          const username = res.data.username;
          const roles = res.data.roles;

          // console.log("응답 : " + JSON.stringify (res));
          console.log("엑세스 토큰: " + res.data.accessToken);
          console.log("리프레시 토큰: " + res.data.refreshToken);
          console.log("유저네임: " + res.data.username);
          console.log("역할 : " + res.data.roles);

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);
          localStorage.setItem("username", username);
          localStorage.setItem("roles", roles);

          function expireCookie(name) {
            document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
          }

          expireCookie("accessToken");
          expireCookie("refreshToken");
          expireCookie("username");

          router.push(res.data.redirectPage);
        })
        .catch((err) => {
          console.log(err);
          window.alert("로그인 정보가 존재하지 않습니다.");
        });
    };

    const oauthLoigin = () => {
      axios
        .get("http://localhost:8080/oauth2/authorization/google")
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    };

    return {
      state,
      // submit,
      oauthLoigin,
      login,
      // get,
    };
  },
};
</script>

<style scoped>
.form-signin {
  max-width: 330px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>

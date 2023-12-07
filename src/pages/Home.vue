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
import axios from 'axios';
import { reactive } from 'vue';
import router from '@/scripts/router';

    export default {
        name: 'Home',
        components: {
            // Card
        },
        setup() {
          const state = reactive({
            items: [],
            errMsg: ''
          })

          const accessToken = localStorage.getItem("accessToken");
          console.log("엑세스 토큰 : " + accessToken);

          //api 요청
          const test = () => {
              axios.get("/api/test", {
                  headers: {
                    Authorization: `Bearer ${accessToken}123`,
                    'username': localStorage.getItem('username')
                  }
              })
              .then((res) => 
                console.log(res)
              )
              .catch((err) => { 
                state.errMsg = err.response.data;
                console.log("에러 내용 : " + state.errMsg);

                if(state.errMsg === 'please send refreshToken'){

                console.log("리프레시 토큰 요구하는 api수행");
                
                state.errMsg = '';

                requireRefreshToken();
                }
              });
          };


          //리프레시 토큰 요청
          const requireRefreshToken = () => {
            
            const refreshToken = localStorage.getItem('accessToken');

              axios.post("/api/requireRefreshToken", null, {
                
                headers: {
                  AuthorizationRefresh: `Bearer ${refreshToken}123` ,
                  'username': localStorage.getItem('username')
                }
              })
              .then((res) => {
                console.log("리프레시 토큰으로 엑세스 토큰 재발급 성공!");
                console.log("액세스 토큰 : " + res.data.accessToken);
                localStorage.setItem("accessToken", res.data.accessToken);
                localStorage.setItem("refreshToken", res.data.refreshToken);
                
              })
              .catch((err) => {
                console.log("엑세스 토큰 재발급 에러 : " + err)

                state.errMsg = err.response.data;
                console.log("에러 내용 : " + state.errMsg);

                if(state.errMsg === 'login again'){
                    localStorage.clear();
                    alert("로그아웃 되었습니다.");
                    router.push("/login");

                }

              })
          };


          const logout = () => {
            localStorage.clear();
            alert("로그아웃 되었습니다.");
          };

        
          return {
            state,
            test,
            requireRefreshToken
          };
        }
    }
</script>

<style scoped>
</style>
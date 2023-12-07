<template>
  <input />
</template>

<script>
export default {
    setup() {

        //간편로그인한 유저 
        function getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(';').shift();
        }   

        // 사용 예시
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        const username = getCookie('username');

        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);


        // 읽어온 쿠키 값들을 활용하여 원하는 작업 수행
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        console.log('Username:', username);

        // 만일 값이 없을 경우 기본값 설정
        // const defaultAccessToken = accessToken || 'default-access-token';
        // const defaultRefreshToken = refreshToken || 'default-refresh-token';
        // const defaultUsername = username || 'default-username';
    }
}
</script>

<style>

</style>
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import Orders from '../pages/Orders';
import Admin from '../pages/Admin';
import AdditionalInfo from '../pages/AdditionalInfo';
import UnAuthorized from '../pages/UnAuthorized';

const routes = [
    {path: '/', component: Home, meta: {requiresAuth: false}},
    {path: '/login', component: Login},
    {path: '/signUp', component: SignUp},
    {path: '/cart', component: Cart, meta: {requiresAuth: true}},
    {path: '/orders', component: Orders},
    {path: '/admin', component: Admin, meta: {requireAdmin: true}},
    {path: '/order', component: Order},
    {path: '/additionalInfo', component: AdditionalInfo},
    {path: '/unauthorized', component: UnAuthorized},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {

    const userRole = localStorage.getItem("roles");


    console.log("유저 권한? : " + userRole);

    if(to.meta.requiresAuth) {
        
        if(userRole.includes('ROLE_USER')) {
            console.log("여기111111");
            next();
        } else {
            console.log("로그인을 해주세요.")
            next("/unauthorized");
        }  
    }
 

     if(to.meta.requireAdmin) {
            if(userRole.includes('ROLE_ADMIN')){
                next();
            } else {
                console.log("관리자만 접근 가능");
                next("/unauthorized");
            }
     }
     else {
        //requiresAuth 메타 필드가 없는 경우에는 다음 라우트로 이동
       next();
     }

});

export default router;
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import Orders from '../pages/Orders';
import Admin from '../pages/Admin';
import AdditionalInfo from '../pages/AdditionalInfo';

const routes = [
    {path: '/', component: Home},
    {path: '/login', component: Login},
    {path: '/signUp', component: SignUp},
    {path: '/cart', component: Cart},
    {path: '/orders', component: Orders},
    {path: '/admin', component: Admin},
    {path: '/order', component: Order},
    {path: '/additionalInfo', component: AdditionalInfo}
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
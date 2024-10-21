import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import AccountPage from "../components/AccountPage.vue";

const routes = [
    { path: '/', component: Auth },
    { path: '/home', component: Home },
    { path: '/accounts', component: AccountPage },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
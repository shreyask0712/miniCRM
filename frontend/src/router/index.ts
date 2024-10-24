import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
import AccountPage from "../components/AccountPage.vue";
import ContactPage from "../components/ContactPage.vue";
import OpportunityPage from "../components/OpportunityPage.vue";

const routes = [
    { path: '/', component: Auth },
    { path: '/home', component: Home },
    { path: '/accounts', component: AccountPage },
    { path: '/contacts', component: ContactPage},
    { path: '/opportunities', component: OpportunityPage},
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
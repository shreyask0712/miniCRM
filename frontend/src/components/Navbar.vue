<template>
    <div class="navbar">
        <h1>My CRM</h1>
        <div class="menu">
            <router-link to="/accounts">Accounts</router-link>
            <router-link to="/contacts">Contacts</router-link>
            <router-link to="/opportunities">Opportunities</router-link>
            <UserMenu :user="currentUser" @logout="logout" />
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import UserMenu from './UserMenu.vue';

export default {
    components: {
        UserMenu
    },
    setup() {
        const currentUser = ref<string | undefined>(localStorage.getItem('currentUser') || undefined);

    const logout = () => {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('sessionId');
      localStorage.removeItem('serverUrl');
      location.reload();
    };

    return { currentUser, logout };
    }
};
</script>
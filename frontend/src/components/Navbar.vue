<template>
    <div class="navbar">
        <div class="title">
            <h1>My CRM</h1>
        </div>
        <div class="menu">
            
            <router-link to="/accounts">Accounts</router-link>
            <router-link to="/contacts">Contacts</router-link>
            <router-link to="/opportunities">Opportunities</router-link>
            
            <div class="name">
                <UserMenu :user="currentUser" @logout="logout" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import UserMenu from './UserMenu.vue';
import router from '../router';

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
      router.push('/');
    };

    return { currentUser, logout };
    }
};
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  justify-content: space-between; 
  align-items: center; 
  padding: 10px 20px;
  position: fixed;
  width:100%;
  top: 0;
  left: 0;
  background-color: aliceblue;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.1);
}

.menu {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    flex-direction: row;
    align-items: center;
}

.menu a {
    margin-right:20px;
    font-size: 20px;
}


</style>
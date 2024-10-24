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
                <Button type="button" icon="pi pi-user" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu" />
                <Menu ref="menuRef" :model="items" :popup="true" id="overlay_menu"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import router from '../router';
import Menu from 'primevue/menu';
import Button from 'primevue/button';
export default {
    components: {
        Menu,
        Button
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

        const items = ref([
            {
                label: currentUser.value,
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        command: logout 
                    }
                ]
            }
        ]);

        // Define the type of menuRef as Menu | null
        const menuRef = ref<InstanceType<typeof Menu> | null>(null);
        
        // Toggle function for opening the menu
        const toggle = (event: Event) => {
            menuRef.value?.toggle(event);
        };

        return { currentUser, logout, items, toggle, menuRef };
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
  width: 100%;
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
    margin-right: 20px;
    font-size: 20px;
}

.name {
    position: relative;
}

</style>

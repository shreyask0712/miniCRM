<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" class="navbar" />
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Navbar from './components/Navbar.vue';


export default defineComponent({
  components: {
    Navbar,
  },
  setup() {
    const isLoggedIn = ref(!!localStorage.getItem('currentUser'));

    return { isLoggedIn };
  },
});
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.navbar {
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  height: 110px; 
  z-index: 1000; 
  background-color: #1f6d94;
}

.content {
  margin-top: 60px; 
  padding: 20px; 
}
</style>

<template>
  <div id="app">
    <Navbar v-if="isLoggedIn" />
    <router-view />
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

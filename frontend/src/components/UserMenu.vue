<template>
    <div class="user-menu">
      <span>{{ user ? user : 'Guest' }}</span>
      <div v-if="user" class="dropdown">
        <button @click="logout">Logout</button>
      </div>
      <div v-else>
        <router-link to="/">Login / Register</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      user: String,
    },
    methods: {
      logout() {
        this.$emit('logout');
      },
    },
  });
  </script>
  
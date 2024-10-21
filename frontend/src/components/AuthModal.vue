<template>
    <div class="auth-modal">
        <h2 v-if="isLogin">Login</h2>
    <h2 v-else>Register</h2>
    <form @submit.prevent="submitForm">
      <input v-model="username" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      <button type="button" @click="toggleMode">{{ isLogin ? 'Switch to Register' : 'Switch to Login' }}</button>
    </form>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';

export default defineComponent({
  setup(props, { emit }) {
    const username = ref('');
    const password = ref('');
    const isLogin = ref(true);
    
    const toggleMode = () => {
      isLogin.value = !isLogin.value;
    };

    const submitForm = () => {
      const userData = { username: username.value, password: password.value };
      if (isLogin.value) {
        emit('login', userData);
      } else {
        emit('register', userData);
      }
    };

    return { username, password, isLogin, toggleMode, submitForm };
  },
});
</script>
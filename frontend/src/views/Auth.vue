<template>
  <div class="auth">
    <p-dialog v-model:visible="displayModal" :header="modalHeader" modal>
      <div class="p-fluid">
        <div class="p-field">
          <label for="username">Username</label>
          <InputText v-model="userData.username" id="username" placeholder="Enter your username" />
        </div>
        <div class="p-field">
          <label for="password">Password</label>
          <InputText v-model="userData.password" id="password" type="password" placeholder="Enter your password" />
        </div>
      </div>

      <div class="p-d-flex p-jc-between p-mt-3">
        <Button label="Login" icon="pi pi-sign-in" class="p-button-success" @click="handleLogin" />
        <Button label="Register" icon="pi pi-user-plus" class="p-button-secondary" @click="handleRegister" />
      </div>

      <p-message v-if="message" severity="error" :text="message"></p-message>
    </p-dialog>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import axios from 'axios';



import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Message from 'primevue/message';
import InputText from 'primevue/inputtext';



export default {
  components: {
    InputText,
    Button,
    Dialog,
    Message,
  },
  setup() {
    const router = useRouter();
    const displayModal = ref(true);
    const modalHeader = ref('Login / Register');
    const userData = ref({ username: '', password: '' });
    const message = ref('');

    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login', userData.value);
        localStorage.setItem('currentUser', response.data.username);
        localStorage.setItem('sessionId', response.data.sessionId);
        localStorage.setItem('serverUrl', response.data.serverUrl);
        router.push('/home');
      } catch (error) {
        message.value = 'Login failed. Please try again.';
      }
    };

    const handleRegister = async () => {
      try {
        const response = await axios.post('http://localhost:3000/auth/register', userData.value);
        if (response.data.message === 'User registered successfully') {
          message.value = 'Registration successful! You can log in now.';
        } else {
          message.value = 'Registration failed: ' + (response.data.error || 'Unknown error');
        }
      } catch (error) {
        message.value = 'Registration failed';
      }
    };

    return {
      displayModal,
      modalHeader,
      userData,
      handleLogin,
      handleRegister,
      message,
    };
  },
};
</script>

<style lang="css" scoped>
 .p-field {
    margin-bottom: 1rem; /* Adjust the value as needed */
  }

  .p-field label {
    display: block;
    margin-bottom: 0.5rem; /* Space between label and input */
  }
</style>
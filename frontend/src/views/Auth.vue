<template>
    <div class="auth">
      <AuthModal @login="handleLogin" @register="handleRegister" />
    </div>
  </template>
  
  <script lang="ts">
  import { useRouter } from 'vue-router'; 
  import axios from 'axios';
  import AuthModal from '../components/AuthModal.vue';
  
  export default {
    components: {
      AuthModal,
    },
    setup() {
      const router = useRouter(); 
  
      const handleLogin = async (userData: { username: string; password: string }) => {
        try {
          const response = await axios.post('http://localhost:3000/auth/login', userData);
          localStorage.setItem('currentUser', response.data.username);
          localStorage.setItem('sessionId', response.data.sessionId);
          localStorage.setItem('serverUrl', response.data.serverUrl);
          router.push('/home'); 
        } catch (error) {
          alert('Login failed: ');
        }
      };
  
      const handleRegister = async (userData: { username: string; password: string }) => {
        try {
          const response = await axios.post('http://localhost:3000/auth/register', userData);
          if (response.data.message === 'User registered successfully') {
            alert('Registration successful! You can log in now.');
          } else {
            alert('Registration failed: ' + (response.data.error || 'Unknown error'));
          }
        } catch (error) {
          alert('Registration failed');
        }
      };
  
      return {
        handleLogin,
        handleRegister,
      };
    },
  };
  </script>
  
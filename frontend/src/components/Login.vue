<template>
    <div class="login-form">
        <h2>Login</h2>
        <InputText v-model="credentials.username" placeholder="Username"/>        
        <InputText v-model="credentials.password" placeholder="Password"/>
        <Button label="Login" @click="login"/>        
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import {useRouter } from 'vue-router';

export default defineComponent({
    name:'Login',
    setup(){
        const router = useRouter();
        const credentials = reactive({
            username: '',
            password: ''
        });

        const login = async() => {
            try {
                const response = await fetch('https://localhost:3000/auth/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(credentials)
                });

                if (!response.ok) throw new Error('Login failed!');
                const result = await response.json();
                console.log('Session:', result.sessionId);
                router.push({name: 'Accounts'});
            } catch(err) {
                console.log('Login Error: ', err);
            }
        };
        return {credentials, login};
    }
})
</script>
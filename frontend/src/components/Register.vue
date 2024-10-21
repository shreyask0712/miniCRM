<template>
    <div class="register-form">
        <h2>Register</h2>
        <InputText v-model="user.username" placeholder="Username"/>
        <InputText v-model="user.password" placeholder="Password" type="password"/>
        <Button label="Register" @click="register"/>
    </div> 
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    name:'Register',
    setup(){
        const router = useRouter();
        const user = reactive({
            username:'',
            password:''
        });

        const register = async() => {
            try {
                const response = await fetch('https://localhost:3000/auth/register', {
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(user)
                });

                if (!response.ok) throw new Error('Registration fail!');
                console.log("Successfully registered!");
                router.push({name: 'Login'});
            } catch (err) {
                console.log('Register Error: ', err);
            }
        }

        return {user,register};
    }
})
</script>
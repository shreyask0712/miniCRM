<template>
    <div class="create-account-form">
        <h2>Create Account</h2>
        <InputText v-model="account.name" placeholder="Account Name"/>
        <InputText v-model="account.BillingStreet" placeholder="STreet"/>
        <InputText v-model="account.BillingCity" placeholder="City"/>
        <InputText v-model="account.BillingState" placeholder="Account State"/>
        <InputText v-model="account.BillingPostalCode" placeholder="Postal Code"/>
        <InputText v-model="account.Url" placeholder="URL"/>
        <Button label="Create" @click="createAccount"/>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';

export default defineComponent({
    name: 'CreateAccount',
    setup() {
        const account = reactive({
            name: '',
            BillingState: '',
            BillingCity: '',
            BillingStreet: '',
            BillingPostalCode: '',
            Url: '',
        });

        const createAccount = async () => {
            try {
                const response = await fetch('https://localhost:3000/accounts/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(account)
                });

                if (!response.ok) throw new Error('Account creation failed!');
                console.log('Account created successfully');
            } catch (err) {
                console.log('Create Account Error: ', err);
            }
        };
        return { account, createAccount };
    }
})
</script>
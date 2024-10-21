<template>
    <div>
        <p-menubar :model="items"></p-menubar>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent ({
        setup() {
            const items=[
                {
                    label: 'Accounts',
                    items:[
                        {label:'List Accounts', to:'/accounts'},
                        {label: 'Create Account', to:'/accounts/create'}
                    ]
                },
                {
                    label: 'Contacts',
                    items: [
                        { label: 'List Contacts', to: '/contacts' },
                        { label: 'Create Contact', to: '/contacts/create' },
                    ],
                },
                {
                    label: 'Opportunities',
                    items: [
                        { label: 'List Opportunities', to: '/opportunities' },
                        { label: 'Create Opportunity', to: '/opportunities/create' },
                    ],
                },
                {
                    label: 'User',
                    items: [
                        { label: 'Login', to: '/login' },
                        { label: 'Register', to: '/register' },
                    ],
                }
            ];
            return {items};
        }
    })
</script>
<template>
    <div>
        <h2>Accounts</h2>
        <button @click="showCreateModal">Create Account</button>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Billing City</th>
                    <th>Billing Street</th>
                    <th>Billing State</th>
                    <th>Billing Postal Code</th>
                    <th>Website</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="account in accounts" :key="account.Id">
                    <td>{{ account.Name }}</td>
                    <td>{{ account.BillingCity }}</td>
                    <td>{{ account.BillingStreet }}</td>
                    <td>{{ account.BillingState }}</td>
                    <td>{{ account.BillingPostalCode }}</td>
                    <td>{{ account.Website }}</td>
                    <td>
                        <button @click="showEditModal(account)">Edit</button>
                        <button @click="deleteAccounts(account.Id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    
        
        <AccountModal
          :isVisible="showModal"
          :selectedAccount="selectedAccount"
          @close="showModal = false"
          @save="saveAccount"
        />
    </div>
    </template>
    
    <script lang="ts">
    import { onMounted, ref } from 'vue';
    import AccountModal from './AccountModal.vue';
    
    interface Account {
        Id: string;
      Name: string;
      BillingStreet?: string;
      BillingCity?: string;
      BillingState?: string;
      BillingPostalCode?: string;
      Website?: string;
    }
    
    export default {
        components: {
            AccountModal
        },
        setup() {
            const accounts = ref<Account[]>([]);
            const showModal = ref(false);
            const selectedAccount = ref<Account | null>(null);
    
            const fetchAccounts = async() => {
                try {
                    const response = await fetch('http://localhost:3000/accounts/list', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionId: localStorage.getItem('sessionId'),
                            serverUrl: localStorage.getItem('serverUrl'),
                        })
                    });
    
                    if (response.ok) {
                        const data = await response.json();
                        accounts.value = data;
                    } else {
                        console.error('Failed to fetch accounts');
                    }
                } catch (err) {
                    console.error('Error fetching accounts:', err);
                }
            }
    
            const deleteAccounts = async(accountId: string) => {
                try {
                    const response = await fetch(`http://localhost:3000/accounts/delete/${accountId}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionId:localStorage.getItem('sessionId'),
                            serverUrl:localStorage.getItem('serverUrl')
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Error: ${response.status}`);
                    }
    
                    fetchAccounts();
                } catch (err) {
                    console.log("Error: ",err);
                }
            }
    
            const showCreateModal = () => {
                selectedAccount.value = null;
                showModal.value = true;
            }
    
            const showEditModal = (account: Account) => {
                selectedAccount.value = account;
                showModal.value = true;
            }
    
            const saveAccount = async(accountData: Account) => {
                const url = accountData.Id ? `http://localhost:3000/accounts/update/${accountData.Id}` : 'http://localhost:3000/accounts/create';
                const method = 'POST';
    
                try {
                    const response = await fetch(url, {
                        method,
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            sessionId: localStorage.getItem('sessionId'),
                            serverUrl: localStorage.getItem('serverUrl'),
                            account: accountData
                        })
                    });
    
                    if (!response.ok) {
                        throw new Error('Failed to save account');
                    }
    
                    fetchAccounts();
                    showModal.value = false;
                } catch (err) {
                    console.error('Error saving account:', err);
                }
            }
    
            onMounted(() => {
                fetchAccounts();
            });
    
            return {
                accounts,
                fetchAccounts,
                deleteAccounts,
                showCreateModal,
                showEditModal,
                saveAccount,
                selectedAccount,
                showModal
            }
        }
    }
    </script>
    
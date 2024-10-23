<template>
    <div>
      <h2>Accounts</h2>
      
      
      <Button label="Create Account" icon="pi pi-plus" @click="showCreateModal" class="p-button-success mb-3" />
      
      
      <DataTable :value="accounts" responsiveLayout="scroll">
        <Column field="Name" header="Name"></Column>
        <Column field="BillingCity" header="Billing City"></Column>
        <Column field="BillingStreet" header="Billing Street"></Column>
        <Column field="BillingState" header="Billing State"></Column>
        <Column field="BillingPostalCode" header="Billing Postal Code"></Column>
        <Column field="Website" header="Website"></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-warning mr-2" 
              @click="showEditModal(slotProps.data)" 
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-danger" 
              @click="deleteAccounts(slotProps.data.Id)" 
            />
          </template>
        </Column>
      </DataTable>
  

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
  
  
  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
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
      AccountModal,
      Button, 
      DataTable, 
      Column, 
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
            
            if (data) {
              const body = JSON.parse(data.body);
              accounts.value = body.records.map((record : any) => ({
                Id: record.Id,
                Name: record.Name,
                BillingStreet: record.BillingStreet || '',
                BillingCity: record.BillingCity || '',
                BillingState: record.BillingState || '',
                BillingPostalCode: record.BillingPostalCode || '',
                Website: record.Website || '',
              }));
            }
          } else {
            console.error('Failed to fetch accounts');
          }
        } catch (err) {
          console.error('Error fetching accounts:', err);
        }
      };
  
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
          console.log("Error: ", err);
        }
      };
  
      const showCreateModal = () => {
        selectedAccount.value = null;
        showModal.value = true;
      };
  
      const showEditModal = (account: Account) => {
        selectedAccount.value = account;
        showModal.value = true;
      };
  
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
      };
  
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
      };
    }
  };
  </script>
  
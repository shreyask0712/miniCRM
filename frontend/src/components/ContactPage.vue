<template>
    <div>
      <h2>Contacts</h2>
      
      <Button label="Create Contact" icon="pi pi-plus" class="p-button-success mb-2" @click="showCreateModal" />
  
      <DataTable :value="contacts" responsiveLayout="scroll">
        <Column field="FirstName" header="First Name" />
        <Column field="LastName" header="Last Name" />
        <Column field="Email" header="Email" />
        <Column field="AccountId" header="Account ID" />
  
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
              @click="deleteContacts(slotProps.data.Id)" 
            />
          </template>
        </Column>
      </DataTable>
  
      <ContactModal 
        :isVisible="showModal" 
        :selectedContact="selectedContact" 
        @close="showModal = false" 
        @save="saveContact" 
      />
    </div>
  </template>
  

  <script lang="ts">
  import { onMounted, ref } from 'vue';
  import ContactModal from './ContactModal.vue';
  import  Button  from 'primevue/button';
  import  DataTable  from 'primevue/datatable';
  import  Column  from 'primevue/column';
  
  interface Contact {
    Id: string;
    FirstName: string;
    LastName: string;
    Email: string;
    AccountId: string;
  }
  
  export default {
    components: {
      ContactModal,
      DataTable,
      Column,
      Button
    },
    setup() {
      const contacts = ref<Contact[]>([]);
      const showModal = ref(false);
      const selectedContact = ref<Contact | null>(null);
  
      const fetchContacts = async () => {
        try {
          const response = await fetch('http://localhost:3000/contacts/list', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: localStorage.getItem('sessionId'),
              serverUrl: localStorage.getItem('serverUrl'),
            }),
          });
  
          if (response.ok) {
            const data = await response.json();
            const body = JSON.parse(data.body);
  
            contacts.value = body.records.map((record: any) => ({
              Id: record.Id,
              FirstName: record.FirstName,
              LastName: record.LastName,
              Email: record.Email || '',
              AccountId: record.AccountId || '',
            }));
          } else {
            console.error('Failed to fetch contacts');
          }
        } catch (err) {
          console.error('Error fetching contacts: ', err);
        }
      };
  
      const deleteContacts = async (contactId: string) => {
        try {
          const response = await fetch(`http://localhost:3000/contacts/delete/${contactId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: localStorage.getItem('sessionId'),
              serverUrl: localStorage.getItem('serverUrl'),
            }),
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          fetchContacts();
        } catch (err) {
          console.log('Error: ', err);
        }
      };
  
      const showCreateModal = () => {
        selectedContact.value = null;
        showModal.value = true;
      };
  
      const showEditModal = (contact: Contact) => {
        selectedContact.value = contact;
        showModal.value = true;
      };
  
      const saveContact = async (contactData: Contact) => {
        const url = contactData.Id ? `http://localhost:3000/contacts/update/${contactData.Id}` : `http://localhost:3000/contacts/create`;
        const method = 'POST';
  
        try {
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sessionId: localStorage.getItem('sessionId'),
              serverUrl: localStorage.getItem('serverUrl'),
              contact: contactData,
            }),
          });
  
          if (!response.ok) {
            throw new Error('Failed to save contact');
          }
  
          fetchContacts();
          showModal.value = false;
        } catch (err) {
          console.error('Error saving contact: ', err);
        }
      };
  
      onMounted(() => {
        fetchContacts();
      });
  
      return {
        contacts,
        fetchContacts,
        deleteContacts,
        showCreateModal,
        showEditModal,
        saveContact,
        selectedContact,
        showModal,
      };
    },
  };
  </script>
  
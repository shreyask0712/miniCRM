<template>
    <Dialog :visible="isVisible" modal :header="selectedContact ? 'Edit Contact' : 'Create Contact'" @hide="closeModal" style="width: 450px">
      <form @submit.prevent="submitForm" class="p-fluid">
        <div class="p-field">
          <label for="firstName">First Name:</label>
          <InputText v-model="form.firstName" id="firstName" required placeholder="Enter first name" />
        </div>
        <div class="p-field">
          <label for="lastName">Last Name:</label>
          <InputText v-model="form.lastName" id="lastName" required placeholder="Enter last name" />
        </div>
        <div class="p-field">
          <label for="email">Email:</label>
          <InputText v-model="form.email" id="email" type="email" placeholder="Enter email" />
        </div>
        <div class="p-field">
          <label for="accountId">Account ID:</label>
          <InputText v-model="form.accountId" id="accountId" required placeholder="Enter account ID" />
        </div>
        <div class="p-dialog-footer">
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeModal" />
          <Button label="Submit" icon="pi pi-check" type="submit" class="p-button" />
        </div>
      </form>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  
  const { selectedContact, isVisible } = defineProps({
    selectedContact: {
      type: Object as () => null | {
        Id: string,
        FirstName?: string,
        LastName?: string,
        Email?: string,
        AccountId?: string
      },
      default: null,
    },
    isVisible: {
      type: Boolean,
      required: true,
    }
  });
  
  const emit = defineEmits(['close', 'save']);
  
  const form = ref({
    firstName: '',
    lastName: '',
    email: '',
    accountId: ''
  });
  
  const initializeForm = () => {
    if (selectedContact) {
      form.value = {
        firstName: selectedContact.FirstName || '',
        lastName: selectedContact.LastName || '',
        email: selectedContact.Email || '',
        accountId: selectedContact.AccountId || ''
      };
    } else {
      form.value = {
        firstName: '',
        lastName: '',
        email: '',
        accountId: ''
      };
    }
  };
  
  const closeModal = () => {
    emit('close');
  };
  
  const submitForm = () => {
    const contactData = {
      FirstName: form.value.firstName,
      LastName: form.value.lastName,
      Email: form.value.email,
      AccountId: form.value.accountId,
      Id: selectedContact?.Id || undefined,
    };
    emit('save', contactData);
    closeModal();
  };
  
  watch(() => selectedContact, initializeForm);
  watch(() => isVisible, initializeForm);
  </script>
  
  <style scoped>
  .p-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  </style>
  
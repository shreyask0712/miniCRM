<template>
    <Dialog :visible="isVisible" modal :header="selectedAccount ? 'Edit Account' : 'Create Account'" @hide="closeModal" style="width: 450px">
      <form @submit.prevent="submitForm" class="p-fluid">
        <div class="p-field">
          <label for="name">Name:</label>
          <InputText v-model="form.name" id="name" required placeholder="Enter account name"/>
        </div>
        <div class="p-field">
          <label for="billingCity">Billing City:</label>
          <InputText v-model="form.billingCity" id="billingCity" placeholder="Enter billing city"/>
        </div>
        <div class="p-field">
          <label for="billingStreet">Billing Street:</label>
          <InputText v-model="form.billingStreet" id="billingStreet" placeholder="Enter billing street"/>
        </div>
        <div class="p-field">
          <label for="billingState">Billing State:</label>
          <InputText v-model="form.billingState" id="billingState" placeholder="Enter billing state"/>
        </div>
        <div class="p-field">
          <label for="billingPostalCode">Billing Postal Code:</label>
          <InputText v-model="form.billingPostalCode" id="billingPostalCode" placeholder="Enter postal code"/>
        </div>
        <div class="p-field">
          <label for="website">Website:</label>
          <InputText v-model="form.Url" id="url" type="url" placeholder="Enter website"/>
        </div>
        <div class="p-dialog-footer">
          <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="closeModal"/>
          <Button label="Submit" icon="pi pi-check" type="submit" class="p-button"/>
        </div>
      </form>
    </Dialog>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import InputText from 'primevue/inputtext';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  
  const { selectedAccount, isVisible } = defineProps({
    selectedAccount: {
      type: Object as () => null | {
        Id: string,
        Name: string,
        BillingCity?: string,
        BillingStreet?: string,
        BillingState?: string,
        BillingPostalCode?: string,
        Url?: string,
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
    name: '',
    billingCity: '',
    billingStreet: '',
    billingState: '',
    billingPostalCode: '',
    Url: ''
  });
  
  const initializeForm = () => {
    if (selectedAccount) {
      form.value = {
        name: selectedAccount.Name,
        billingCity: selectedAccount.BillingCity || '',
        billingStreet: selectedAccount.BillingStreet || '',
        billingState: selectedAccount.BillingState || '',
        billingPostalCode: selectedAccount.BillingPostalCode || '',
        Url: selectedAccount.Url || ''
      };
    } else {
      form.value = {
        name: '',
        billingCity: '',
        billingStreet: '',
        billingState: '',
        billingPostalCode: '',
        Url: ''
      };
    }
  };
  
  const closeModal = () => {
    emit('close');
  };
  
  const submitForm = () => {
    const accountData = {
      Name: form.value.name,
      BillingCity: form.value.billingCity,
      BillingStreet: form.value.billingStreet,
      BillingState: form.value.billingState,
      BillingPostalCode: form.value.billingPostalCode,
      Website: form.value.Url,
      Id: selectedAccount?.Id || undefined,
    };
    emit('save', accountData);
    closeModal();
  };
  
  watch(() => selectedAccount, initializeForm);
  watch(() => isVisible, initializeForm);
  </script>
  
  <style scoped>
  .p-dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 0.5rem;
  }
  </style>
  
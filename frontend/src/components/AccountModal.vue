<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h2>{{ selectedAccount ? 'Edit Account' : 'Create Account' }}</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Name:</label>
            <input v-model="form.name" type="text" id="name" required />
          </div>
          <div>
            <label for="billingCity">Billing City:</label>
            <input v-model="form.billingCity" type="text" id="billingCity" />
          </div>
          <div>
            <label for="billingStreet">Billing Street:</label>
            <input v-model="form.billingStreet" type="text" id="billingStreet" />
          </div>
          <div>
            <label for="billingState">Billing State:</label>
            <input v-model="form.billingState" type="text" id="billingState" />
          </div>
          <div>
            <label for="billingPostalCode">Billing Postal Code:</label>
            <input v-model="form.billingPostalCode" type="text" id="billingPostalCode" />
          </div>
          <div>
            <label for="website">Website:</label>
            <input v-model="form.Url" type="url" id="url" />
          </div>
          <button type="submit">{{ selectedAccount ? 'Update' : 'Create' }}</button>
        </form>
      </div>
    </div>
  </template>
  
  <script lang="ts">
    import { defineComponent, ref, onMounted, onUpdated } from 'vue';
  
  export default defineComponent({
    props: {
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
        required: true
      }
    },
    emits: ['close', 'save'],
    setup(props, { emit }) {
      const form = ref({
        name: '',
        billingCity: '',
        billingStreet: '',
        billingState: '',
        billingPostalCode: '',
        Url: ''
      });
  
      const initializeForm = () => {
        if (props.selectedAccount) {
          
          form.value = {
            name: props.selectedAccount.Name,
            billingCity: props.selectedAccount.BillingCity || '',
            billingStreet: props.selectedAccount.BillingStreet || '',
            billingState: props.selectedAccount.BillingState || '',
            billingPostalCode: props.selectedAccount.BillingPostalCode || '',
            Url: props.selectedAccount.Url || ''
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
          Id: props.selectedAccount?.Id || undefined,  
        };
  
        emit('save', accountData);
        closeModal();
      };
  
      
      onMounted(() => {
        initializeForm();
      });
  
      
      onUpdated(() => {
        initializeForm();
      });
  
      return {
        form,
        closeModal,
        submitForm
      };
    }
  });
  </script>
  
 
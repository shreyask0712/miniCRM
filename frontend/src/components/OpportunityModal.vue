<template>
    <Dialog :visible="isVisible" header="Opportunity" modal @hide="closeModal">
      <div class="p-fluid">
        <div class="p-field">
          <label for="name">Name</label>
          <InputText v-model="opportunity.Name" id="name" />
        </div>
  
        <div class="p-field">
          <label for="stage">Stage</label>
          <Dropdown
            v-model="opportunity.StageName"
            :options="stageOptions"
            id="stage"
            placeholder="Select Stage"
          />
        </div>
  
        <div class="p-field">
          <label for="amount">Amount</label>
          <InputNumber v-model="opportunity.Amount" id="amount" mode="currency" currency="USD" />
        </div>
      </div>
  
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" @click="closeModal" class="p-button-text" />
        <Button label="Save" icon="pi pi-check" @click="saveOpportunity" autofocus />
      </template>
    </Dialog>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import  Dialog  from 'primevue/dialog';
  import  InputText  from 'primevue/inputtext';
  import  InputNumber  from 'primevue/inputnumber';
  import  Dropdown  from 'primevue/dropdown';
  import Button from 'primevue/button';
  
  interface Opportunity {
    Id: string | null;
    Name: string;
    StageName: string;
    Amount: number;
  }
  
  export default defineComponent({
    components: {
      Dialog,
      InputText,
      InputNumber,
      Dropdown,
      Button
    },
    props: {
      isVisible: {
        type: Boolean,
        required: true
      },
      selectedOpportunity: {
        type: Object as () => Opportunity | null,
        required: false
      }
    },
    setup(props, { emit }) {
      const opportunity = ref<Opportunity>({
        Id: null,
        Name: '',
        StageName: '',
        Amount: 0
      });
  
      const stageOptions = ref([
        { label: 'Qualification', value: 'Qualification' },
        { label: 'Id. Decision Makers', value: 'Id. Decision Makers' },
        { label: 'Proposal/Price Quote', value: 'Proposal/Price Quote' },
        { label: 'Closed Won', value: 'Closed Won' },
        { label: 'Closed Lost', value: 'Closed Lost' }
      ]);
  
      watch(
        () => props.selectedOpportunity,
        (newVal) => {
          if (newVal) {
            opportunity.value = { ...newVal };
          } else {
            // Reset for new opportunity
            opportunity.value = {
              Id: null,
              Name: '',
              StageName: '',
              Amount: 0
            };
          }
        },
        { immediate: true }
      );
  
      const saveOpportunity = () => {
        emit('save', opportunity.value);
      };
  
      const closeModal = () => {
        emit('close');
      };
  
      return {
        opportunity,
        stageOptions,
        saveOpportunity,
        closeModal
      };
    }
  });
  </script>
  
  <style scoped>
  .p-fluid {
    width: 100%;
  }
  </style>
  
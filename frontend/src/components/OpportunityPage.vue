<template>
    <div>
      <h2>Opportunities</h2>
      <Button label="Create Opportunity" icon="pi pi-plus" @click="showCreateModal" />
  
      <DataTable :value="opportunities" responsiveLayout="scroll">
        <Column field="Name" header="Name" />
        <Column field="StageName" header="Stage" />
        <Column field="Amount" header="Amount" />
        <Column field="Account" header="Account" />
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
              @click="deleteOpportunity(slotProps.data.Id)" 
            />
          </template>
        </Column>
      </DataTable>
  
      <OpportunityModal
        :isVisible="showModal"
        :selectedOpportunity="showSelectedOpportunity"
        @close="showModal = false"
        @save="saveOpportunity"
      />
    </div>
  </template>
  
  <script lang="ts">
  import { onMounted, ref } from 'vue';
  import OpportunityModal from './OpportunityModal.vue';
  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
  interface Opportunity {
    Id: string;
    Name: string;
    StageName: string;
    Amount: string;
    Account: string;
  }
  
  export default {
    components: {
      OpportunityModal,
      DataTable,
      Column,
      Button
    },
    setup() {
      const opportunities = ref<Opportunity[]>([]);
      const showModal = ref(false);
      const showSelectedOpportunity = ref<Opportunity | null>(null);
  
      const fetchOpportunities = async () => {
        try {
          const response = await fetch('http://localhost:3000/opportunities/list', {
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
            const body = JSON.parse(data.body);
           
            
           
            opportunities.value = body.records.map((record: any) => ({
              Id: record.Id,
              Name: record.Name,
              StageName: record.StageName,
              Amount: record.Amount,
              Account: record.AccountId 
            }));
  
          }
        } catch (err) {
          console.error('Error fetching opportunities:', err);
        }
      };
  
      const showCreateModal = () => {
        showSelectedOpportunity.value = null;
        showModal.value = true;
      };
  
      const showEditModal = (opportunity: Opportunity) => {
        showSelectedOpportunity.value = opportunity;
        showModal.value = true;
      };
  
      const saveOpportunity = async (opportunityData: Opportunity) => {
        const url = opportunityData.Id ? `http://localhost:3000/opportunities/update/${opportunityData.Id}` : 'http://localhost:3000/opportunities/create';
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
              opportunity: opportunityData
            })
          });
  
          if (!response.ok) {
            throw new Error('Failed to save opportunity');
          }
  
          fetchOpportunities();
          showModal.value = false;
        } catch (err) {
          console.error('Error saving opportunity:', err);
        }
      };
  
      const deleteOpportunity = async (opportunityId: string) => {
        try {
          const response = await fetch(`http://localhost:3000/opportunities/delete/${opportunityId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              sessionId: localStorage.getItem('sessionId'),
              serverUrl: localStorage.getItem('serverUrl')
            })
          });
  
          if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
          }
  
          fetchOpportunities();
        } catch (err) {
          console.error('Error deleting opportunity:', err);
        }
      };
  
      onMounted(() => {
        fetchOpportunities();
      });
  
      return {
        opportunities,
        showModal,
        showSelectedOpportunity,
        showCreateModal,
        showEditModal,
        saveOpportunity,
        deleteOpportunity
      };
    }
  };
  </script>
  
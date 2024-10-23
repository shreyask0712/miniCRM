<template>
    <div>
        <h2>Contacts</h2>
        <button @click="showCreateModal">Create Contact</button>
        <table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>AccountId</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in contacts" :key="contact.Id">
                    <td>{{ contact.FirstName }}</td>
                    <td>{{ contact.LastName }}</td>
                    <td>{{ contact.Email }}</td>
                    <td>{{ contact.AccountId }}</td>
                    <td>
                        <button @click="showEditModal(contact)">Edit</button>
                        <button @click="deleteContacts(contact.Id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <ContactModal :isVisible="showModal"
        :selectedContact= "selectedContact"
        @close="showModal = false"
        @save="saveContact"
        />
    </div>
</template>

<script lang="ts">

import { onMounted, ref} from 'vue';
import ContactModal from './ContactModal.vue';

interface Contact {
    Id: string;
    FirstName : string,
    LastName : string,
    Email : string,
    AccountId : string
}

export default {
    components: {
        ContactModal
    },
    setup() {
        const contacts = ref<Contact[]>([]);
        const showModal = ref(false);
        const selectedContact = ref<Contact | null>(null);

        const fetchContacts = async() => {
            try {
                const response = await fetch('http://localhost:3000/contacts/list', {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: localStorage.getItem('sessionId'),
                        serverUrl: localStorage.getItem('serverUrl')
                    })
                })

                if (response.ok) {
                    const data = await response.json();

                    if (data) {
                        const body = JSON.parse(data.body);
                        console.log("Body: ", body);

                        contacts.value = body.records.map((record: any) => ({
                            FirstName: record.FirstName,
                            LastName: record.LastName,
                            Email: record.Email || '',
                            AccountId: record.AccountId || ''
                        }))
                    }
                }

                else {
                    console.error('Failed to fetch contacts')
                }
            } catch (err) {
                console.error('Error fetching accounts: ', err)
            }
        }

        const deleteContacts = async(contactId: string) => {
            try {
                const response = await fetch(`http://localhost:3000/contacts/delete/${contactId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: localStorage.getItem('sessionId'),
                        serverUrl: localStorage.getItem('serverUrl')
                    })
                })

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                fetchContacts();
            } catch (err) {
                console.log("Error: ", err);
            }
        }

        const showCreateModal = () => {
            selectedContact.value = null;
            showModal.value = true;
        }

        const showEditModal = (contact: Contact) => {
            selectedContact.value = contact;
            showModal.value = true;
        }

        const saveContact = async(contactData: Contact) => {
            const url = contactData.Id ? `http://localhost:3000/contacts/update/${contactData.Id}` : `http://localhost:3000/contacts/create`;
            const method = 'POST';

            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        sessionId: localStorage.getItem('sessionId'),
                        serverUrl: localStorage.getItem('serverUrl'),
                        contact: contactData
                    })
                });

                if (!response.ok) {
                    throw new Error('Failed to save contact')
                }

                fetchContacts();
                showModal.value = false;
            } catch (err) {
                console.error('Error saving contact: ', err)
            }
        }

        onMounted(()=> {
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
            showModal
        }
    }
}

</script>
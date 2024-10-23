<template>
    <div v-if="isVisible" class="modal">
        <span class="close">&times;</span>
        <h2>{{ selectedContact ?  'Edit Contact': 'Create Contact' }}</h2>
        <form>
            <label for="firstname">Name: </label>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onUpdated } from 'vue';

export default defineComponent({
    props: {
        selectedContact: {
            type: Object as () => null | {
                Id: string,
                FirstName?: string,
                LastName?: string,
                Email?: string,
                AccountId?: string
            },
            default: null
        },
        isVisible: {
            type: Boolean,
            required: true
        }
    },
    emits: ['close', 'save'],
    setup(props, {emit}) {
        const form = ref({
            firstname: '',
            lastname: '',
            emailId: '',
            accountId: ''
        });

        const initializeForm = () => {
            
        }
    }
})

</script>
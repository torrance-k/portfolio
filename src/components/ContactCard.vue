<template>
    <div class="glass p-6 grid gap-3">
        <p class="text-slate-700 dark:text-slate-300">Want to collaborate or have a role in mind</p>
        <form class="grid gap-3" @submit.prevent="send">
            <input v-model="name" placeholder="Your name" class="input" required />
            <input v-model="email" type="email" placeholder="Email" class="input" required />
            <textarea v-model="message" rows="4" placeholder="Message" class="input"></textarea>
            <button class="btn">Send</button>
        </form>
    </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
const email = ref('')
const message = ref('')


function send() {
    const mailto = `mailto:knapptori6@gmail.com?subject=Portfolio%20contact%20from%20${encodeURIComponent(name.value)}&body=${encodeURIComponent(message.value + '\n\n' + email.value)}`
    window.location.href = mailto
}
</script>
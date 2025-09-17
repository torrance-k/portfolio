<template>
    <div class="glass p-6">
        <ul class="flex flex-wrap gap-2">
            <li v-for="s in skills" :key="s" class="badge text-slate-600 dark:text-slate-400">{{ s }}</li>
        </ul>
    </div>
</template>


<script setup lang="ts">
const skills = [
    'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Vue 3', 'Frontend Development', 'Node.js', 'Cross-Functional Collaboration', 'Vite', 'Jest', 'Tailwind', 'Accessibility', 'Responsive Design', 'Testing and Debugging', 'git & Github'
]
</script>
<template>
    <div v-if="project" class="grid gap-6">
        <header class="glass p-6">
            <h1 class="text-xl font-semibold">{{ project.title }}</h1>
            <p class="text-sm text-slate-700 dark:text-slate-300 mt-1">{{ project.description }}</p>
            <div class="mt-2 flex flex-wrap gap-2">
                <span v-for="t in project.tags" :key="t" class="badge">{{ t }}</span>
            </div>
        </header>
        <Gallery :images="project.images || []" :video="project.video" />
    </div>
    <div v-else class="text-sm">Project not found.</div>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { projects } from '../shared/projects'
import Gallery from '../components/Gallery.vue'


const route = useRoute()
const project = computed(() => projects.find(p => p.id === String(route.params.id)))
</script>
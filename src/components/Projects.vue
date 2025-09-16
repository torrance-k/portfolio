<template>
    <div class="grid gap-6">
        <header>
            <h1 class="text-2xl font-semibold tracking-tight">Projects</h1>
            <p class="text-sm text-slate-600 dark:text-slate-400">Click a card to view visuals and details</p>
        </header>


        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <RouterLink v-for="(p, i) in projects" :key="p.id" :to="{ name: 'project', params: { id: p.id } }" v-reveal
                v-tilt class="glass p-4 transition will-change-transform block reveal-card"
                :style="{ '--d': `${i * 70}ms` }">
                <img v-if="p.images?.[0]" :src="(p.images[0] as any).src" :alt="p.title"
                    class="w-full h-40 object-cover rounded-xl" />
                <h3 class="mt-3 font-medium">{{ p.title }}</h3>
                <p class="text-sm text-slate-700 dark:text-slate-300">{{ p.description }}</p>
                <ul class="mt-2 flex flex-wrap gap-2">
                    <li v-for="t in p.tags" :key="t" class="badge">{{ t }}</li>
                </ul>
            </RouterLink>
        </div>
    </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { projects } from '../shared/projects'
</script>
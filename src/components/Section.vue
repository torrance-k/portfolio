<template>
    <section :id="id" class="scroll-mt-24">
        <div class="mx-auto container">
            <header class="mb-4">
                <h2 class="text-xl font-semibold tracking-tight">{{ title }}</h2>
                <p v-if="subtitle" class="text-sm text-slate-600 dark:text-slate-400">{{ subtitle }}</p>
            </header>
            <div class="grid gap-4">
                <slot />
            </div>
        </div>
    </section>
</template>


<script setup lang="ts">
defineProps<{ id?: string; title?: string; subtitle?: string }>()
</script>
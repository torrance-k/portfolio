<template>
    <div class="grid place-items-center min-h-[40vh] text-center">
        <div>
            <h1 class="text-2xl font-semibold">Page not found</h1>
            <RouterLink to="/" class="link">Go home</RouterLink>
        </div>
    </div>
</template>


<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>
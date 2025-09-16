<template>
  <div class="min-h-screen flex flex-col">
    <div :class="[
      'fixed inset-0 -z-10 bg-gradient-to-br',
      theme === 'dark'
        ? 'background-gradient-dark'
        : 'background-gradient-light'
    ]" />
    <div class="fixed inset-0 -z-10 backdrop-blur-xl"></div>

    <NavBar :theme="theme" @toggle-theme="toggleTheme" />
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-10">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <Footer />
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, Transition } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'

const theme = ref(localStorage.getItem('theme') || 'light')

function applyTheme() {
  const isDark = theme.value === 'dark'
  document.documentElement.classList.toggle('dark', isDark)
}

const toggleTheme = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  localStorage.setItem('theme', theme.value)
  applyTheme()
}

onMounted(() => {
  applyTheme()
})
</script>

<style lang="css">
.background-gradient-light {
  background: #0B486B;
  background: linear-gradient(to right,
      #0B486B, #F56217)
}

.background-gradient-dark {
  background: #242124;
  background: linear-gradient(to right,
      #242124, #5A4FCF)
}
</style>

<template>
    <header class="sticky top-0 z-50">
        <nav class="mx-auto container px-4 sm:px-6 lg:px-8 mt-4">
            <div
                class="flex items-center justify-between rounded-2xl bg-white/50 dark:bg-slate-900/50 border border-white/30 dark:border-white/10 shadow-sm backdrop-blur-md px-4 py-2">
                <RouterLink to="/" class="font-semibold tracking-tight">Tori.dev</RouterLink>

                <div class="hidden md:flex items center gap-4 text-sm">
                    <div ref="linksEl" class="relative flex items-center gap-4 text-sm">
                        <RouterLink to="/" data-key="home" class="py-1">Home</RouterLink>
                        <RouterLink :to="{ path: '/', hash: '#projects' }" data-key="projectsRoute" class="py-1">
                            Projects
                        </RouterLink>
                        <RouterLink :to="{ path: '/', hash: '#skills' }" data-key="skills" class="py-1">Skills
                        </RouterLink>
                        <RouterLink :to="{ path: '/', hash: '#experience' }" data-key="experience" class="py-1">
                            Experience
                        </RouterLink>
                        <RouterLink :to="{ path: '/', hash: '#contact' }" data-key="contact" class="py-1">Contact
                        </RouterLink>

                        <!-- animated underline -->
                        <span
                            class="pointer-events-none absolute -bottom-0.5 h-0.5 rounded-full bg-slate-900/80 dark:bg-white/80 transition-all duration-300"
                            :style="{ left: underlineLeft + 'px', width: underlineWidth + 'px' }"></span>
                    </div>
                </div>

                <button
                    class="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-white/40 dark:border-white/10"
                    :aria-expanded="open ? 'true' : 'false'" aria-controls="mobile-drawer" @click="open = !open">
                    <span class="sr-only">Open menu</span>
                    <!-- simple icon -->
                    <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" />
                    </svg>
                </button>

                <!-- MOBILE DRAWER -->
                <Transition name="page">
                    <div v-show="open" class="fixed inset-0 z-[70] md:hidden" @click.self="closeMenu"
                        @keydown.esc="closeMenu">
                        <!-- backdrop -->
                        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

                        <!-- panel -->
                        <aside id="mobile-drawer" class="ml-auto h-full w-[84vw] max-w-[360px] rounded-l-2xl
         bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl
         border-l border-white/20 dark:border-white/10
         shadow-2xl p-4
         relative z-[71] grid gap-2
         text-slate-900 dark:text-slate-100">
                            <div class="flex items-center justify-between mb-2">
                                <div class="font-semibold">Menu</div>
                                <button class="rounded-md p-2 border border-white/40 dark:border-white/10"
                                    @click="closeMenu" aria-label="Close menu">✕</button>
                            </div>

                            <!-- Mobile links (the same targets as desktop) -->
                            <nav class="grid gap-1 text-base">
                                <RouterLink to="/"
                                    class="px-2 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60"
                                    @click="closeMenu">Home</RouterLink>
                                <RouterLink :to="{ path: '/', hash: '#projects' }"
                                    class="px-2 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60"
                                    @click="closeMenu">
                                    Projects</RouterLink>
                                <RouterLink :to="{ path: '/', hash: '#skills' }"
                                    class="px-2 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60"
                                    @click="closeMenu">Skills
                                </RouterLink>
                                <RouterLink :to="{ path: '/', hash: '#experience' }"
                                    class="px-2 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60"
                                    @click="closeMenu">
                                    Experience</RouterLink>
                                <RouterLink :to="{ path: '/', hash: '#contact' }"
                                    class="px-2 py-3 rounded-lg hover:bg-white/60 dark:hover:bg-slate-800/60"
                                    @click="closeMenu">
                                    Contact</RouterLink>
                            </nav>

                        </aside>
                    </div>
                </Transition>

                <!-- THEME TOGGLE stays here, outside the linksEl block -->
                <button @click="emit('toggle-theme')"
                    class="rounded-md px-3 py-1 border border-white/40 dark:border-white/10 bg-white/40 dark:bg-slate-800/40">
                    <span v-if="theme === 'light'">Dark</span>
                    <span v-else>Light</span>
                </button>
            </div>
        </nav>
    </header>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'


const props = defineProps<{ theme: string }>()
const emit = defineEmits<{ (e: 'toggle-theme'): void }>()
const open = ref(false)

function closeMenu() { open.value = false }

// Close the drawer when route changes (after tapping a link)

const linksEl = ref<HTMLElement | null>(null)
const underlineLeft = ref(0)
const underlineWidth = ref(0)

// which nav key should be underlined: 'home' | 'projectsRoute' | 'contact'
const activeKey = ref<'home' | 'projectsRoute' | 'skills' | 'experience' | 'contact'>('home')

// which home section is in view: 'home' | 'projects' | 'skills' | 'experience' | 'contact'
const sectionKey = ref<'home' | 'projects' | 'skills' | 'experience' | 'contact'>('home')

let spy: IntersectionObserver | null = null

function placeUnderlineForKey(key: string) {
    const root = linksEl.value
    if (!root) return
    const el = root.querySelector<HTMLElement>(`[data-key="${key}"]`)
    if (!el) return
    underlineLeft.value = el.offsetLeft
    underlineWidth.value = el.offsetWidth
}

function keyFromSection(s: string): typeof activeKey.value {
    return s === 'projects' ? 'projectsRoute'
        : s === 'skills' ? 'skills'
            : s === 'experience' ? 'experience'
                : s === 'contact' ? 'contact'
                    : 'home'
}

function onTopCheck() {
    if (window.scrollY < 80) {
        sectionKey.value = 'home'
        activeKey.value = 'home'
        placeUnderlineForKey('home')
    }
}

function onBottomCheck() {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
    if (atBottom) {
        sectionKey.value = 'contact'
        activeKey.value = 'contact'
        nextTick(() => placeUnderlineForKey('contact'))
    }
}

function startScrollSpy() {
    stopScrollSpy()
    const ids = ['projects', 'skills', 'experience', 'contact']
    spy = new IntersectionObserver(entries => {
        for (const e of entries) {
            if (e.isIntersecting) {
                sectionKey.value = (e.target as HTMLElement).id as any
                activeKey.value = keyFromSection(sectionKey.value)
                nextTick(() => placeUnderlineForKey(activeKey.value))
            }
        }
    }, { rootMargin: '-20% 0px -70% 0px', threshold: 0.1 })
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) spy!.observe(el)
    })
    window.addEventListener('scroll', onTopCheck, { passive: true })
    window.addEventListener('scroll', onBottomCheck, { passive: true })

}

function stopScrollSpy() {
    if (spy) { spy.disconnect(); spy = null }
    window.removeEventListener('scroll', onTopCheck)
    window.removeEventListener('scroll', onBottomCheck)
}

const route = useRoute()

// react to route changes (home = scroll spy; projects route = underline Projects)
watch(
    () => route.fullPath,
    async () => {
        const hash = route.hash?.slice(1)
        if (route.name === 'projects' || route.name === 'project') {
            stopScrollSpy()
            activeKey.value = 'projectsRoute'
        } else {
            startScrollSpy()
            activeKey.value = hash ? keyFromSection(hash) : keyFromSection(sectionKey.value)
        }
        await nextTick()
        placeUnderlineForKey(activeKey.value)
    },
    { immediate: true }
)

watch(() => route.fullPath, () => { open.value = false })
watch(open, v => { document.body.style.overflow = v ? 'hidden' : '' })

function onResize() { placeUnderlineForKey(activeKey.value) }
onMounted(() => window.addEventListener('resize', onResize))
onBeforeUnmount(() => { window.removeEventListener('resize', onResize); stopScrollSpy() })
</script>
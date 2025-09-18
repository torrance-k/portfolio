<template>
    <div class="grid gap-4">
        <h1 class="text-lg text-white/85 pb-8">Image Gallery</h1>
        <div v-if="images?.length" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <button v-for="(img, i) in images" :key="typeof img === 'string' ? img : img.src" class="group relative"
                @click="open(i)">
                <img :src="typeof img === 'string' ? img : img.src" class="w-full h-48 object-cover rounded-xl"
                    :alt="typeof img === 'string' ? ('screenshot ' + (i + 1)) : (img.caption || ('screenshot ' + (i + 1)))" />
                <span
                    class="absolute inset-0 rounded-xl ring-1 ring-white/40 opacity-0 group-hover:opacity-100 transition" />
            </button>
        </div>

        <div v-if="video?.length">
            <h1 class="text-lg text-white/85 pb-8 pt-8">Demo Videos</h1>
            <div class="glass p-2">
                <div v-for="(vid, i) in video" :key="typeof vid === 'string' ? vid : vid.src">
                    <video :src="typeof vid === 'string' ? vid : vid.src" controls class="w-full rounded-xl"></video>
                    <p class="mt-3 text-lg text-white/85 text-center pb-8">
                        {{ (vid as any).caption }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Lightbox overlay -->
        <div v-if="show && total" class="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm p-3 sm:p-6"
            @click.self="close" role="dialog" aria-modal="true">
            <!-- Fixed stage keeps controls in the same place regardless of image size -->
            <div
                class="mx-auto w-[min(96vw,1200px)] grid grid-rows-[minmax(0,1fr)_auto_auto] h-[92svh] sm:h-[80vh] lg:h-[85vh]">
                <figure class="relative w-full h-full min-h-0 sm:min-h-[320px]">
                    <img :src="(imgs[current] as any).src"
                        :alt="(imgs[current] as any).caption || `Screenshot ${current + 1}`"
                        class="absolute inset-0 m-auto max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-lg"
                        @load="onLoad" />
                </figure>

                <figcaption v-if="(imgs[current] as any).caption"
                    class="mt-2 sm:mt-3 text-xs sm:text-sm text-white/85 text-center px-2">
                    <template v-for="(part, j) in splitCaption((imgs[current]! as any).caption)" :key="j">
                        <span v-if="part.t === 'text'">{{ part.value }}</span>
                        <a v-else :href="part.url" target="_blank" rel="noopener noreferrer"
                            class="underline underline-offset-2 hover:opacity-90">
                            {{ part.label }}
                        </a>
                    </template>
                </figcaption>

                <!-- Static control bar below the fixed stage -->
                <div class="mt-2 sm:mt-4 flex items-center justify-between pb-[env(safe-area-inset-bottom)]">
                    <div class="text-[11px] sm:text-xs text-white/80">Image {{ current + 1 }} of {{ total }}</div>
                    <div class="flex gap-2">
                        <button class="btn px-3 py-2 text-sm sm:text-base" @click="prev" type="button"
                            aria-label="Previous image">Prev</button>
                        <button class="btn px-3 py-2 text-sm sm:text-base" @click="next" type="button"
                            aria-label="Next image">Next</button>
                        <button class="btn px-3 py-2 text-sm sm:text-base" @click="close" type="button"
                            aria-label="Close viewer">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'

type GalleryImage = string | { src: string; caption?: string }
type GalleryVideo = string | { src: string; caption?: string };
const props = defineProps<{ images?: GalleryImage[]; video?: GalleryVideo[] }>()

const show = ref(false)
const current = ref(0)
const lightboxLoaded = ref(false)

const imgs = computed(() => props.images ?? [])   // never undefined
const total = computed(() => imgs.value.length)

function open(i: number) { if (total.value) { current.value = i; show.value = true } }
function next() { if (total.value) current.value = (current.value + 1) % total.value }
function prev() { if (total.value) current.value = (current.value - 1 + total.value) % total.value }

function close() { show.value = false }


function onKey(e: KeyboardEvent) {
    if (!show.value) return
    if (e.key === 'Escape') close()
    else if (e.key === 'ArrowRight') next()
    else if (e.key === 'ArrowLeft') prev()
}

function onLoad() {
    lightboxLoaded.value = true
}

type CaptionPart =
    | { t: 'text'; value: string }
    | { t: 'link'; label: string; url: string }

// Parse only [label](https://url) links; leaves everything else as text.
function splitCaption(caption?: string): CaptionPart[] {
    if (!caption) return []
    const parts: CaptionPart[] = []
    const re = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g
    let last = 0
    let m: RegExpExecArray | null
    while ((m = re.exec(caption))) {
        if (m.index > last) parts.push({ t: 'text', value: caption.slice(last, m.index) })
        parts.push({ t: 'link', label: m[1], url: m[2] })
        last = re.lastIndex
    }
    if (last < caption.length) parts.push({ t: 'text', value: caption.slice(last) })
    return parts
}


watch(show, v => { document.body.style.overflow = v ? 'hidden' : '' })
watch([() => show, () => current], ([s]) => {
    if (s) lightboxLoaded.value = false
})
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
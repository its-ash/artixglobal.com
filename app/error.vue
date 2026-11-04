<script setup lang="ts">
import type { NuxtError } from '#app'
import { PhArrowLeft } from '@phosphor-icons/vue'

const { error } = defineProps<{ error: NuxtError }>()
const miss = computed(() => error.statusCode === 404)
const title = computed(() => miss.value ? 'Page not found' : 'Something went wrong')

useHead({
  title: () => `${title.value} | Artix Global`,
  meta: [{ name: 'robots', content: 'noindex, follow' }]
})

const home = () => clearError({ redirect: '/' })
</script>

<template>
  <div class="grain">
    <main id="main" class="wrap flex min-h-[100svh] flex-col items-center justify-center py-24 text-center">
      <p class="eyebrow flex items-center gap-3">
        <span class="size-1.5 rounded-full bg-gold" /><span class="num">{{ error.statusCode }}</span><span class="size-1.5 rounded-full bg-gold" />
      </p>
      <h1 class="display mt-5 max-w-[16ch] text-[clamp(2.75rem,1.6rem+4.6vw,6.5rem)]">{{ title }}</h1>
      <p class="mt-6 max-w-xl text-mute md:text-lg">{{ miss ? 'The page you are looking for does not exist or has moved.' : 'Please try again in a moment.' }}</p>
      <div class="mt-8 flex flex-wrap justify-center gap-3">
        <a href="/" class="btn btn-gold btn-lg" @click.prevent="home"><PhArrowLeft :size="18" /> Back to home</a>
        <a href="/blog/" class="btn btn-ghost btn-lg">Read the blog</a>
        <a href="/contact/" class="btn btn-ghost btn-lg">Contact us</a>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { PhPaperPlaneTilt, PhWarningCircle } from '@phosphor-icons/vue'
import { EMAIL } from '~/utils/site'

type Key = 'first' | 'last' | 'email' | 'phone' | 'msg'
interface Field { k: Key, label: string, type: string, auto: string, max: number, wide?: boolean }

const FIELDS: Field[] = [
  { k: 'first', label: 'First name', type: 'text', auto: 'given-name', max: 80 },
  { k: 'last', label: 'Last name', type: 'text', auto: 'family-name', max: 80 },
  { k: 'email', label: 'Email', type: 'email', auto: 'email', max: 254 },
  { k: 'phone', label: 'Phone', type: 'tel', auto: 'tel', max: 32 },
  { k: 'msg', label: 'Message', type: 'textarea', auto: 'off', max: 1500, wide: true }
]
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const RE_PHONE = /^\+?[\d\s().-]{6,}$/

const form = reactive<Record<Key, string>>({ first: '', last: '', email: '', phone: '', msg: '' })
const touched = reactive<Partial<Record<Key, boolean>>>({})
const sent = ref(false)

const check = ({ k, label }: Field): string => {
  const v = form[k].trim()
  if (!v) return `Enter your ${label.toLowerCase()}.`
  if (k === 'email' && !RE_EMAIL.test(v)) return 'Enter a valid email address, for example name@example.com.'
  if (k === 'phone' && !RE_PHONE.test(v)) return 'Enter a valid phone number, for example +27 21 000 0000.'
  return ''
}
const errs = computed(() => Object.fromEntries(FIELDS.map(f => [f.k, touched[f.k] ? check(f) : ''])) as Record<Key, string>)

const submit = () => {
  FIELDS.forEach(f => (touched[f.k] = true))
  const bad = FIELDS.find(f => check(f))
  if (bad) {
    sent.value = false
    document.getElementById(`f-${bad.k}`)?.focus()
    return
  }
  const name = `${form.first.trim()} ${form.last.trim()}`
  const subject = `Enquiry from ${name}`
  const body = `Name: ${name}\nEmail: ${form.email.trim()}\nPhone: ${form.phone.trim()}\n\n${form.msg.trim()}`
  window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>

<template>
  <form class="card grid gap-5 p-6 text-left md:grid-cols-2 md:p-9" novalidate aria-labelledby="enq-h" @submit.prevent="submit">
    <h3 id="enq-h" class="display text-4xl md:col-span-2">Enquiry Form</h3>
    <p class="-mt-2 text-sm text-mute md:col-span-2">All fields are required. Your email app opens with the message ready to send to {{ EMAIL }}.</p>
    <div v-for="f in FIELDS" :key="f.k" class="flex flex-col gap-2" :class="{ 'md:col-span-2': f.wide }">
      <label :for="`f-${f.k}`" class="text-sm font-medium">{{ f.label }} <span class="text-red-2" aria-hidden="true">*</span></label>
      <textarea
        v-if="f.type === 'textarea'" :id="`f-${f.k}`" v-model="form[f.k]" :name="f.k" rows="5" required :maxlength="f.max"
        :aria-invalid="!!errs[f.k]" :aria-describedby="errs[f.k] ? `e-${f.k}` : undefined"
        class="fld min-h-32 resize-y py-3" @blur="touched[f.k] = true"
      />
      <input
        v-else :id="`f-${f.k}`" v-model="form[f.k]" :name="f.k" :type="f.type" :autocomplete="f.auto" required :maxlength="f.max"
        :inputmode="f.type === 'tel' ? 'tel' : f.type === 'email' ? 'email' : undefined"
        :aria-invalid="!!errs[f.k]" :aria-describedby="errs[f.k] ? `e-${f.k}` : undefined"
        class="fld min-h-12" @blur="touched[f.k] = true"
      >
      <p v-if="errs[f.k]" :id="`e-${f.k}`" class="flex items-center gap-2 text-sm text-red-2">
        <PhWarningCircle :size="16" weight="bold" class="shrink-0" aria-hidden="true" />{{ errs[f.k] }}
      </p>
    </div>
    <div class="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
      <button type="submit" class="btn btn-gold btn-lg">Send Message <PhPaperPlaneTilt :size="18" /></button>
      <p role="status" class="text-sm text-gold-2">{{ sent ? 'Your email app opened with the message. Send it from there to finish.' : '' }}</p>
    </div>
  </form>
</template>

<style scoped>
.fld {
  width: 100%; padding-inline: 1rem; border-radius: 0.875rem; background: var(--color-ink);
  border: 1px solid var(--color-line-strong); color: var(--color-fg);
  transition: border-color 200ms, background-color 200ms;
}
.fld:hover { border-color: color-mix(in oklab, var(--color-gold) 45%, transparent); }
.fld:focus-visible { outline: 2px solid var(--color-gold-2); outline-offset: 2px; border-color: var(--color-gold); }
.fld[aria-invalid="true"] { border-color: var(--color-red-2); }
</style>

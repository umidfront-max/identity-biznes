<template>
  <button
    v-if="'technology' != theme.themeName && 'plain' != theme.themeName && route.path !== '/goods/posterDesign'"
    class="dark-toggle"
    :title="mode === 'dark' ? 'Light mode' : 'Dark mode'"
    @click="_toggleDark($event)"
  >
    <vab-icon v-if="mode === 'dark'" icon="sun-fill" style="color: #f59e0b" />
    <vab-icon v-else icon="moon-fill" style="color: #111111" />
  </button>
</template>

<script lang="ts" setup>
// @ts-nocheck

import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabDark',
})

const $sub = inject<any>('$sub')
const route = useRoute()
const settingsStore = useSettingsStore()
const { theme, mode } = storeToRefs(settingsStore)
const { updateMode } = settingsStore

const _toggleDark = async (event: MouseEvent) => {
  if (typeof document.startViewTransition === 'function') {
    const x = event.clientX
    const y = event.clientY
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
    let isDark: boolean
    const transition = document.startViewTransition(() => {
      const root = document.documentElement
      isDark = root.classList.contains('dark')
      root.classList.remove(isDark ? 'dark' : 'light')
      root.classList.add(isDark ? 'light' : 'dark')
      handleSetScheme(isDark ? 'light' : 'dark')
    })
    await transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 500,
          easing: 'ease-in',
          pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
        }
      )
    })
  } else {
    const toggleDark = useToggle(handleUseDark())
    await toggleDark()
  }
  await updateMode(localStorage.getItem('vueuse-color-scheme'))
}

const handleUseDark = () => {
  return useDark()
}

const handleGetScheme = () => {
  return localStorage.getItem('vueuse-color-scheme')
}

const handleSetScheme = (value: string) => {
  return localStorage.setItem('vueuse-color-scheme', value)
}

onBeforeMount(() => {
  // Restore default
  $sub('shop-vite-reset-dark', () => {
    mode.value = handleGetScheme()
    if (handleGetScheme() === 'dark') {
      handleSetScheme('light')
      handleUseDark()
      mode.value = 'light'
    }
  })

  handleUseDark()
  if (handleGetScheme() === 'auto') handleSetScheme('light')
  mode.value = handleGetScheme()
})
</script>

<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}

::view-transition-old(root) {
  z-index: 999;
}

::view-transition-new(root) {
  z-index: 1;
}

.dark {
  &::view-transition-old(root) {
    z-index: 1;
  }

  &::view-transition-new(root) {
    z-index: 999;
  }
}

.dark-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: #f3f4f6;
  border: none;
  border-radius: 10px;
  color: #111111;
  cursor: pointer;
  transition: all 0.15s ease;
}

.dark-toggle :deep([class*='ri-']) {
  font-size: 18px;
  margin: 0 !important;
}

/* Moon icon — dark for light-mode chip */
.dark-toggle :deep(.ri-moon-fill),
.dark-toggle :deep(.ri-moon-line) {
  color: #111111 !important;
}

/* Sun icon — warm amber/orange regardless of mode */
.dark-toggle :deep(.ri-sun-fill),
.dark-toggle :deep(.ri-sun-line) {
  color: #f59e0b !important;
}

.dark-toggle:hover {
  background: #e5e7eb;
}

.dark .dark-toggle {
  background: #1f2937;
}

.dark .dark-toggle :deep(.ri-sun-fill),
.dark .dark-toggle :deep(.ri-sun-line) {
  color: #fbbf24 !important; /* slightly lighter amber on dark chip */
}

.dark .dark-toggle:hover {
  background: #374151;
}
</style>

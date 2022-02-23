<script setup lang="ts">
const { frontmatter } = defineProps<{
  frontmatter: {
    title: string,
    subtitle?: string,
    author?: string
  }
}>()
</script>

<template>
  <div v-if="frontmatter.title" class="m-auto mb-8">
    <h1 class="mb-0 text-5xl inline">{{ frontmatter.title }}</h1>
    <span v-if="frontmatter.subtitle" class="opacity-50 ml-6 text-2xl italic">
      {{ frontmatter.subtitle }}
    </span>
    <p v-if="frontmatter.author" class="text-lg ml-6">
      By {{ frontmatter.author }}
    </p>
  </div>
  <slot />
</template>

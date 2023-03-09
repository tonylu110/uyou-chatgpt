<script setup lang="ts">
import VueMarkdown from 'vue-markdown-render'

withDefaults(
  defineProps<{
    isMe?: boolean
    msg: string
  }>(),
  {
    isMe: true
  }
)
</script>

<template>
  <div v-if="isMe" class="flex w-screen px-2 py-1">
    <div
      class="flex-1 bg-cyan-500 rounded-lg p-2 overflow-auto h-auto text-right dark:bg-cyan-900 dark:text-white/70"
    >
      <span class="w-10 whitespace-normal break-words text-white">{{ msg }}</span>
    </div>
    <div class="w-10 ml-2 rounded-lg">
      <img
        class="rounded-lg dark:bg-gary-500/50 bg-white/50"
        src="../../assets/user.png"
        alt="me"
      />
    </div>
  </div>
  <div v-else class="flex w-screen px-2 py-1">
    <div class="w-10 mr-2">
      <img class="rounded-lg" src="../../assets/ChatGPT_logo.svg.webp" alt="chatGPT" />
    </div>
    <div class="flex-1 bg-white rounded-lg p-2 overflow-auto h-auto dark:bg-gray-500/50">
      <vue-markdown :source="msg" class="dark:text-white/70 select-text" />
    </div>
  </div>
</template>

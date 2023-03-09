<script setup lang="ts">
import TabBar from './components/TabBar/TabBar.vue'
import ChatItem from './components/ChatItem/ChatItem.vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const body = ref()

interface chatListItem {
  msg: string
  me: boolean
}

const text = ref('')

const chatList: Array<chatListItem> = reactive([
  {
    me: false,
    msg: t('hello')
  }
])
const chat = (): void => {
  chatList.push({
    me: true,
    msg: text.value
  })

  setTimeout(() => {
    body.value.lastElementChild.scrollIntoView()
    text.value = '获取中...'
  }, 100)

  const apiKey = localStorage.getItem('key')

  fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      messages: [
        {
          role: 'user',
          content: text.value
        }
      ],
      model: 'gpt-3.5-turbo',
      max_tokens: 1000,
      temperature: 0
    })
  })
    .then((response) => {
      text.value = ''
      return response.json()
    })
    .then((data) => {
      chatList.push({
        me: false,
        msg: data.choices[0].message.content
      })
    })
    .then(() => {
      body.value.lastElementChild.scrollIntoView()
    })
    .catch((error) => console.error(error))
}
</script>

<template>
  <div class="flex flex-col h-screen">
    <tab-bar />
    <div ref="body" class="overflow-scroll flex-1 scroll-smooth pb-1">
      <chat-item v-for="(item, index) in chatList" :key="index" :msg="item.msg" :is-me="item.me" />
    </div>
    <div
      class="w-screen flex items-center p-2 bg-white/50 dark:bg-gray-500/50 border-t-[1px] border-solid border-black/10 dark:border-gray-400/30"
    >
      <input v-model="text" class="flex-1 p-2 rounded-lg dark:bg-gray-500/50 dark:text-white" />
      <div
        class="flex items-center justify-center p-2 bg-cyan-500/50 ml-2 rounded-lg active:bg-cyan-500"
        @click="chat"
      >
        <span class="material-icons dark:text-white"> send </span>
      </div>
    </div>
  </div>
</template>

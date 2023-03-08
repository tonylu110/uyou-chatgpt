<script setup lang="ts">
import { ref } from 'vue'
import Alert from '../Alert/Alert.vue'

const key = ref('')

const alertShow = ref(false)

const showAlert = (): void => {
  isInfo.value = false
  alertShow.value = true
}

const returnClick = (): void => {
  alertShow.value = false
  if (isInfo.value) {
    return
  }
  isInfo.value = false
  localStorage.setItem('key', key.value)
}

const isInfo = ref(false)
const openInfo = (): void => {
  isInfo.value = true
  alertShow.value = true
}
</script>

<template>
  <div class="flex justify-between p-2 items-center">
    <div
      class="hover:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl"
      @click="showAlert"
    >
      <span class="material-icons dark:text-white/70"> settings </span>
    </div>
    <span class="dark:text-white/70">uyou ChatGPT</span>
    <div
      class="hover:bg-black/10 cursor-pointer w-8 h-8 flex justify-center items-center rounded-2xl"
      @click="openInfo"
    >
      <span class="material-icons dark:text-white/70"> info </span>
    </div>
  </div>
  <Alert
    :title="isInfo ? $t('alert.hint') : $t('plzSetApi')"
    :dialog-show="alertShow"
    :cancel-button-show="!isInfo"
    @cancel="alertShow = !alertShow"
    @return="returnClick"
  >
    <div v-if="!isInfo" class="flex items-center w-max">
      <span class="mr-2">Api Key:</span>
      <input v-model="key" class="border border-2 rounded flex-1" />
    </div>
    <span v-else>create by chatGPT with openai</span>
  </Alert>
</template>

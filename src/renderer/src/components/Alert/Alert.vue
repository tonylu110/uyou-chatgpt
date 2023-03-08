<template>
  <dialog ref="dialog" :class="`alert ${dialogShow ? '' : 'hide'}`">
    <div class="title">
      {{ title }}
    </div>
    <div class="body" :style="{ alignItems: title === $t('alert.hint') ? 'center' : '' }">
      <slot />
    </div>
    <div class="buttons">
      <div v-if="cancelButtonShow" class="cancel" @click="emits('cancel')">
        {{ $t('alert.cancel') }}
      </div>
      <div
        class="return"
        :style="{ width: cancelButtonShow ? '' : '100%' }"
        @click="emits('return')"
      >
        {{ $t('alert.return') }}
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onMounted, Ref, ref, watchEffect } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    body?: Array<string>
    cancelButtonShow?: boolean
    dialogShow?: boolean
  }>(),
  {
    title: 'title',
    body: () => ['1', '2'],
    cancelButtonShow: true,
    dialogShow: false
  }
)

const dialog = ref(null) as unknown as Ref<HTMLDialogElement>

const emits = defineEmits<{
  (e: 'cancel'): void
  (e: 'return'): void
}>()

onMounted(() => {
  const closeAlert = (): void => {
    dialog.value.close()
  }

  watchEffect(() => {
    if (props.dialogShow) {
      dialog.value.removeEventListener('animationend', closeAlert)
      dialog.value.showModal()
    } else {
      dialog.value.addEventListener('animationend', closeAlert)
    }
  })
})

const showContextMenu = ref(false)
const contextMenu = ref({
  top: 0,
  left: 0
})

onMounted(() => {
  dialog.value.addEventListener('contextmenu', (e) => {
    e.preventDefault()

    showContextMenu.value = true

    contextMenu.value = {
      top: e.pageY,
      left: e.pageX
    }
  })

  document.addEventListener('click', () => {
    showContextMenu.value = false
  })
})
</script>

<style scoped>
@import url('dialogAnimation.css');

.alert {
  padding: 0;
  z-index: 10;
  background-color: white;
  width: 300px;
  border-radius: 9px;
  box-shadow: 0 5px 20px #00000050;
  border: 1px solid #999;
  overflow: hidden;
  transition: dialog;
  user-select: none;
  color: #00000090;
  -webkit-app-region: no-drag;
}
.alert .title {
  -webkit-app-region: drag;
  border-bottom: 1.5px solid #00000015;
  padding: 12px;
  display: flex;
  background: #00000008;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.alert .body {
  padding: 18px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  border-bottom: 1.5px solid #00000015;
  min-height: 3em;
  justify-content: center;
}
.alert .body span {
  display: block;
  white-space: pre-wrap;
  user-select: text;
}
.alert .buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  background: #00000010;
}
.alert .buttons div {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
}
.alert .buttons div.cancel {
  border-right: 2px solid #00000010;
}
.alert .buttons div.cancel:active {
  background-color: #00000010 !important;
}
.alert .buttons div.cancel:hover {
  background-color: #00000005;
}
.alert .buttons div.return {
  color: #5985eb;
}
.alert .buttons div.return:active {
  background-color: #5985eb !important;
  color: white;
}
.alert .buttons div.return:hover {
  background-color: #00000005;
}
</style>

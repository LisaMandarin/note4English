<script lang="ts" setup>
import { AiOutlineEdit } from "vue-icons-plus/ai";
import { ref, watch, nextTick } from "vue";

const props = defineProps<{
    modelValue: string;
}>()
const emit = defineEmits(["update:modelValue"])
const isEditable = ref<boolean>(false);
const contentRef = ref<HTMLElement|null>(null);

const handleInput = () => {
  if (contentRef.value) {
    const text = contentRef.value.innerText;
    emit("update:modelValue", text)
  }
}

const handleBlur = () => {
  isEditable.value = false;
}

watch(isEditable, async (newValue) => {
  if (newValue) {
    await nextTick();
    if (contentRef.value) {
      contentRef.value.innerText = props.modelValue;
    }
  }
})
</script>

<template>
    <div
        v-if="!isEditable"
        @click="isEditable = true"
        class="whitespace-pre-wrap"
      >
        <span>{{ modelValue }}</span>
        <AiOutlineEdit class="inline ml-2 cursor-pointer" />
      </div>
      <div 
        v-else 
        @input="handleInput" 
        @blur="handleBlur"
        contenteditable="true"
        ref="contentRef"
      >
      </div>
</template>
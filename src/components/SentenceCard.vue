<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";

const title = ref("陳列句子");
const textareaValue = ref("");
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="px-8">
    <a-textarea 
        v-model:value="textareaValue"
        autosize
        allowClear
        maxLength="1000"
        showCount
        id="textareaInput"
    />
  </div>
  <div class="flex w-full gap-4 justify-center pt-4">
    <button class="btnSecondary">上一步</button>
    <button class="btnPrimary">翻譯</button>
  </div>
</template>

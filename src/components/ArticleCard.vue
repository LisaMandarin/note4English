<script lang="ts" setup>
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { ref } from "vue";

const title = ref("輸入英文文章");
const textareaValue = ref<string>("");
</script>
<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="px-8">
    <a-textarea
      v-model:value="textareaValue"
      placeholder="請貼上英文文章"
      :rows="8"
      autosize
      allowClear
      maxlength="1000"
      showCount
      id="articleTextarea"
    />
  </div>
  <div class="flex w-full gap-4 justify-center pt-4">
    <button
      @click="textareaValue = ''"
      class="btnSecondary text-lg"
    >
      清除文字
    </button>
    <button class="btnPrimary text-lg">陳列句子</button>
  </div>
</template>

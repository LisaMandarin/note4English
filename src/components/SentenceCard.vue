<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";

const props = defineProps<{ processedSentences: string[]; current: number; }>();
const emit = defineEmits(["update:current"])
const title = ref("陳列句子");
function prevStep() {
  emit("update:current", props.current -1)
}
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <ol class="mx-8 max-w-[1000px] lg:mx-auto">
    <li
      v-for="(_, index) in processedSentences"
      :key="index"
      class="odd:bg-warm-green p-2"
    >
      <a-typography-paragraph v-model:content="props.processedSentences[index]" editable />
    </li>
  </ol>
  <div class="flex w-full gap-4 justify-center pt-4">
    <button class="btnSecondary" @click="prevStep">上一步</button>
    <button class="btnPrimary">翻譯</button>
  </div>
</template>

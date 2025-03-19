<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";

const props = defineProps<{ processedSentences: string[]; current: number }>();
const emit = defineEmits(["update:current", "sentencesToBeTranslated"]);
const title = ref("陳列句子");
const sentences = ref<string[]>(props.processedSentences || []);

function prevStep() {
  emit("update:current", props.current - 1);
}

function convertSentences() {
  const filteredSentences = sentences.value.filter((s) => s.trim() !== "")
  
  if (filteredSentences.length === 0) {
    message.error("沒有句子需要翻譯");
    return
  }
  emit("sentencesToBeTranslated", filteredSentences)
  emit("update:current", props.current +1)

}
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <ol class="mx-8 max-w-[1000px] lg:mx-auto">
    <li v-for="(_, i) in sentences" :key="i" class="odd:bg-warm-green">
      <a-typography-paragraph v-model:content="sentences[i]" editable />
    </li>
  </ol>
  <div class="flex w-full gap-4 justify-center pt-4">
    <button class="btnSecondary font-chinese" @click="prevStep">上一步</button>
    <button class="btnPrimary font-chinese" @click="convertSentences">翻譯</button>
  </div>
</template>

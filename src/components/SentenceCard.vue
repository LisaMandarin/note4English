<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { BsTranslate } from "vue-icons-plus/bs";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import microsoftTranslator from "../APIs/microsoft-translator"

const props = defineProps<{
  sentences: string[];
  current: number;
}>();
const emit = defineEmits([
  "update:current",
  "sentencesToBeTranslated",
  "update:translations",
]);
const title = ref("陳列句子");
const sentences = ref<string[]>(props.sentences || []);

function prevStep() {
  emit("update:current", props.current - 1);
}

async function convertSentences() {
  const filteredSentences = sentences.value.filter((s) => s.trim() !== "");

  if (filteredSentences.length === 0) {
    message.error("沒有句子需要翻譯");
    return;
  }
  const translations = await microsoftTranslator(filteredSentences);
  
  emit("sentencesToBeTranslated", filteredSentences);
  emit("update:translations", translations);
  emit("update:current", props.current + 1);
}

function nextStep() {
  emit("update:current", props.current + 1);
}
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div
    class="mx-8 max-w-[1000px] lg:mx-auto border-2 border-warm-green rounded-xl"
  >
    <p
      v-if="sentences.length > 0"
      v-for="(_, i) in sentences"
      :key="i"
      class="odd:bg-warm-green first:rounded-t-lg last:rounded-b-lg"
    >
      <a-typography-paragraph
        v-model:content="sentences[i]"
        editable
        class="p-2"
        id="sentence-card-list"
      />
    </p>
    <p v-if="sentences.length === 0" class="p-2">
      請先貼上英文文章才能進行斷句。回上一頁。
    </p>
  </div>
  <div class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese">
    <button class="btnSecondary" @click="prevStep">
      <TbArrowBackUp class="inline mr-2" />
      上一頁
    </button>
    <button class="btnPrimary" @click="convertSentences">
      <BsTranslate class="inline mr-2" />
      翻譯
    </button>
    <button class="btnSecondary" @click="nextStep">
      下一頁
      <TbArrowBigRightLineFilled class="inline ml-2" />
    </button>
  </div>
</template>

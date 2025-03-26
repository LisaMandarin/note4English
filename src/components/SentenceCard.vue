<script setup lang="ts">
import { message } from "ant-design-vue";
import { ref, watch } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { BsTranslate } from "vue-icons-plus/bs";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import microsoftTranslator from "../APIs/microsoft-translator"
import EditableDiv from "./EditableDiv.vue";
import type { TourProps } from "ant-design-vue";

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
const loading = ref(false)

function prevStep() {
  emit("update:current", props.current - 1);
}

async function convertSentences() {
  try {
    loading.value = true
    const filteredSentences = sentences.value.filter((s) => s.trim() !== "");

  if (filteredSentences.length === 0) {
    message.error("沒有句子需要翻譯");
    return;
  }
  const translations = await microsoftTranslator(filteredSentences);
  
  emit("sentencesToBeTranslated", filteredSentences);
  emit("update:translations", translations);
  emit("update:current", props.current + 1);
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

function nextStep() {
  emit("update:current", props.current + 1);
}

/* ************************** tour (begin) ************************** */
const open = ref(false)
const textRef = ref(null)
const backRef = ref(null)
const processRef = ref(null)
const tourCurrent = ref(0)

const steps: TourProps['steps'] = [
    {
      title: "Check sentences.  Edit text as needed",
      description: "查看句子，可編輯。",
      target: () => textRef.value,
    },
    {
      title: "Previous Step",
      description: "重新貼文章。",
      target: () => backRef.value,
    },
    {
      title: "Translate Sentences",
      description: "翻譯上面的句子。",
      target: () => processRef.value,
    },
  ];

  const handleTourOpen = (val: boolean) => {
    open.value = val;
    tourCurrent.value = 0
  }
/* ************************** tour (end) ************************** */
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline cursor-pointer" @click="handleTourOpen(true)" />
  </h2>
  <a-spin :spinning="loading">

    <div
      class="mx-8 max-w-[1000px] lg:mx-auto border-2 border-warm-green rounded-xl" ref="textRef"
    >
      <p
        v-if="sentences.length > 0"
        v-for="(_, i) in sentences"
        :key="i"
        class="odd:bg-warm-green first:rounded-t-lg last:rounded-b-lg"
      >
        <EditableDiv 
          v-model="sentences[i]"
          class="p-2 text-sm lg:text-2xl"  
        />
      </p>
      <p v-if="sentences.length === 0" class="p-2">
        請先貼上英文文章才能進行斷句。回上一頁。
      </p>
    </div>
    <div class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese">
      <button class="btnSecondary" @click="prevStep" ref="backRef">
        <TbArrowBackUp class="inline mr-2" />
        上一頁
      </button>
      <button class="btnPrimary" @click="convertSentences" ref="processRef">
        <BsTranslate class="inline mr-2" />
        翻譯
      </button>
      <button class="btnSecondary" @click="nextStep">
        下一頁
        <TbArrowBigRightLineFilled class="inline ml-2" />
      </button>
    </div>
  </a-spin>
  <a-tour v-model:current="tourCurrent" :open="open" :steps="steps" @close="handleTourOpen(false)" />
</template>

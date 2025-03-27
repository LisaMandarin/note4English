<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { BiSearchAlt } from "vue-icons-plus/bi";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import { message, type TourProps } from "ant-design-vue";
import openAIResult from "../APIs/openai";
import type { NoteWordType } from "../App.vue";

const props = defineProps<{
  sentencesToBeTranslated: string[];
  translations: string[];
  current: number;
  noteWords: NoteWordType[];
  isDark: boolean;
}>();

const emit = defineEmits(["update:current", "update:noteWords"]);
const title = ref("翻譯");
const activeKey = ref([]);
const loading = ref(false);
const selectedWord = ref("");
const chinese = ref(true);
const english = ref(false);
const example = ref(true);

const termChinese = ref("traditional Chinese meaning");
const termEnglish = ref("English definition");
const termExample = ref("an example sentence");
const lookupTerms = ref(
  new Set<string>([termChinese.value, termExample.value])
);

function prevStep() {
  emit("update:current", props.current - 1);
}

function nextStep() {
  emit("update:current", props.current + 1);
}

function select() {
  const selection = document.getSelection();
  if (selection) {
    selectedWord.value = selection.toString().trim() || "";
  }
}

async function lookup() {
  try {
    loading.value = true;

    if (!chinese.value && !english.value && !example.value) {
      message.error("請勾選「中文」、「English」、或「例句」");
      return;
    }

    if (!selectedWord.value) {
      message.error("請先選取字再查單詞");
      return;
    }
    const result = await openAIResult(
      selectedWord.value,
      lookupTerms.value,
      termChinese.value,
      termEnglish.value,
      termExample.value
    );

    if (result) {
      const updatedNotes = [...props.noteWords, result];
      emit("update:noteWords", updatedNotes);
      emit("update:current", props.current + 1);
    }
  } catch (error) {
    console.error(error);
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  document.addEventListener("selectionchange", select);
});
onUnmounted(() => {
  document.removeEventListener("selectionchange", select);
});

/* ************************** tour (begin) ************************** */
const open = ref(false);
const textRef = ref(null);
const backRef = ref(null);
const processRef = ref(null);
const nextRef = ref(null);
const tourCurrent = ref(0);

const steps: TourProps["steps"] = [
  {
    title:
      "Translation is generated.  Back to the previous page if errors occur.",
    description: "翻譯已生成，如果出現Error，請回上一步。",
    target: () => textRef.value,
    placement: "bottom",
  },
  {
    title: "Back to translate again",
    description: "回上一步重新翻譯。",
    target: () => backRef.value,
  },
  {
    title: "Select words you want to look up",
    description: "選取上面的單字進行查詢。",
    target: () => processRef.value,
  },
  {
    title: "Check Out Notes",
    description: "看看你查過的單字",
    target: () => nextRef.value,
  },
];

const handleTourOpen = (val: boolean) => {
  open.value = val;
  tourCurrent.value = 0;
};
/* ************************** tour (end) ************************** */

watch([chinese, english, example], ([ch, en, ex]) => {
  const newTerms = new Set<string>();
  if (ch) newTerms.add(termChinese.value);
  if (en) newTerms.add(termEnglish.value);
  if (ex) newTerms.add(termExample.value);
  lookupTerms.value = newTerms;
});
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle
      class="inline cursor-pointer"
      @click="handleTourOpen(true)"
    />
  </h2>
  <div class="mx-8 lg:w-[500px] lg:mx-auto">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="教我怎麼使用">
        <ol class="list-decimal">
          <li>畫面呈現的是英文和其翻譯</li>
          <li>選擇要查詢的模式：「中文意思」、「英文解釋」、「例句」</li>
          <li>選取英文單詞</li>
          <li>按按鈕「查詢單字」</li>
        </ol>
      </a-collapse-panel>
    </a-collapse>

  </div>
  <a-spin :spinning="loading">
    <div
      class="mx-8 max-w-[1000px] lg:mx-auto border-2 border-warm-green rounded-xl"
      ref="textRef"
    >
      <p
        v-if="sentencesToBeTranslated.length > 0"
        v-for="(sentence, i) in sentencesToBeTranslated"
        :class="[isDark ? 'dark-mode' : 'odd:bg-warm-green odd:text-black', 'p-2', 'text-base', 'lg:text-xl', 'first:rounded-t-lg', 'last:rounded-b-lg']"
      >
        {{ sentence }}
        <br />
        <span
          :class="[
            isDark ? 'text-yellow-50' : 'text-red-800',
            'font-chinese',
          ]"
        >
          {{ translations[i] }}
        </span>
      </p>
      <p v-else class="p-2 text-base lg:text-xl">
        請先貼上英文文章，接著按「翻譯」才會看到英文句子和中文翻譯。
      </p>
    </div>

    <div class="max-w-[1000px] mx-8 lg:mx-auto text-right">
      <label>
        <input type="checkbox" v-model="chinese" />
        中文意思
      </label>
      <label>
        <input type="checkbox" v-model="english" />
        英文解釋
      </label>
      <label>
        <input type="checkbox" v-model="example" />
        例句
      </label>
    </div>
    <div
      class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese"
    >
      <button
        @click="prevStep"
        class="btnSecondary responsive-btn"
        ref="backRef"
      >
        <TbArrowBackUp class="inline mr-2" />
        上一頁
      </button>
      <button
        @click="lookup"
        class="btnPrimary responsive-btn"
        ref="processRef"
      >
        <BiSearchAlt class="inline mr-2" />
        查詢單字
      </button>
      <button
        @click="nextStep"
        class="btnSecondary responsive-btn"
        ref="nextRef"
      >
        到筆記區
        <TbArrowBigRightLineFilled class="inline ml-2" />
      </button>
    </div>
  </a-spin>
  <a-tour
    v-model:current="tourCurrent"
    :open="open"
    :steps="steps"
    @close="handleTourOpen(false)"
  />
</template>

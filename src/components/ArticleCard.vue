<script lang="ts" setup>
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { AiOutlineClear } from "vue-icons-plus/ai";
import { AiOutlineBars } from "vue-icons-plus/ai";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import { ref, watch } from "vue";
import nlp from "compromise";
import { message, type TourProps, type TextAreaProps } from "ant-design-vue";
import FileToText from "./FileToText.vue";

const props = defineProps<{
  current: number;
}>();
const imageText = ref<string>("");
const title = ref("輸入英文文章");
const activeKey = ref([]); // sample collapse state
const textareaValue = defineModel<string>();
const textareaRef = ref<TextAreaProps | null>(null);
const emit = defineEmits(["update:sentences", "update:current"]);

function convertArticle() {
  if (typeof textareaValue.value !== "string" || !textareaValue.value.trim()) {
    message.error("請輸入英文文章", 2);
    return;
  }

  const sentences = nlp(textareaValue.value).sentences().out("array");
  emit("update:sentences", sentences);
  emit("update:current", props.current + 1);
}

function nextStep() {
  emit("update:current", props.current + 1);
}

/* ************************** tour (begin) ************************** */
const open = ref(false);
const uploadRef = ref(null);
const clearRef = ref(null);
const processRef = ref(null);
const tourCurrent = ref(0);

const steps: TourProps["steps"] = [
  {
    title: "Upload image as needed",
    description: "如有需要，可上傳圖片",
    target: () => uploadRef.value,
  },
  {
    title: "Paste text, text length < 1000",
    description: "貼英文文章，字數不超過1000字",
    target: () => textareaRef.value && (textareaRef.value as any).$el,
  },
  {
    title: "Clear text",
    description: "清除貼上的文章",
    target: () => clearRef.value,
  },
  {
    title: "Process article",
    description: "把文章切成一句一行",
    target: () => processRef.value,
  },
];

const handleTourOpen = (val: boolean) => {
  open.value = val;
  tourCurrent.value = 0;
};
/* ************************** tour (end) ************************** */

watch(imageText, (newVal) => {
  textareaValue.value = newVal;
});
</script>
<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle
      class="inline cursor-pointer"
      @click="handleTourOpen"
    />
  </h2>
  <div class="mx-8 lg:w-[500px] lg:mx-auto">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="教我怎麼使用">
        <ol class="list-decimal">
          <li>把範例文章貼在框格內</li>
          <li>
            <a-typography-paragraph copyable
              >Springtime is a time of renewal and growth. Many plants end their
              long winter sleep and form new buds and shoots. Beautiful flowers
              will soon be showing their bright colors. And the grass will grow
              thicker and greener again. Some flowers bloom in a very noticeable
              way but that is not the case with grass. Imagine you are sitting
              in a grassy field. And you have only one job – to watch the grass
              grow. That does not sound very interesting. In fact, it sounds
              really boring.</a-typography-paragraph
            >
          </li>
          <li>按按鈕「陳列句子」</li>
        </ol>
      </a-collapse-panel>
    </a-collapse>
  </div>

  <div class="p-2" ref="uploadRef">
    <FileToText @update:imageText="(text: string) => (imageText= text)" />
  </div>

  <div class="px-8 max-w-[1000px] mx-auto">
    <a-textarea
      v-model:value="textareaValue"
      placeholder="請貼上英文文章"
      autoSize
      allowClear
      :maxlength="1000"
      showCount
      id="textareaInput"
      ref="textareaRef"
    />
  </div>
  <div
    class="flex flex-wrap w-screen px-8 gap-4 justify-center pt-4 font-chinese"
  >
    <button @click="textareaValue = ''" class="btnSecondary" ref="clearRef">
      <AiOutlineClear class="inline mr-2" />
      清除文字
    </button>
    <button class="btnPrimary" @click="convertArticle" ref="processRef">
      <AiOutlineBars class="inline mr-2" />
      陳列句子
    </button>
    <button @click="nextStep" class="btnSecondary">
      下一頁
      <TbArrowBigRightLineFilled class="inline mr-2" />
    </button>
  </div>
  <a-tour
    v-model:current="tourCurrent"
    :open="open"
    :steps="steps"
    @close="handleTourOpen(false)"
  />
</template>

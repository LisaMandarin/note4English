<script lang="ts" setup>
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { AiOutlineClear } from "vue-icons-plus/ai";
import { AiOutlineBars } from "vue-icons-plus/ai";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import { ref} from "vue";
import nlp from "compromise";
import { message } from "ant-design-vue";

const props = defineProps<{ 
  current: number;
}>()
const title = ref("輸入英文文章");
const textareaValue = defineModel<string>()
const textareaRef = ref<HTMLElement | null>(null);
const emit = defineEmits(["update:sentences", "update:current"])

function convertArticle() {
  if (typeof textareaValue.value !== 'string' || !textareaValue.value.trim()) {
    message.error("請輸入英文文章", 2)
    textareaRef.value?.focus()
    return
  }
  
  const sentences = nlp(textareaValue.value).sentences().out("array")
  emit("update:sentences", sentences)
  emit("update:current", props.current +1)
}

function nextStep() {
  emit("update:current", props.current +1)
}

</script>
<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="px-8 max-w-[1000px] mx-auto">
    <a-textarea
      v-model:value="textareaValue"
      placeholder="請貼上英文文章"
      autoSize
      allowClear
      :maxlength=1000
      showCount
      id="textareaInput"
      ref="textareaRef"
    />
  </div>
  <div class="flex flex-wrap w-screen px-8 gap-4 justify-center pt-4 font-chinese">
    <button
      @click="textareaValue = ''"
      class="btnSecondary"
    >
      <AiOutlineClear class="inline mr-2" />
      清除文字
    </button>
    <button class="btnPrimary" @click="convertArticle">
      <AiOutlineBars class="inline mr-2" />
      陳列句子
    </button>
    <button 
      @click="nextStep"
      class="btnSecondary ">
      下一頁
      <TbArrowBigRightLineFilled class="inline mr-2" />
    </button>
  </div>
</template>

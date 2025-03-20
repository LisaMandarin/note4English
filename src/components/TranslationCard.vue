<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { BiSearchAlt } from "vue-icons-plus/bi";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";
import { v4 as uuidv4 } from "uuid";

const props = defineProps<{ 
  sentencesToBeTranslated: string[]; 
  translations: string[];
  current: number;
}>()

const emit = defineEmits(["update:current", "update:noteWords"])
const title = ref("翻譯");
function prevStep() {
    emit("update:current", props.current -1)
}

function nextStep() {
  emit("update:current", props.current +1)
}

function lookup() {
  emit("update:noteWords", [
  {id: uuidv4(), content: "word 1\n definition of the word\n example sentence of the word"},
  {id: uuidv4(), content: "word 2\n definition of the word\n example sentence of the word"},
  {id: uuidv4(), content: "word 3\n definition of the word\n example sentence of the word"},
  ])
  emit("update:current", props.current + 1)
}

</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="mx-8 max-w-[1000px] lg:mx-auto border-2 border-warm-green rounded-xl">
    <p 
      v-if="sentencesToBeTranslated.length > 0"
      v-for="(sentence, i) in sentencesToBeTranslated" 
      class="odd:bg-warm-green p-2 first:rounded-t-lg last:rounded-b-lg"
    >
      {{ sentence }}
      <br>
      <span class="font-chinese text-rosy-purple">
        {{ translations[i] }}
      </span>
    </p>
    <p v-else class="p-2">請先貼上英文文章，接著按「翻譯」才會看到英文句子和中文翻譯。</p>
  </div>
  <div class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese">
    <button @click="prevStep" class="btnSecondary">
      <TbArrowBackUp class="inline mr-2" />
      上一頁
    </button>
    <button @click="lookup" class="btnPrimary">
      <BiSearchAlt class="inline mr-2" />
      查詢單字
    </button>
    <button @click="nextStep" class="btnSecondary">
      到筆記區
      <TbArrowBigRightLineFilled class="inline ml-2" />
    </button>
  </div>
</template>

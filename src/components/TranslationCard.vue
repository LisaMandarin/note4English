<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { BiSearchAlt } from "vue-icons-plus/bi";
import { TbArrowBigRightLineFilled } from "vue-icons-plus/tb";

const props = defineProps<{ sentencesToBeTranslated: string[]; current: number}>()
const emit = defineEmits<{
    (event: "update:current", value: number): void
}>()
const title = ref("翻譯");
function prevStep() {
    emit("update:current", props.current -1)
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
  <div class="mx-8 max-w-[1000px] lg:mx-auto border-2 border-warm-green rounded-xl">
    <p v-for="sentence in sentencesToBeTranslated" class="odd:bg-warm-green p-2 first:rounded-t-lg last:rounded-b-lg">
      {{ sentence }}
    </p>
  </div>
  <div class="flex flex-wrap gap-4 justify-center mx-8 pt-4 font-chinese">
    <button @click="prevStep" class="btnSecondary">
      <TbArrowBackUp class="inline mr-2" />
      上一頁
    </button>
    <button class="btnPrimary">
      <BiSearchAlt class="inline mr-2" />
      查詢單字
    </button>
    <button @click="nextStep" class="btnSecondary">
      到筆記區
      <TbArrowBigRightLineFilled class="inline ml-2" />
    </button>
  </div>
</template>

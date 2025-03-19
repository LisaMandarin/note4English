<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";

const props = defineProps<{ sentencesToBeTranslated: string[]; current: number}>()
const emit = defineEmits<{
    (event: "update:current", value: number): void
}>()
const title = ref("翻譯");
function prevStep() {
    emit("update:current", props.current -1)
}
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="mx-8 max-w-[1000px] lg:mx-auto">
    <p v-for="sentence in sentencesToBeTranslated" class="odd:bg-warm-green">
      {{ sentence }}
    </p>
  </div>
  <div class="flex w-full gap-4 justify-center pt-4">
    <button @click="prevStep" class="btnSecondary font-chinese">上一步</button>
    <button class="btnPrimary font-chinese">查詢單字</button>
    <button class="btnSecondary font-chinese">到筆記區</button>
  </div>
</template>

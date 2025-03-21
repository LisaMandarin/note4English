<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { BsDownload } from "vue-icons-plus/bs";
import { AiOutlineClear } from "vue-icons-plus/ai";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { VscDebugRestart } from "vue-icons-plus/vsc";
import type { NoteWordType } from "../App.vue";

const props = defineProps<{
  current: number;
  noteWords: NoteWordType[];
}>();
console.log('noteWords: ', props.noteWords)
const emit = defineEmits([
  "update:current",
  "update:article",
  "update:sentences",
  "update:sentencesToBeTranslated",
  "update:translations",
  "update:noteWords",
]);
const title = ref("筆記");

function prevStep() {
  emit("update:current", props.current - 1);
}

function deleteWord(note: NoteWordType) {
  const updatedNoteWords = props.noteWords.filter((n) => n !== note);
  emit("update:noteWords", updatedNoteWords);
}
function deleteAll() {
  emit("update:noteWords", []);
}

function startOver() {
  emit("update:current", 0);
  emit("update:article", "");
  emit("update:sentences", []);
  emit("update:sentencesToBeTranslated", []);
  emit("update:translations", []);
  emit("update:noteWords", []);
}
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div
    class="mx-8 max-w-[1000px] lg:mx-auto p-4 border border-earthy-green rounded-xl flex flex-wrap gap-4"
  >
    <div
      v-if="noteWords.length > 0"
      v-for="word in noteWords"
      class="relative border border-earthy-green rounded p-2 w-[250px] shadow-lg"
    >
      <button
        @click="deleteWord(word)"
        class="absolute top-1 right-2 cursor-pointer"
      >
        X
      </button>
      <a-typography-paragraph
        v-model:content="word.content"
        :key="word.id"
        editable
        class="whitespace-pre-wrap"
      />
    </div>
    <p v-else>
      按「查詢單字」後，單字解釋會呈現在這區，更多資訊請按上方「問號」
    </p>
  </div>

  <div
    class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese"
  >
    <button class="btnPrimary" @click="prevStep">
      <TbArrowBackUp class="inline mr-2" />回上頁查詢單字
    </button>
    <button class="btnSecondary">
      <BsDownload class="inline mr-2" />PDF生成
    </button>
    <a-popconfirm
      title="確定清除畫面中的筆記？"
      ok-text="Yes"
      cancel-text="No"
      @confirm="deleteAll"
    >
      <button class="btnSecondary">
        <AiOutlineClear class="inline mr-2" />清除全部筆記
      </button>
    </a-popconfirm>
    <a-popconfirm
      title="確定要重新開始？"
      ok-text="Yes"
      cancel-text="No"
      @confirm="startOver"
    >
      <button class="btnDanger">
        <VscDebugRestart class="inline mr-2" />重新開始
      </button>
    </a-popconfirm>
  </div>
</template>

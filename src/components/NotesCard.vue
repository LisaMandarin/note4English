<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { BsDownload } from "vue-icons-plus/bs";
import { AiOutlineClear } from "vue-icons-plus/ai";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { VscDebugRestart } from "vue-icons-plus/vsc";
import type { LookedUpWordType } from "../App.vue";

const props = defineProps<{
    current: number; 
    lookedUpWords: LookedUpWordType[]}
>()
const emit = defineEmits(["update:current"])
const title = ref("筆記");
const noteWords = ref<LookedUpWordType[]>(props.lookedUpWords || [])

function prevStep() {
    emit("update:current", props.current -1)
}

function deleteWord(word: LookedUpWordType) {
    noteWords.value = noteWords.value.filter((w) => w !== word)
}

function deleteAll() {
    noteWords.value = []
}

function startOver() {
    emit("update:current", 0)
}

</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline" />
  </h2>
  <div class="mx-8 max-w-[1000px] lg:mx-auto p-4 border border-earthy-green rounded-xl flex flex-wrap gap-4">
    <p  v-if="noteWords.length > 0" v-for="word in noteWords" :key="word.id" class="relative border border-earthy-green rounded p-2 w-[250px] shadow-lg">
        <button @click="deleteWord(word)" class="absolute top-1 right-2 cursor-pointer">X</button>
        <div>
            {{ word.content }}
        </div>
    </p>
    <p v-else>按「查詢單字」後，單字解釋會呈現在這區，更多資訊請按上方「問號」</p>
  </div>
  <div class="flex flex-wrap gap-4 justify-center mx-8 pt-4 font-chinese">
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
    <button @click="startOver" class="btnDanger">
      <VscDebugRestart class="inline mr-2" />重新開始
    </button>
  </div>
</template>

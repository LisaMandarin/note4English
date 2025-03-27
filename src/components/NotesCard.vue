<script setup lang="ts">
import { ref } from "vue";
import { HiOutlineQuestionMarkCircle } from "vue-icons-plus/hi";
import { BsDownload } from "vue-icons-plus/bs";
import { AiOutlineClear } from "vue-icons-plus/ai";
import { TbArrowBackUp } from "vue-icons-plus/tb";
import { VscDebugRestart } from "vue-icons-plus/vsc";
import { AiOutlineEdit } from "vue-icons-plus/ai";
import type { NoteWordType } from "../App.vue";
import generatePDF from "../APIs/generatePDF";
import { message } from "ant-design-vue";
import EditableDiv from "./EditableDiv.vue";

const props = defineProps<{
  current: number;
  sentencesToBeTranslated: string[];
  translations: string[];
  noteWords: NoteWordType[];
}>();
const emit = defineEmits([
  "update:current",
  "update:article",
  "update:sentences",
  "update:sentencesToBeTranslated",
  "update:translations",
  "update:noteWords",
]);
const title = ref("筆記");
const loading = ref(false);

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

async function handlePDF() {
  try {
    loading.value = true;
    await generatePDF(
      props.sentencesToBeTranslated,
      props.translations,
      props.noteWords
    );
    message.success("PDF檔案已生成，請查看下載檔案");
  } catch (error) {
    console.error("error");
    message.error((error as Error).message);
  } finally {
    loading.value = false;
  }
}

function startOver() {
  emit("update:current", 0);
  emit("update:article", "");
  emit("update:sentences", []);
  emit("update:sentencesToBeTranslated", []);
  emit("update:translations", []);
  emit("update:noteWords", []);
}

/* ************************** tour (begin) ************************** */
const open = ref(false)
const textRef = ref(null)
const backRef = ref(null)
const processRef = ref(null)
const clearRef = ref(null)
const restartRef = ref(null)
const tourCurrent = ref(0)
const activeKey = ref([])

const steps = [
    {
      title:
        "Words you look up appear here.  Edit text or delete the box if necessary.",
      description: "查詢過的字出現在這，可編輯或刪除。",
      target: () => textRef.value,
    },
    {
      title: "Back to look up more words",
      description: "回上一步查詢更多字，放心，查詢的字不會消失。",
      target: () => backRef.value,
    },
    {
      title: "Generate PDF and Save it in your local drive",
      description: "把翻譯和筆記變成PDF檔並存在妳的電腦裡",
      target: () => processRef.value,
    },
    {
      title: "Don't need the notes?  Delete them.",
      description: "不需要這些筆記了嗎？一筆勾銷吧！",
      target: () => clearRef.value,
    },
    {
      title:
        "Want to translate another article? Translation and notes will be gone.",
      description: "要重新翻譯文章嗎？這樣會把之前翻譯和做的筆記都消除。",
      target: () => restartRef.value,
    },
  ];

  const handleTourOpen = (val: boolean) => {
    open.value = val;
    tourCurrent.value = 0;
  }
  /* ************************** tour (begin) ************************** */
</script>

<template>
  <h2 class="text-center text-2xl font-extrabold font-chinese">
    {{ title }}
    <HiOutlineQuestionMarkCircle class="inline cursor-pointer" @click="handleTourOpen(true)"/>
  </h2>
  <div class="mx-8 lg:w-[500px] lg:mx-auto">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel key="1" header="教我怎麼使用">
        <ol class="list-decimal">
          <li>如果還沒查詢單字，請先回上頁選字查詢</li>
          <li>按<AiOutlineEdit class="inline" /></li>
          <li>刪除或增加文字</li>
          <li>按 X 清除一則筆記</li>
        </ol>
      </a-collapse-panel>
    </a-collapse>
  </div>
  <a-spin :spinning="loading">
    <div
      class="mx-8 max-w-[1000px] lg:mx-auto p-4 text-base lg:text-xl border border-earthy-green rounded-xl flex flex-wrap gap-4"
      ref="textRef"
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
        <EditableDiv v-model="word.content" :key="word.id"/>
      </div>
      <p v-else>
        按「查詢單字」後，單字解釋會呈現在這區，更多資訊請按上方「問號」
      </p>
    </div>

    <div
      class="flex flex-wrap gap-4 justify-center w-screen px-8 pt-4 font-chinese"
    >
      <button class="btnPrimary responsive-btn" @click="prevStep" ref="backRef">
        <TbArrowBackUp class="inline mr-2" />回上頁查詢單字
      </button>
      <button class="btnSecondary responsive-btn" @click="handlePDF" ref="processRef">
        <BsDownload class="inline mr-2" />PDF生成
      </button>
      <a-popconfirm
        title="確定清除畫面中的筆記？"
        ok-text="Yes"
        cancel-text="No"
        @confirm="deleteAll"
      >
        <button class="btnSecondary responsive-btn" ref="clearRef">
          <AiOutlineClear class="inline mr-2" />清除全部筆記
        </button>
      </a-popconfirm>
      <a-popconfirm
        title="確定要重新開始？"
        ok-text="Yes"
        cancel-text="No"
        @confirm="startOver"
      >
        <button class="btnDanger responsive-btn" ref="restartRef">
          <VscDebugRestart class="inline mr-2" />重新開始
        </button>
      </a-popconfirm>
    </div>
  </a-spin>
  <a-tour v-model:current="tourCurrent" :open="open" :steps="steps" @close="handleTourOpen(false)" />
</template>

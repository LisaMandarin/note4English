<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ArticleCard from "./components/ArticleCard.vue";
import SentenceCard from "./components/SentenceCard.vue";
import TranslationCard from "./components/TranslationCard.vue";
import NotesCard from "./components/NotesCard.vue";
import { ref, computed } from "vue";
import { theme } from "ant-design-vue";

export type NoteWordType = {
  id: string;
  content: string;
};

const isDark = ref(false); // dark mode state

// default text in each card (begin)
const article = ref<string>("");
const sentences = ref<string[]>([
  "Please paste an article first.  Go back to the previous page.",
  "This is an example sentence.",
  "This is an example sentence.",
]);
const sentencesToBeTranslated = ref<string[]>([
  "Please paste an article first.  Go back to the previous page.",
  "This is an example sentence.",
  "This is an example sentence.",
]);
const translations = ref<string[]>([
  "請先貼上英文文章。回上一頁。",
  "這是範例句",
  "這是範例句",
]);
const noteWords = ref<NoteWordType[]>([]);
// default text in each card (end)

// steps setting (begin)
const current = ref<number>(0);
const items = ref([
  { title: "輸入文章", description: "貼上要處理的英文文章" },
  { title: "確認分句", description: "把文章切成一句一行" },
  { title: "翻譯文章", description: "將英文文章逐句翻譯" },
  {
    title: "做筆記",
    description: "查詢單字並做成筆記，將查詢結果和翻譯結果生成PDF檔案",
  },
]);
// step setting (end)

// toggle dark modd, light mode (begin)
const darkTheme = {
  algorithm: theme.darkAlgorithm,
};
const lightTheme = {
  algorithm: theme.defaultAlgorithm,
};
const themeConfig = computed(() => (isDark.value ? darkTheme : lightTheme));
// toggle dark modd, light mode (end)
</script>

<template>
  <a-config-provider :theme="themeConfig">
    <div
      :class="[
        isDark ? 'dark-mode' : 'bg-yellow-50',
        'font-english',
        'text-base',
        'lg:text-xl',
        'min-h-screen',
        'flex',
        'flex-col',
      ]"
    >
      <div class="mx-8 my-2">
        <a-switch v-model:checked="isDark" />
      </div>

      <div>
        <Header :isDark="isDark" />
      </div>

      <div class="mx-12 my-4">
        <a-steps :current="current" :items="items" />
      </div>

      <div class="flex-grow">
        <ArticleCard
          v-if="current === 0"
          :current="current"
          v-model="article"
          @update:sentences="(msg: string[]) => (sentences = msg)"
          @update:current="(step) => (current = step)"
        />
        <SentenceCard
          v-else-if="current === 1"
          :sentences="sentences"
          :current="current"
          @update:current="(step) => (current = step)"
          @sentencesToBeTranslated="
            (sentences) => (sentencesToBeTranslated = sentences)
          "
          @update:translations="(t) => (translations = t)"
        />
        <TranslationCard
          v-else-if="current === 2"
          :sentencesToBeTranslated="sentencesToBeTranslated"
          :translations="translations"
          :current="current"
          :noteWords="noteWords"
          :isDark="isDark"
          @update:current="(step) => (current = step)"
          @update:noteWords="(notes) => (noteWords = notes)"
        />

        <NotesCard
          v-else-if="current === 3"
          :current="current"
          :sentencesToBeTranslated="sentencesToBeTranslated"
          :translations="translations"
          :noteWords="noteWords"
          @update:current="(step: number) => (current = step)"
          @update:article="(a) => (article = a)"
          @update:sentences="(s) => (sentences = s)"
          @update:sentencesToBeTranslated="(s) => (sentencesToBeTranslated = s)"
          @update:translations="(t) => (translations = t)"
          @update:noteWords="(n: NoteWordType[]) => (noteWords = n)"
        />
      </div>
      
      <div>
        <Footer />
      </div>
    </div>
  </a-config-provider>
</template>

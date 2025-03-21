<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ArticleCard from "./components/ArticleCard.vue";
import SentenceCard from "./components/SentenceCard.vue";
import TranslationCard from "./components/TranslationCard.vue";
import NotesCard from "./components/NotesCard.vue";
import { ref } from "vue";

export type NoteWordType = {
  id: string;
  content: string;
}

// default text in each card (begin)
const article = ref<string>("");
const sentences = ref<string[]>([
  "Please paste an article first.  Go back to the previous page.",
  "This is an example sentence.",
  "This is an example sentence."
]);
const sentencesToBeTranslated = ref<string[]>([
  "Please paste an article first.  Go back to the previous page.",
  "This is an example sentence.",
  "This is an example sentence."
]);
const translations = ref<string[]>([
  "請先貼上英文文章。回上一頁。",
  "這是範例句",
  "這是範例句"
])
const noteWords = ref<NoteWordType[]>([]);
// default text in each card (end)

// steps setting (begin)
const current = ref<number>(0);
const items = ref([{ title: "輸入文章" }, { title: "確認分句" }, {title: "翻譯文章"}, {title: "做筆記"}]);
// step setting (end)

</script>

<template>
  <div class="font-english bg-beige min-h-screen flex flex-col">
    <div>
      <Header />
    </div>

    <div class="mx-12 my-4">
      <a-steps :current="current" :items="items"></a-steps>
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
        @update:translations="(t) => translations = t"
      />
      <TranslationCard 
        v-else-if="current === 2"
        :sentencesToBeTranslated="sentencesToBeTranslated" 
        :translations="translations"
        :current="current"
        :noteWords="noteWords"
        @update:current="(step) => (current = step)"
        @update:noteWords="(notes) => (noteWords = notes)"
      />

      <NotesCard 
        v-else-if="current===3"
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
</template>

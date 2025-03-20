<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ArticleCard from "./components/ArticleCard.vue";
import SentenceCard from "./components/SentenceCard.vue";
import TranslationCard from "./components/TranslationCard.vue";
import NotesCard from "./components/NotesCard.vue";
import { ref, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

export type LookedUpWordType = {
  id: string;
  content: string;
}
const processedSentences = ref<string[]>([]);
const sentencesToBeTranslated = ref<string[]>([]);
const lookedUpWords = ref<LookedUpWordType[]>([
  {id: uuidv4(), content: "word1: blah blah blah"},
  {id: uuidv4(), content: "word1: blah blah blah"},
  {id: uuidv4(), content: "word1: blah blah blah"},
  {id: uuidv4(), content: "word1: blah blah blah"},
  {id: uuidv4(), content: "word1: blah blah blah"},
]);

// steps setting (begin)
const current = ref<number>(0);
const items = ref([{ title: "輸入文章" }, { title: "確認分句" }, {title: "翻譯文章"}, {title: "做筆記"}]);
// step setting (end)

watch(current, (newValue) => console.log("current: ", newValue), {deep: true})
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
        @sentences="(msg) => (processedSentences = msg)"
        @update:current="(newStep) => (current = newStep)"
      />
      <SentenceCard
        v-else-if="current === 1"
        :processedSentences="processedSentences"
        :current="current"
        @update:current="(prevStep) => (current = prevStep)"
        @sentencesToBeTranslated="
          (sentences) => (sentencesToBeTranslated = sentences)
        "
      />
      <TranslationCard 
        v-else-if="current === 2"
        :sentencesToBeTranslated="sentencesToBeTranslated" 
        :current="current"
        @update:current="(prevStep: number) => (current = prevStep)"
        
      />

      <NotesCard 
        v-else-if="current===3"
        :current="current"
        :lookedUpWords="lookedUpWords"
        @update:current="(step: number) => (current = step)"
      />
    </div>

    <div>
      <Footer />
    </div>
  </div>
</template>

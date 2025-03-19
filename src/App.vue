<script lang="ts" setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ArticleCard from "./components/ArticleCard.vue";
import SentenceCard from "./components/SentenceCard.vue";
import TranslationCard from "./components/TranslationCard.vue";
import { ref, watch } from "vue";
const processedSentences = ref<string[]>([]);
const sentencesToBeTranslated = ref<string[]>([]);

// steps setting (begin)
const current = ref<number>(0);
const items = ref([{ title: "輸入文章" }, { title: "確認分句" }]);
// step setting (end)
</script>

<template>
  <div class="font-english bg-beige min-h-screen flex flex-col">
    <div>
      <Header />
    </div>

    <div class="mx-8 my-4">
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
    </div>
    <div>
      <Footer />
    </div>
  </div>
</template>

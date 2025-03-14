<script lang="ts" setup>
import ArticleCard from "./components/ArticleCard.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import SentenceCard from "./components/SentenceCard.vue";
</script>
<template>
  <div class="font-english bg-beige min-h-screen flex flex-col">
    <div>
        <Header />
    </div>
    <div class="flex-grow">
        <ArticleCard />
         <SentenceCard />
    </div>
    <div>
        <Footer />
    </div>
  </div>
</template>

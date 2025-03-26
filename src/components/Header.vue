<script setup lang="ts">
defineProps<{isDark: Boolean}>()
</script>
<template>
    <h1 class="font-chinese font-extrabold text-4xl text-center">句句通</h1>
    <p :class="[isDark ? 'dark-mode' : 'bg-warm-green', 'font-chinese', 'mx-8', 'px-1', 'max-w-[1000px]', 'lg:mx-auto', 'rounded-xl']">
      把英文文章分句翻譯，也可以查詢單詞意思，最後把翻譯和查詢的資料編輯後變成pdf檔儲存。
      <br>
      👉🏻👉🏻請按照以下的步驟1→2→3→4完成你的筆記
    </p>
</template>
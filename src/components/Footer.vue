<script lang="ts" setup>
    import { ref } from 'vue';
    const siteName = ref("note4English")
    const thisYear = new Date().getFullYear();
    const author = ref("Min-ting Chuang")
</script>

<template>
    <div class="space-x-2 w-fit mx-auto py-4">
        <span>{{ siteName }}</span>
        <span>&copy;{{ thisYear }}</span>
        <span>{{ author }}</span>
    </div>
</template>
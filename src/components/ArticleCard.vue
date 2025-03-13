<script lang="ts" setup>
    import { HiOutlineQuestionMarkCircle } from 'vue-icons-plus/hi';
    import { ref } from 'vue';
    const title = ref("輸入英文文章")
</script>
<template>
    <h2 class="text-center text-2xl font-extrabold font-chinese">
        {{ title }}
        <HiOutlineQuestionMarkCircle class="inline"/>
    </h2>
    <div class="px-8">
        <textarea placeholder="請貼上英文文章" class="border w-full p-2"></textarea>
    </div>
</template>
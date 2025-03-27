<script lang="ts" setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { uploadFile, getFileUrl } from "../APIs/appwrite";
import { BiImageAdd } from "vue-icons-plus/bi";
import { IpDelete } from "vue-icons-plus/ip";

const file = ref<File | null>(null);
const fileName = ref<string>('')

const handleSubmit = async () => {
  if (!file.value) {
    message.error('Please choose a file')
    return
  }
  
  try {
    const result = await uploadFile(file.value)
    if (result) {
      const imageURL = await getFileUrl(result.$id)
      return imageURL
    }
  } catch (error) {
    console.error('Failed to convert file to text', error)
    message.error('Failed to convert file to text')
  }
} 


const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    file.value = files[0];
    fileName.value = files[0].name
  } else {
    file.value = null;
    fileName.value = ''
  }
}

const deleteFile = () => {
    file.value = null;
    fileName.value = ''
}

</script>

<template>
    <form class="flex justify-center items-center mx-8 lg:max-w-[1000px]" @submit.prevent="handleSubmit">
        <label for="uploadFile" class="cursor-pointer text-earthy-green px-1 mr-1"><BiImageAdd />
            <input id="uploadFile" type="file" class="hidden" @change="handleFileChange"/>
        </label>
        <div class="relative w-[150px] text-sm">
            <IpDelete class="absolute top-0 right-1 inline w-4 cursor-pointer" @click="deleteFile"/>
            <span v-if="fileName" class="w-[120px] line-clamp-1 overflow-hidden">{{ fileName }}</span>
            <span v-else>No file chosen</span>
            
        </div>
        <button type="submit" class="cursor-pointer bg-earthy-green text-beige px-4 py-2 rounded-lg font-chinese">圖片轉文字</button>
    </form>
</template>
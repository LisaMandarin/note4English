<script lang="ts" setup>
import { message } from "ant-design-vue";
import { ref } from "vue";
import { uploadFile, getFileUrl } from "../APIs/appwrite";
import { getOCRResult } from "../APIs/OCR";
import { BiImageAdd } from "vue-icons-plus/bi";
import { IpDelete } from "vue-icons-plus/ip";

const emit = defineEmits(["update:imageText"]);
const file = ref<File | null>(null);
const fileName = ref<string>("");
const fileInputRef = ref<HTMLInputElement | null>(null);
const uploadLoading = ref(false);

const handleSubmit = async () => {
  if (!file.value) {
    message.error("Please choose a file");
    return;
  }

  try {
    uploadLoading.value = true;
    const result = await uploadFile(file.value);
    if (result) {
      const imageURL = await getFileUrl(result.$id);
      if (imageURL) {
        const text = await getOCRResult(imageURL);
        fileName.value = "";
        file.value = null;
        fileInputRef.value!.value = "";
        emit("update:imageText", text);
      }
    }
  } catch (error) {
    console.error("Failed to convert file to text", error);
    message.error("Failed to convert file to text");
  } finally {
    uploadLoading.value = false;
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;
  if (files) {
    if (files[0].size > 1024 * 1024 * 2) {
      message.error("File size should be less than 2MB");
      return;
    }

    if (
      files[0].type === "image/jpeg" ||
      files[0].type === "image/png" ||
      files[0].type === "application/pdf"
    ) {
      file.value = files[0];
      fileName.value = files[0].name;
    } else {
      message.error("Only accept jpeg, png, pdf files");
      file.value = null;
      fileName.value = "";
      fileInputRef.value!.value = "";
    }
  } else {
    file.value = null;
    fileName.value = "";
  }
};

const deleteFile = () => {
  file.value = null;
  fileName.value = "";
  if (fileInputRef.value) {
    fileInputRef.value.value = "";
  }
};
</script>

<template>
  <a-spin :spinning="uploadLoading">
    <form
      class="flex justify-center items-center mx-8 lg:max-w-[1000px lg:mx-auto]"
      @submit.prevent="handleSubmit"
    >
      <label for="uploadFile" class="cursor-pointer text-earthy-green px-1 mr-1"
        ><BiImageAdd />
        <input
          id="uploadFile"
          type="file"
          class="hidden"
          @change="handleFileChange"
          ref="fileInputRef"
        />
      </label>
      <div class="relative w-[150px] text-sm">
        <IpDelete
          class="absolute top-0 right-1 inline w-4 cursor-pointer"
          @click="deleteFile"
        />
        <span v-if="fileName" class="w-[120px] line-clamp-1 overflow-hidden">{{
          fileName
        }}</span>
        <span v-else>No file chosen</span>
      </div>
      <button
        type="submit"
        class="cursor-pointer bg-earthy-green text-beige px-4 py-2 rounded-lg font-chinese"
      >
        圖片轉文字
      </button>
    </form>
  </a-spin>
</template>

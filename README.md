## Introduction
This Vue project provides a comprehensive language learning tool focused on English-Chinese translation. It integrates  multiple APIs and custom components to offer users translations, example sentences, and the ability to generate PDF documents from their learning materials.  The project emphasizes user-friendly interactions, efficient state management, and seamless integration with third-party services.

## Site Preview
![Site Preview](./public/site1.webp, ./public/site2.webp)

## Skills Used
- **Vue**
- **Tailwind CSS**
- **Ant Design**: UI component library
- **TypeScript**
- **Appwrite**: An open-source backend-as-a-service (BaaS) platform, used for storing images and generating accessible image URLs.
- **Fetch APIs**:
    - OCR Text extraction - convert images to text
    - compromise - NLP library used to detect and extract sentences
    - Microsoft Translator API - Translates text from English to Tranditional Chinese.
    - OpenAI API - Provides detailed word information and example sentences.
    - jsPDF - Generates downloadable PDF documents.

## Application URL
[https://note-4-english.netlify.app/](https://note-4-english.netlify.app/)

## Features
**📷Image to Text Conversion**
1. Upload images to Appwrite for storage and URL generation.
2. Use OCR API to extract text from the uploaded image.
**✂️Natural Language Extraction**
1. Use the compromise library to split paragraphs into individual sentences.
2. Edit the extracted sentences as needed
**🌐English-traditional Chinese Translation**
1. Input Enter text into the field.
2. Use the Microsoft Translator API to translate text into traditional Chinese.
3. View results in the Translation Section
**📝Notes Taking**
1. Select words to generate notes using the OpenAI API.
2. View, edit or delete note cards as needed.
**📄PDF Generation**
1. Collect translated text and notes.
2. Generate and download a PDF version of the learning content.

## Contact
For inquiries, feel free to reach out via [**LinkedIn**](https://www.linkedin.com/in/minting0608/)
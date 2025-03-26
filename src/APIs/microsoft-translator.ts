import { message } from "ant-design-vue"
import axios from "axios"

export default async function microsoftTranslator(sentences: string[]) {
    try {
        const apiKey = import.meta.env.VITE_MICROSOFT_API_KEY

        if (!apiKey) {
            console.error('No api key')
            return []
        }
    
        if (sentences.length === 0){
            message.error("沒有句子可以翻譯，請先回到第一頁輸入英文文章後，再按「陳列句子」")
            return []
        }
    
        const url = 'https://microsoft-translator-text-api3.p.rapidapi.com/translate?to=zh-Hant&from=en&textType=plain'
        const headers = {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'microsoft-translator-text-api3.p.rapidapi.com',
            'Content-Type': 'application/json'
        }
        const body = sentences.map((s) => ({text: s}))
        const response = await axios.post(url, body, {headers})
        const results = response.data;
        const translations = results.map((r) => r.translations[0].text)
        return translations

    } catch (error) {
        console.error('Something wrong during fetching translation: ', error.message)
        message.error('翻譯時發生錯誤，請稍後再試')
        return []
    }
    
}
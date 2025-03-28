import { message } from "ant-design-vue";
import OpenAI from "openai";
import { v4 as uuidv4 } from "uuid";

export default async function openaiAPI(selectedWord, lookupTerms, termChinese, termEnglish, termExample) {
  try {
    const lookupTermsList = Array.from(lookupTerms);
    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    if (!apiKey) {
      message.error("No api key provided");
      return null;
    }

    const openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });

    const instructions = `You are an English-Chinese(traditional) dictionary for English learners.  Word: ${
      selectedWord
    }.  Tell me the word's information of ${lookupTermsList.join(
      ", "
    )} and its part of speech.`;
    
    const functionParameters = {
      type: "object",
      properties: {
        word: { type: "string", description: "The word being defined" },
        partOfSpeech: {
          type: "string",
          description: "The part of speech of the word",
        },
      },
      required: ["word", "partOfSpeech"],
    };

    if (lookupTermsList.includes(termChinese)) {
      functionParameters.properties.chineseMeaning= {
        type: "string",
        description: "The meaning in traditional Chinese",
      };
      functionParameters.required.push("chineseMeaning");
    }

    if (lookupTermsList.includes(termEnglish)) {
      functionParameters.properties.englishDefinition = {
        type: "string",
        description: "The meaning in English",
      };
      functionParameters.required.push("englishDefinition");
    }

    if (lookupTermsList.includes(termExample)) {
      functionParameters.properties.exampleSentence = {
        type: "string",
        description: "An example sentence using the word",
      };
      functionParameters.required.push("exampleSentence");
    }

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: instructions }],
      tools: [
        {
          type: "function",
          function: {
            name: "format_response",
            description: "Formats the response into word details",
            parameters: functionParameters,
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "format_response" } },
      model: "gpt-3.5-turbo",
      temperature: 1.5,
      max_tokens: 250,
    });

    const toolCalls = completion.choices[0].message.tool_calls;

    if (!toolCalls || !toolCalls.length) {
      console.error("No tool_calls found in response");
      return null;
    }

    const args = JSON.parse(toolCalls[0].function.arguments);

    const {
      word: responseWord,
      partOfSpeech,
      chineseMeaning,
      englishDefinition,
      exampleSentence,
    } = args;

    const formattedResponse =
      `${responseWord} ${partOfSpeech}\n` +
      (chineseMeaning ? `-${chineseMeaning}\n` : "") +
      (englishDefinition ? `-${englishDefinition}\n` : "") +
      (exampleSentence ? `-${exampleSentence}\n` : "");

    const noteId = uuidv4();
    return { id: noteId, content: formattedResponse };
  } catch (error) {
    console.error("Error during fetch openai result: ", error.message);
    message.error("無法解析來自OpenAI的回應");
    return null;
  }
}

import type { NoteWordType } from "../App.vue";

declare function generatePDF(
    sentencesToBeTranslated: string[],
    translations: string[],
    noteWords: NoteWordType[]
  ): Promise<void>;

export default generatePDF;

declare function openaiAPI(
        selectedWord: string,
        lookupTerms: Set<string>,
        termChinese: string,
        termEnglish: string,
        termExample: string,
    ): Promise<{id: string, content: string} | null>;

    export default openaiAPI;
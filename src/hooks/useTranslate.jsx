import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI client
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY);

const useTranslate = (sourceText, selectedLanguage) => {
  const [targetText, setTargetText] = useState("");

  useEffect(() => {
    const handleTranslate = async (sourceText) => {
      try {
        // Get the Gemini 2.0 Flash model
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        // Create the prompt for translation
        const prompt = `You will be provided with a sentence. This sentence: 
        ${sourceText}. Your tasks are to:
        - Detect what language the sentence is in
        - Translate the sentence into ${selectedLanguage}
        Do not return anything other than the translated sentence.`;

        // Generate content using Gemini model
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const data = response.text();
        
        setTargetText(data);
      } catch (error) {
        console.error("Error translating text:", error);
      }
    };

    if (sourceText.trim()) {
      const timeoutId = setTimeout(() => {
        handleTranslate(sourceText);
      }, 500); // Maintain the same debounce delay

      return () => clearTimeout(timeoutId);
    }
  }, [sourceText, selectedLanguage]);

  return targetText;
};

export default useTranslate;
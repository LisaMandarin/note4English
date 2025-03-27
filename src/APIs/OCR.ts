import axios from "axios";

export async function getOCRResult(imageURL: string) {
  const apiKey = import.meta.env.VITE_OCR_API_KEY;
  const options = {
    method: "POST",
    url: "https://ocr-document-pro.p.rapidapi.com/extract",
    headers: {
      "x-rapidapi-key": apiKey,
      "x-rapidapi-host": "ocr-document-pro.p.rapidapi.com",
      "Content-Type": "application/json",
    },
    data: {
      fileUrl: imageURL,
      barcode: false,
      textPage: false,
      boundingBoxObject: false,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data.text;
  } catch (error) {
    console.error(error);
    return "OCR failed"
  }
}

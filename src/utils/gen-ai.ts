import { GoogleGenerativeAI } from "@google/generative-ai"

async function getGenAIRecomendations(book: string) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY!)
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })

  const prompt = `Sugira 5 livros relacionados a "${book}". Retorne apenas em JSON, sem texto adicional.`

  const result = await model.generateContent(prompt)
  console.log(result.response.text())
  return result.response.text()
}

export const genAI = { getGenAIRecomendations }

import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai"

async function getGenAIRecomendations(book: string) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY!)

  const schema = {
    description: "List of recipes",
    type: SchemaType.ARRAY,
    items: {
      type: SchemaType.OBJECT,
      properties: {
        title: {
          type: SchemaType.STRING,
          description: "Name of the book",
          nullable: false
        },
        author: {
          type: SchemaType.STRING,
          description: "Name of the book's author",
          nullable: false
        }
      },
      required: ["title", "author"]
    }
  }

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema: schema
    }
  })

  const prompt = `Sugira 6 livros relacionados a "${book}" quero o nome dos autores também.`

  const result = await model.generateContent(prompt)
  console.log(result.response.text())
  return result.response.text()
}

export const genAI = { getGenAIRecomendations }

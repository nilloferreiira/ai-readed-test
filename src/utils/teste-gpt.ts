import { ClientOptions, OpenAI } from "openai"
import dotenv from "dotenv"

dotenv.config()

const config: ClientOptions = {
  apiKey: process.env.OPENAI_API_KEY!
}

const openai = new OpenAI({ apiKey: config.apiKey })

async function getRecomendations() {
  try {
    const response = await openai.chat.completions.create(
      {
        messages: [
          {
            role: "system",
            content: `Você é um especialista em livros e seu objetivo é recomendar livros de acordo com os títulos fornecidos.
                    Faça o seu melhor para fornecer recomendações precisas e interessantes.`
          },
          {
            role: "user",
            content: `me gere um array de livros semelhantes a Percy Jackson,
                    quero q no array contenha objetos contendo {name, description}.
                    o array deve ter no maximo 5 recomendacoes`
          }
        ],
        model: "gpt-4o-mini",
        max_tokens: 5
      },
      {
        headers: {
          Authorization: `Bearer ${config.apiKey}`
        }
      }
    )

    console.log(response)
    return response
  } catch (error) {
    console.log(error)
    return "deu erro" + error
  }
}

export const gpt = { getRecomendations }

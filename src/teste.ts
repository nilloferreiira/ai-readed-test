import { Configuration, OpenAIApi } from "openai-edge"
import dotenv from "dotenv"

dotenv.config()

export const runtime = "edge"

const apiConfig = new Configuration({
  apiKey: process.env.NITE_SECRET_KEY!
  //   apiKey: process.env.OPENAI_API_KEY!
})

const openai = new OpenAIApi(apiConfig)

export async function POST() {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "you know several books and love giving recommendations"
      },
      {
        role: "user",
        content: "Ola poderia me recomendar um livro de romance"
      }
    ],
    max_tokens: 7,
    temperature: 0,
    stream: false
  })

  console.log(response)
}

POST()

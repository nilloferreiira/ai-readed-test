import fastifyCors from "@fastify/cors"
import dotenv from "dotenv"
import fastify from "fastify"
import { gpt } from "./utils/teste-gpt"
import { genAI } from "./utils/gen-ai"

dotenv.config()

const app = fastify()

app.register(fastifyCors, {
  origin: true
})

app.get("/", async () => {
  return "API online!!!"
})

// GEMINI AI
app.get(
  "/gen/recomendations",
  {
    schema: {
      querystring: {
        type: "object",
        properties: {
          book: { type: "string" }
        },
        required: ["book"]
      }
    }
  },
  async (request) => {
    const { book } = request.query as { book: string }

    const recomendations = genAI.getGenAIRecomendations(book)

    return recomendations
  }
)

// GPT (Não funcional...)
// app.get("/gpt/recomendations", async () => {
//   const recomendations = gpt.getRecomendations()

//   return recomendations
// })

app
  .listen({
    port: process.env.PORT ? Number(process.env.PORT!) : 3333,
    host: "0.0.0.0"
  })
  .then(() => console.log("server listening..."))

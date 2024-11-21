// import OpenAI from "openai"
import fastifyCors from "@fastify/cors"
import dotenv from "dotenv"
import fastify from "fastify"
import { gpt } from "./utils/teste-gpt"

dotenv.config()

// async function getPromptWithAgent() {
//   const openai = new OpenAI({
//     apiKey: process.env.NITE_SECRET_KEY
//   })
//   const completion = await openai.chat.completions.create({
//     model: "",
//     messages: [
//       {
//         role: "system",
//         content: `
//                 Você é um especialista em livros,
//                 conhece todos de todos os generos e
//                 é otimo em recomendar livros novos para todos os leitores.
//                 Fale na lingaguem que receber no prompt
//                 `
//       },
//       {
//         role: "user",
//         content: "Me recomende livros com base em percy jackson"
//       }
//     ]
//   })

//   console.log(completion.choices[0].message)
// }

// getPromptWithAgent()

const app = fastify()

app.register(fastifyCors, {
  origin: true
})

app.get("/", async () => {
  return "API online!!!"
})

app.get("/recomendations", async () => {
  const recomendations = gpt.getRecomendations()

  return recomendations
})

app
  .listen({
    port: process.env.PORT ? Number(process.env.PORT!) : 3333,
    host: "0.0.0.0"
  })
  .then(() => console.log("server listening..."))

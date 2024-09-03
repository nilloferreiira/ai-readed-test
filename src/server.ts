import OpenAI from "openai"
import dotenv from "dotenv"

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

async function getCompletion() {
  const openai = new OpenAI({
    apiKey: process.env.NITE_SECRET_KEY
  })

  const completion = await openai.completions.create({
    model: "gpt-3.5-turbo-instruct",
    prompt: "Write a tagline for an ice cream shop."
  })

  console.log(completion.choices[0].text)
}

getCompletion()
